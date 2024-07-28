import { Id } from '@/convex/_generated/dataModel'
import Info from './info'
import Participants from './participants'
import Toolbar from './toolbar'

const Canvas = ({ id }: { id: Id<'boards'> }) => {
	return (
		<div className='p-4 relative h-full'>
			<Info id={id} />
			<Participants />
			<Toolbar />
		</div>
	)
}

export default Canvas
