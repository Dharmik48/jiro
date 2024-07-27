import EmptyState from './EmptyState'
import { Button } from './ui/button'
import { toast } from 'sonner'
import { api } from '@/convex/_generated/api'
import { useApiMutations } from '@/hooks/use-api-mutations'

interface Props {
	query: { [key: string]: string | string[] | undefined }
	orgId?: string
}

const BoardsList = ({ query, orgId }: Props) => {
	const { search, favorite } = query
	const { pending, mutate: createBoard } = useApiMutations(api.boards.create)
	const data = []

	const handleClick = async () => {
		console.log('yo')

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

	return <div>Boards</div>
}

export default BoardsList
