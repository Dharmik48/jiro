import EmptyState from './EmptyState'
import { Button } from './ui/button'
import { toast } from 'sonner'
import { api } from '@/convex/_generated/api'
import { useApiMutations } from '@/hooks/use-api-mutations'
import { useQuery } from 'convex/react'
import BoardCard from './BoardCard'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
	query: { [key: string]: string | string[] | undefined }
	orgId: string
}

const BoardsList = ({ query, orgId }: Props) => {
	const { search, favorite } = query
	const { pending, mutate: createBoard } = useApiMutations(api.boards.create)
	const data = useQuery(api.boards.get, { orgId: orgId })

	if (data === undefined)
		return (
			<div>
				<h2 className='font-bold text-4xl'>
					{favorite ? 'Favorite Boards' : 'Team Boards'}
				</h2>
				<div className='flex flex-wrap gap-4 py-8'>
					<button
						className={
							'aspect-[190/227] w-[256px] flex items-center justify-center flex-col bg-secondary rounded-lg gap-2 shadow-sm text-secondary-foreground cursor-not-allowed opacity-80'
						}
						disabled
					>
						<Plus size={36} />
						<h4>New Board</h4>
					</button>
					<BoardCard.Skeleton />
					<BoardCard.Skeleton />
					<BoardCard.Skeleton />
				</div>
			</div>
		)

	const handleClick = async () => {
		if (!orgId) return
		try {
			const res = await createBoard({
				title: 'Untitled',
				orgId,
			})
			toast.success('Board created')
		} catch (error) {
			toast.error('Failed to create board')
		}
	}
	if (!data.length && search)
		return (
			<EmptyState
				imageSrc='/empty-search.svg'
				heading='No results found!'
				subheading='Try searching for something else'
			/>
		)

	if (!data.length && favorite)
		return (
			<EmptyState
				imageSrc='/empty-favorite.svg'
				heading='No favorite boards!'
				subheading='Try favoriting a board'
			/>
		)

	if (!data.length)
		return (
			<EmptyState
				imageSrc='/empty-boards.svg'
				heading='Create your first board!'
				subheading='Start by creating a board for your organization'
			>
				<Button
					size={'lg'}
					className='mt-2'
					disabled={pending}
					onClick={handleClick}
				>
					Create board
				</Button>
			</EmptyState>
		)

	return (
		<div>
			<h2 className='font-bold text-4xl'>
				{favorite ? 'Favorite Boards' : 'Team Boards'}
			</h2>
			<div className='flex flex-wrap gap-4 py-8'>
				<button
					className={cn(
						'aspect-[190/227] w-[256px] flex items-center justify-center flex-col bg-secondary rounded-lg gap-2 hover:opacity-80 transition-opacity shadow-sm text-secondary-foreground',
						pending && 'cursor-not-allowed opacity-80'
					)}
					disabled={pending}
					onClick={handleClick}
				>
					<Plus size={36} />
					<h4>New Board</h4>
				</button>
				{data
					.filter(board => (favorite ? board.isFavorite : true))
					.map(board => (
						<BoardCard key={board._id} board={board} />
					))}
			</div>
		</div>
	)
}

export default BoardsList
