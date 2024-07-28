import { Room } from '@/components/Room'
import Canvas from './_components/Canvas'
import Loading from './_components/Loading'

interface Props {
	params: { id: string }
}

const Board = ({ params }: Props) => {
	return (
		<Room roomId={params.id} fallback={<Loading />}>
			<Canvas />
		</Room>
	)
}

export default Board
