'use client'

import { Id } from '@/convex/_generated/dataModel'
import Info from './info'
import Participants from './participants'
import Toolbar from './toolbar'
import { useState } from 'react'
import { CanvasMode, CanvasState } from '@/types'

const Canvas = ({ id }: { id: Id<'boards'> }) => {
	const [canvasState, setCanvasState] = useState<CanvasState>({
		mode: CanvasMode.NONE,
	})

	return (
		<div className='p-4 relative h-full'>
			<Info id={id} />
			<Participants />
			<Toolbar canvasState={canvasState} setCanvasState={setCanvasState} />
			<svg>
				<g></g>
			</svg>
		</div>
	)
}

export default Canvas
