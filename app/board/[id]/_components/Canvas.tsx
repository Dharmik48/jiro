'use client'

import { Id } from '@/convex/_generated/dataModel'
import Info from './info'
import Participants from './participants'
import Toolbar from './toolbar'
import {
	useCanRedo,
	useCanUndo,
	useHistory,
	useMutation,
	useOthersMapped,
	useStorage,
} from '@liveblocks/react/suspense'
import { useCallback, useMemo, useState } from 'react'
import {
	Camera,
	CanvasMode,
	CanvasState,
	Color,
	LayerType,
	Point,
	Side,
	XYWH,
} from '@/types/canvas'
import CursorsPresence from './CursorsPresence'
import {
	connectionIdToColor,
	pointerEventToCanvasPoint,
	resizeBounds,
} from '@/lib/utils'
import { nanoid } from 'nanoid'
import { LiveObject } from '@liveblocks/client'
import LayerPreview from './LayerPreview'
import SelectionBox from './SelectionBox'

const MAX_LAYERS = 100

const Canvas = ({ id }: { id: Id<'boards'> }) => {
	const layerIds = useStorage(root => root.layerIds)

	const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 })
	const [state, setState] = useState<CanvasState>({
		mode: CanvasMode.None,
	})
	const [lastUsedColor, setLastUsedColor] = useState<Color>({
		r: 255,
		g: 255,
		b: 255,
	})
	const canUndo = useCanUndo()
	const canRedo = useCanRedo()
	const history = useHistory()

	const onWheel = useCallback((e: React.WheelEvent) => {
		setCamera(camera => ({ x: camera.x - e.deltaX, y: camera.y - e.deltaY }))
	}, [])

	const onResizeHandlePointerDown = useCallback(
		(corner: Side, initialBounds: XYWH) => {
			history.pause()
			setState({ mode: CanvasMode.Resizing, initialBounds, corner })
		},
		[history]
	)

	const resizeSelectedLayer = useMutation(
		({ storage, self }, point: Point) => {
			if (state.mode !== CanvasMode.Resizing) return

			const bounds = resizeBounds(state.initialBounds, state.corner, point)

			const liveLayers = storage.get('layers')
			const layer = liveLayers.get(self.presence.selection[0])

			if (layer) layer.update(bounds)
		},
		[state]
	)

	const translateSelectedLayers = useMutation(
		({ storage, self }, point: Point) => {
			if (state.mode !== CanvasMode.Translating) return

			const offset = {
				x: point.x - state.current.x,
				y: point.y - state.current.y,
			}

			const liveLayers = storage.get('layers')

			for (const id of self.presence.selection) {
				const layer = liveLayers.get(id)

				if (layer)
					layer.update({
						x: layer.get('x') + offset.x,
						y: layer.get('y') + offset.y,
					})
			}
			setState({ mode: CanvasMode.Translating, current: point })
		},
		[state]
	)

	const onPointerMove = useMutation(
		({ setMyPresence }, e: React.PointerEvent) => {
			e.preventDefault()

			const current = pointerEventToCanvasPoint(e, camera)

			if (state.mode === CanvasMode.Translating)
				translateSelectedLayers(current)
			else if (state.mode === CanvasMode.Resizing) resizeSelectedLayer(current)

			setMyPresence({ cursor: current })
		},
		[state, resizeSelectedLayer, camera]
	)

	const onPointerDown = useCallback(
		(e: React.PointerEvent) => {
			const point = pointerEventToCanvasPoint(e, camera)

			if (state.mode === CanvasMode.Inserting) return

			setState({ mode: CanvasMode.Pressing, origin: point })
		},
		[camera, state.mode, setState]
	)

	const onPointerLeave = useMutation(
		({ setMyPresence }, e: React.PointerEvent) => {
			e.preventDefault()

			setMyPresence({ cursor: null })
		},
		[]
	)

	const insertLayer = useMutation(
		(
			{ storage, setMyPresence },
			layerType:
				| LayerType.Ellipse
				| LayerType.Note
				| LayerType.Rectangle
				| LayerType.Text,
			position: Point
		) => {
			const liveLayers = storage.get('layers')
			if (liveLayers.size >= MAX_LAYERS) return

			const liveLayerIds = storage.get('layerIds')

			const layerId = nanoid()
			const layer = new LiveObject({
				type: layerType,
				x: position.x,
				y: position.y,
				height: 100,
				width: 100,
				fill: lastUsedColor,
			})

			liveLayerIds.push(layerId)
			liveLayers.set(layerId, layer)

			setMyPresence({ selection: [layerId] }, { addToHistory: true })
			setState({ mode: CanvasMode.None })
		},
		[lastUsedColor]
	)

	const unselectLayers = useMutation(
		({ self, setMyPresence }) => {
			if (self.presence.selection.length > 0)
				setMyPresence({ selection: [] }, { addToHistory: true })
		},
		[lastUsedColor]
	)

	const onPointerUp = useMutation(
		({}, e) => {
			const point = pointerEventToCanvasPoint(e, camera)

			if (
				state.mode === CanvasMode.None ||
				state.mode === CanvasMode.Pressing
			) {
				unselectLayers()
				setState({ mode: CanvasMode.None })
			} else if (state.mode === CanvasMode.Inserting)
				insertLayer(state.layerType, point)
			else setState({ mode: CanvasMode.None })

			history.resume()
		},
		[camera, state, history, insertLayer, unselectLayers]
	)

	const onLayerPointerDown = useMutation(
		({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
			if (
				state.mode === CanvasMode.Pencil ||
				state.mode === CanvasMode.Inserting
			)
				return

			history.pause()
			e.stopPropagation()

			const point = pointerEventToCanvasPoint(e, camera)

			if (!self.presence.selection.includes(layerId))
				setMyPresence({ selection: [layerId] }, { addToHistory: true })

			setState({ mode: CanvasMode.Translating, current: point })
		},
		[setState, camera, history, state.mode]
	)

	const selections = useOthersMapped(other => other.presence.selection)

	const layerIdsToColorSelection = useMemo(() => {
		const layerIdsToColorSelection: Record<string, string> = {}

		for (const user of selections) {
			const [connectionId, selection] = user

			for (const layerId of selection) {
				layerIdsToColorSelection[layerId] = connectionIdToColor(connectionId)
			}
		}

		return layerIdsToColorSelection
	}, [selections])

	return (
		<div className='relative h-full'>
			<Info id={id} />
			<Participants />
			<Toolbar
				canvasState={state}
				setCanvasState={setState}
				canRedo={canRedo}
				canUndo={canUndo}
				undo={history.undo}
				redo={history.redo}
			/>
			<svg
				className='h-screen w-screen'
				onWheel={onWheel}
				onPointerMove={onPointerMove}
				onPointerLeave={onPointerLeave}
				onPointerUp={onPointerUp}
				onPointerDown={onPointerDown}
			>
				<g style={{ translate: `${camera.x}px ${camera.y}px` }}>
					{layerIds.map(layerId => (
						<LayerPreview
							key={layerId}
							id={layerId}
							selectionColor={layerIdsToColorSelection[layerId]}
							onPointerDown={onLayerPointerDown}
						/>
					))}
					<SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown} />
					<CursorsPresence />
				</g>
			</svg>
		</div>
	)
}

export default Canvas
