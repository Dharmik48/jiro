'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { useOthers, useSelf } from '@liveblocks/react/suspense'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const Participants = () => {
	const users = useOthers()
	const currentUser = useSelf()

	return (
		<div className='absolute top-4 right-4 rounded-lg border p-4 bg-secondary text-secondary-foreground border-border shadow-sm max-w-xs h-12 flex items-center'>
			<div className='flex items-center -space-x-2'>
				{[...users, currentUser].map((user, i) => (
					<Avatar key={user.id} className='h-8 w-8'>
						<AvatarImage src={user.info.avatar} />
						<AvatarFallback>{user.info.name.slice(0, 2)}</AvatarFallback>
					</Avatar>
				))}
			</div>
		</div>
	)
}

Participants.Skeleton = function ParticipantsSkeleton() {
	return (
		<div className='absolute top-4 right-4 rounded-lg border p-4 bg-secondary text-secondary-foreground border-border shadow-sm w-28 h-14'>
			<Skeleton />
		</div>
	)
}

export default Participants
