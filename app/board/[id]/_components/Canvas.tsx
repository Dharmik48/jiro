import Info from './info'
import Participants from './participants'
import Toolbar from './toolbar'

const Canvas = () => {
	return (
		<div className='p-4 relative h-full'>
			<Info />
			<Participants />
			<Toolbar />
		</div>
	)
}

export default Canvas
