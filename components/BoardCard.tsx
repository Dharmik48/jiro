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
import { MoreHorizontal, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Skeleton } from './ui/skeleton'
import BoardActions from './BoardActions'
import { useApiMutations } from '@/hooks/use-api-mutations'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface Props {
	board: {
		_id: Id<'boards'>
		_creationTime: number
		title: string
		orgId: string
		authorId: string
		authorName: string
		imageUrl: string
		isFavorite: boolean
	}
}

const BoardCard = ({ board }: Props) => {
	const { userId } = useAuth()
	const { mutate: mutateFavorite, pending: pendingFavorite } = useApiMutations(
		api.boards.favorite
	)
	const { mutate: mutateUnFavorite, pending: pendingUnFavorite } =
		useApiMutations(api.boards.unfavorite)

	const author = board.authorId === userId ? 'You' : board.authorName
	const createdAt = formatDistanceToNow(board._creationTime, {
		addSuffix: true,
	})

	const toggleFavorite = async (e: React.MouseEvent) => {
		e.stopPropagation()
		e.preventDefault()
		try {
			if (board.isFavorite)
				await mutateUnFavorite({ id: board._id }).then(() =>
					toast.success('Board Unfavorited')
				)
			if (!board.isFavorite)
				await mutateFavorite({ id: board._id }).then(() =>
					toast.success('Board Favorited')
				)
		} catch (error: any) {
			toast.error('Something went wrong')
		}
	}

	return (
		<Link
			href={`/board/${board._id}`}
			className='group aspect-[190/227] w-[256px]'
		>
			<Card className='relative border-border w-full overflow-hidden h-full flex flex-col'>
				<BoardActions id={board._id} title={board.title}>
					<button className='absolute z-[5] right-4 top-2 opacity-0 group-hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm'>
						<MoreHorizontal />
					</button>
				</BoardActions>
				<CardHeader className='relative bg-primary/20 flex-1'>
					<Image src={board.imageUrl} fill alt={board.title} className='p-4' />
					<div className='bg-white/5 rounded-t-lg absolute inset-0 !mt-0 opacity-0 group-hover:opacity-100 transition-opacity'></div>
				</CardHeader>
				<CardContent className='p-6 pb-2 flex justify-between'>
					<CardTitle>{board.title}</CardTitle>
					<button
						className={cn(
							'hover:text-primary opacity-0 group-hover:opacity-100 transition-all',
							board.isFavorite && 'text-primary'
						)}
						onClick={toggleFavorite}
						disabled={pendingFavorite || pendingUnFavorite}
					>
						<Star
							size={20}
							className={cn(board.isFavorite && 'fill-primary')}
						/>
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
