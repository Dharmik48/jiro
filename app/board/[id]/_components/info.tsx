'use client'

import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import { Id } from '@/convex/_generated/dataModel'
import BoardActions from '@/components/BoardActions'
import { MoreHorizontal } from 'lucide-react'

const Info = ({ id }: { id: Id<'boards'> }) => {
	const board = useQuery(api.boards.getSingle, { id })

	return (
		<div className='absolute top-4 left-4 rounded-lg border p-4 bg-secondary text-secondary-foreground border-border shadow-sm max-w-sm flex space-x-4 items-center h-12'>
			<Link href={'/'}>
				<Image src={'/logo.svg'} alt='Jiro Logo' width={28} height={28} />
			</Link>
			<Separator orientation='vertical' className='bg-secondary-foreground' />
			<h2>{board?.title}</h2>
			<Separator orientation='vertical' className='bg-secondary-foreground' />
			<BoardActions id={id} title={board?.title!}>
				<button className='focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm ring-offset-transparent'>
					<MoreHorizontal />
				</button>
			</BoardActions>
		</div>
	)
}

Info.Skeleton = function InfoSkeleton() {
	return (
		<div className='absolute top-4 left-4 rounded-lg border p-4 bg-secondary text-secondary-foreground border-border shadow-sm w-52 h-14'>
			<Skeleton />
		</div>
	)
}

export default Info
