'use client'

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Id } from '@/convex/_generated/dataModel'
import { useAuth } from '@clerk/nextjs'
import { formatDistanceToNow } from 'date-fns'
import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Skeleton } from './ui/skeleton'

interface Props {
	board: {
		_id: Id<'boards'>
		_creationTime: number
		title: string
		orgId: string
		authorId: string
		authorName: string
		imageUrl: string
	}
}

const BoardCard = ({ board }: Props) => {
	const { userId } = useAuth()

	const author = board.authorId === userId ? 'You' : board.authorName
	const createdAt = formatDistanceToNow(board._creationTime, {
		addSuffix: true,
	})

	return (
		<Link
			href={`/board/${board._id}`}
			className='group aspect-[190/227] w-[256px]'
		>
			<Card className='border-border w-full overflow-hidden h-full flex flex-col'>
				<CardHeader className='relative bg-primary/20 flex-1'>
					<Image src={board.imageUrl} fill alt={board.title} className='p-4' />
					<div className='bg-white/5 rounded-t-lg absolute inset-0 !mt-0 opacity-0 group-hover:opacity-100 transition-opacity'></div>
				</CardHeader>
				<CardContent className='p-6 pb-2 flex justify-between'>
					<CardTitle>{board.title}</CardTitle>
					<button className='hover:text-primary opacity-0 group-hover:opacity-100 transition-all'>
						<Star size={20} />
					</button>
				</CardContent>
				<CardFooter className='text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity'>
					{author}, {createdAt}
				</CardFooter>
			</Card>
		</Link>
	)
}

BoardCard.Skeleton = function BoardCardSkeleton() {
	return (
		<div className='aspect-[190/227] w-[256px]'>
			<Skeleton className='h-full w-full' />
		</div>
	)
}

export default BoardCard
