'use client'

import { Id } from '@/convex/_generated/dataModel'
import Info from './info'
import Participants from './participants'
import Toolbar from './toolbar'
import { useCallback, useState } from 'react'
import {
	Camera,
	CanvasMode,
	CanvasState,
	Layer,
	LayerType,
	Point,
} from '@/types'
import {
	useMutation,
	useStorage,
	useUpdateMyPresence,
} from '@liveblocks/react/suspense'
import Cursors from './Cursors'
import { pointerEventToCanvasPoint } from '@/lib/utils'
import LayerPreview from './LayerPreview'
import { nanoid } from 'nanoid'
import { LiveObject } from '@liveblocks/client'

const Canvas = ({ id }: { id: Id<'boards'> }) => {
	const [canvasState, setCanvasState] = useState<CanvasState>({
		mode: CanvasMode.NONE,
	})
	const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 })
	const layerIds = useStorage(root => root.layerIds)
	const updateMyPresense = useUpdateMyPresence()

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

	const onPointerUp = (e: React.PointerEvent) => {
		const point = pointerEventToCanvasPoint(e, camera)

		if (canvasState.mode === CanvasMode.INSERTING)
			insertLayer(canvasState.layerType, point)
	}

	const onPointerMove = (e: React.PointerEvent) => {
		const cursor = pointerEventToCanvasPoint(e, camera)

		updateMyPresense({ cursor })
	}

	const onPointerLeave = (e: React.PointerEvent) => {
		updateMyPresense({ cursor: null })
	}

	const onWheel = useCallback((e: React.WheelEvent) => {
		setCamera(camera => ({ x: camera.x - e.deltaX, y: camera.y - e.deltaY }))
	}, [])

	return (
		<div className='relative h-full'>
			<Info id={id} />
			<Participants />
			{/* TODO: undo redo */}
			<Toolbar canvasState={canvasState} setCanvasState={setCanvasState} />
			<svg
				className='h-screen w-screen'
				onPointerUp={onPointerUp}
				onPointerMove={onPointerMove}
				onPointerLeave={onPointerLeave}
				onWheel={onWheel}
			>
				<g style={{ translate: `${camera.x}px ${camera.y}px` }}>
					{layerIds.map(id => (
						<LayerPreview key={id} id={id} />
					))}
					<Cursors />
				</g>
			</svg>
		</div>
	)
}

export default Canvas
