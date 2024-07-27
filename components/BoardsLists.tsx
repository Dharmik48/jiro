import EmptyState from './EmptyState'
import { Button } from './ui/button'

interface Props {
	query: { [key: string]: string | string[] | undefined }
}

const BoardsList = ({ query }: Props) => {
	const { search, favorite } = query
	const data = []

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
				<Button size={'lg'} className='mt-2'>
					Create board
				</Button>
			</EmptyState>
		)

	return <div>Boards</div>
}

export default BoardsList
