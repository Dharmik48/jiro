'use client'

import { Loader } from 'lucide-react'
import Info from './info'
import Participants from './participants'
import Toolbar from './toolbar'

const Loading = () => {
	return (
		<div className='h-full flex items-center justify-center'>
			<Loader className='animate-spin' />
			<Info.Skeleton />
			<Participants.Skeleton />
			<Toolbar.Skeleton />
		</div>
	)
}

export default Loading
