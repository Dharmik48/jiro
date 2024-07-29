'use client'

import { Id } from '@/convex/_generated/dataModel'
import Info from './info'
import Participants from './participants'
import Toolbar from './toolbar'
import { useCanRedo, useCanUndo, useHistory } from '@liveblocks/react/suspense'
import { useState } from 'react'
import { CanvasMode, CanvasState } from '@/types/canvas'

const Canvas = ({ id }: { id: Id<'boards'> }) => {
	const [state, setState] = useState<CanvasState>({
		mode: CanvasMode.None,
	})
	const canUndo = useCanUndo()
	const canRedo = useCanRedo()
	const history = useHistory()

	return (
		<div className='p-4 relative h-full'>
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
		</div>
	)
}

export default Canvas
