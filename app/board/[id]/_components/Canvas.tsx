'use client'

import { Id } from '@/convex/_generated/dataModel'
import Info from './info'
import Participants from './participants'
import Toolbar from './toolbar'
import { useCallback, useState } from 'react'
import { Camera, CanvasMode, CanvasState } from '@/types'
import { useUpdateMyPresence } from '@liveblocks/react/suspense'
import Cursors from './Cursors'
import { pointerEventToCanvasPoint } from '@/lib/utils'

const Canvas = ({ id }: { id: Id<'boards'> }) => {
	const [canvasState, setCanvasState] = useState<CanvasState>({
		mode: CanvasMode.NONE,
	})
	const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 })
	const updateMyPresense = useUpdateMyPresence()

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
		<div className='p-4 relative h-full'>
			<Info id={id} />
			<Participants />
			<Toolbar canvasState={canvasState} setCanvasState={setCanvasState} />
			<svg
				className='h-full w-full'
				onPointerMove={onPointerMove}
				onPointerLeave={onPointerLeave}
				onWheel={onWheel}
			>
				<g style={{ translate: `${camera.x}px ${camera.y}px` }}>
					<Cursors />
				</g>
			</svg>
		</div>
	)
}

export default Canvas
