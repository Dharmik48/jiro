'use client'

import { Id } from '@/convex/_generated/dataModel'
import Info from './info'
import Participants from './participants'
import Toolbar from './toolbar'
import { useCallback, useMemo, useState } from 'react'
import {
	Camera,
	CanvasMode,
	CanvasState,
	Color,
	Layer,
	LayerType,
	Point,
	Side,
	XYWH,
} from '@/types'
import {
	useCanRedo,
	useCanUndo,
	useHistory,
	useMutation,
	useOthersMapped,
	useRedo,
	useStorage,
	useUndo,
} from '@liveblocks/react/suspense'
import Cursors from './Cursors'
import {
	connectionIdToColor,
	getResizedBounds,
	getSelectionNetBounds,
	pointerEventToCanvasPoint,
} from '@/lib/utils'
import LayerPreview from './LayerPreview'
import { nanoid } from 'nanoid'
import { LiveObject } from '@liveblocks/client'
import SelectionBox from './SelectionBox'
import SelectionTools from './SelectionTools'
import SelectionNet from './SelectionNet'

const Canvas = ({ id }: { id: Id<'boards'> }) => {
	const [canvasState, setCanvasState] = useState<CanvasState>({
		mode: CanvasMode.NONE,
	})
	// TODO: add last used color
	const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 })
	const layerIds = useStorage(root => root.layerIds)
	const undo = useUndo()
	const redo = useRedo()
	const canUndo = useCanUndo()
	const canRedo = useCanRedo()
	const history = useHistory()

	const insertLayer = useMutation(
		(
			{ storage },
			layerType:
				| LayerType.ELLIPSIS
				| LayerType.NOTE
				| LayerType.RECTANGLE
				| LayerType.TEXT,
			point: Point
		) => {
			const layers = storage.get('layers')
			const layerIds = storage.get('layerIds')
			const id = nanoid()

			const layer: Layer = {
				x: point.x,
				y: point.y,
				height: 100,
				width: 100,
				fill: { r: 255, g: 255, b: 255 },
				layerType: layerType,
			}

			layers.set(id, new LiveObject(layer))
			layerIds.push(id)

			setCanvasState({ mode: CanvasMode.NONE })
		},
		[canvasState]
	)

	const deselectLayers = useMutation(
		({ setMyPresence }) => {
			setMyPresence({ selection: [] }, { addToHistory: true })
		},
		[canvasState]
	)

	const resizeLayer = useMutation(
		({ self, storage }, e: React.PointerEvent) => {
			if (canvasState.mode !== CanvasMode.RESIZING) return

			const point = pointerEventToCanvasPoint(e, camera)

			const bounds = getResizedBounds(
				canvasState.initialBounds,
				canvasState.corner,
				point
			)

			const selectedLayerId = self.presence.selection[0]
			const layer = storage.get('layers').get(selectedLayerId)

			layer?.update(bounds)
		},
		[canvasState, camera]
	)

	const translateLayers = useMutation(
		({ storage, self }, point: Point) => {
			if (canvasState.mode !== CanvasMode.TRANSLATING) return

			const selectedLayerIds = self.presence.selection
			if (!selectedLayerIds.length) return

			const offset = {
				x: point.x - canvasState.current.x,
				y: point.y - canvasState.current.y,
			}

			const layers = storage.get('layers')

			for (const layerId of selectedLayerIds) {
				const layer = layers.get(layerId)

				if (!layer) continue

				layer.update({
					x: layer.get('x') + offset.x,
					y: layer.get('y') + offset.y,
				})
			}
			setCanvasState({ mode: CanvasMode.TRANSLATING, current: point })
		},
		[canvasState]
	)

	const drawSelectionNet = (point: Point) => {
		if (canvasState.mode !== CanvasMode.PRESSING) return

		setCanvasState(() => ({ ...canvasState, current: point }))
	}

	const selectLayers = useMutation(
		({ setMyPresence, storage }, point: Point) => {
			if (canvasState.mode !== CanvasMode.PRESSING) return
			// TODO: SELECT ON DRAG ITSELF
			const bounds = getSelectionNetBounds(
				canvasState.initialPoint,
				canvasState.current
			)

			const liveLayers = storage.get('layers')
			const layerIds = storage.get('layerIds')

			const selected = layerIds.filter(layerId => {
				const layer = liveLayers.get(layerId)
				if (!layer) return false

				const x = layer.get('x')
				const y = layer.get('y')
				const width = layer.get('width')
				const height = layer.get('height')

				if (!(x > bounds.x && x + width < bounds.x + bounds.width)) return false
				if (!(y > bounds.y && y + height < bounds.y + bounds.height))
					return false

				return true
			})

			if (!selected.length) return setCanvasState({ mode: CanvasMode.NONE })

			setMyPresence({ selection: selected })
			setCanvasState({ mode: CanvasMode.NONE })
		},
		[canvasState]
	)

	const selections = useOthersMapped(other => other.presence.selection)

	const layerSelectionColor = useMemo(() => {
		const layers: Record<string, string> = {}

		for (const selection of selections) {
			const [connectionId, layerIds] = selection

			layerIds.forEach(
				layerId => (layers[layerId] = connectionIdToColor(connectionId))
			)
		}

		return layers
	}, [selections])

	const onPointerUp = (e: React.PointerEvent) => {
		const point = pointerEventToCanvasPoint(e, camera)

		if (canvasState.mode === CanvasMode.NONE) deselectLayers()
		else if (canvasState.mode === CanvasMode.INSERTING)
			insertLayer(canvasState.layerType, point)
		else if (canvasState.mode === CanvasMode.PRESSING) selectLayers(point)
		else setCanvasState({ mode: CanvasMode.NONE })

		history.resume()
	}

	const onPointerMove = useMutation(
		({ setMyPresence }, e: React.PointerEvent) => {
			const cursor = pointerEventToCanvasPoint(e, camera)

			if (canvasState.mode === CanvasMode.TRANSLATING) translateLayers(cursor)
			else if (canvasState.mode === CanvasMode.RESIZING) resizeLayer(e)
			else if (canvasState.mode === CanvasMode.PRESSING)
				drawSelectionNet(cursor)
			setMyPresence({ cursor })
		},
		[camera, canvasState]
	)

	const onPointerLeave = useMutation(
		({ setMyPresence }, e: React.PointerEvent) => {
			e.preventDefault()

			setMyPresence({ cursor: null })
		},
		[camera]
	)

	const onPointerDown = (e: React.PointerEvent) => {
		if (canvasState.mode !== CanvasMode.NONE) return

		e.stopPropagation()
		const point = pointerEventToCanvasPoint(e, camera)

		deselectLayers()
		setCanvasState({
			mode: CanvasMode.PRESSING,
			initialPoint: point,
			current: point,
		})
	}

	const onLayerPointerDown = useMutation(
		({ setMyPresence, self }, id: string, e: React.PointerEvent) => {
			e.stopPropagation()
			if ([CanvasMode.INSERTING, CanvasMode.PENCIL].includes(canvasState.mode))
				return

			history.pause()
			const pointer = pointerEventToCanvasPoint(e, camera)
			// TODO: select mutiple on ctrl select

			if (!self.presence.selection.includes(id))
				setMyPresence({ selection: [id] }, { addToHistory: true })

			setCanvasState({ mode: CanvasMode.TRANSLATING, current: pointer })
		},
		[canvasState, camera, history]
	)

	const onResizePointerDown = useCallback(
		(initialBounds: XYWH, corner: Side[]) => {
			history.pause()
			setCanvasState({ mode: CanvasMode.RESIZING, initialBounds, corner })
		},
		[history]
	)

	const onWheel = useCallback((e: React.WheelEvent) => {
		setCamera(camera => ({ x: camera.x - e.deltaX, y: camera.y - e.deltaY }))
	}, [])

	const setFill = useMutation(({ self, storage }, color: Color) => {
		const selectedLayerIds = self.presence.selection
		const layers = storage.get('layers')

		if (!layers) return

		for (const layerId of selectedLayerIds)
			layers.get(layerId)?.set('fill', color)
	}, [])

	const deleteLayers = useMutation(({ self, storage, setMyPresence }) => {
		const selectedLayerIds = self.presence.selection
		const layers = storage.get('layers')
		const layerIds = storage.get('layerIds')

		if (!layers) return

		for (const layerId of selectedLayerIds) {
			layers.delete(layerId)
			layerIds.delete(layerIds.indexOf(layerId))
		}
		setMyPresence({ selection: [] })
	}, [])

	return (
		<div className='relative h-full'>
			<Info id={id} />
			<Participants />
			<Toolbar
				canvasState={canvasState}
				setCanvasState={setCanvasState}
				undo={undo}
				redo={redo}
				canUndo={canUndo}
				canRedo={canRedo}
			/>
			<SelectionTools
				camera={camera}
				onChange={setFill}
				onDelete={deleteLayers}
			/>
			<svg
				className='h-screen w-screen'
				onPointerUp={onPointerUp}
				onPointerMove={onPointerMove}
				onPointerLeave={onPointerLeave}
				onPointerDown={onPointerDown}
				onWheel={onWheel}
			>
				<g style={{ translate: `${camera.x}px ${camera.y}px` }}>
					{layerIds.map(id => (
						<LayerPreview
							key={id}
							id={id}
							onLayerPointerDown={onLayerPointerDown}
							selectionColor={layerSelectionColor[id]}
						/>
					))}
					<SelectionBox onResizePointerDown={onResizePointerDown} />
					<Cursors />
					{canvasState.mode === CanvasMode.PRESSING && (
						<SelectionNet
							initial={canvasState.initialPoint}
							current={canvasState.current}
						/>
					)}
				</g>
			</svg>
		</div>
	)
}

export default Canvas
