import { Room } from '@/components/Room'
import Canvas from './_components/Canvas'
import Loading from './_components/Loading'
import { Id } from '@/convex/_generated/dataModel'

interface Props {
	params: { id: string }
}

const Board = ({ params }: Props) => {
	return (
		<Room roomId={params.id} fallback={<Loading />}>
			<Canvas id={params.id as Id<'boards'>} />
		</Room>
	)
}

export default Board
