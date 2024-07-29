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
} from '@liveblocks/react/suspense'
import { useCallback, useState } from 'react'
import { Camera, CanvasMode, CanvasState } from '@/types/canvas'
import CursorsPresence from './CursorsPresence'
import { pointerEventToCanvasPoint } from '@/lib/utils'

const Canvas = ({ id }: { id: Id<'boards'> }) => {
	const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 })
	const [state, setState] = useState<CanvasState>({
		mode: CanvasMode.None,
	})
	const canUndo = useCanUndo()
	const canRedo = useCanRedo()
	const history = useHistory()

	const onWheel = useCallback((e: React.WheelEvent) => {
		setCamera(camera => ({ x: camera.x - e.deltaX, y: camera.y - e.deltaY }))
	}, [])

	const onPointerMove = useMutation(
		({ setMyPresence }, e: React.PointerEvent) => {
			e.preventDefault()

			const current = pointerEventToCanvasPoint(e, camera)

			setMyPresence({ cursor: current })
		},
		[]
	)

	const onPointerLeave = useMutation(
		({ setMyPresence }, e: React.PointerEvent) => {
			e.preventDefault()

			setMyPresence({ cursor: null })
		},
		[]
	)

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
			>
				<g>
					<CursorsPresence />
				</g>
			</svg>
		</div>
	)
}

export default Canvas
