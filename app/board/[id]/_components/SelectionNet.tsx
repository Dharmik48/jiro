import { getSelectionNetBounds } from '@/lib/utils'
import { Point } from '@/types'

interface Props {
	initial: Point
	current: Point
}

const SelectionNet = ({ initial, current }: Props) => {
	const { x, y, width, height } = getSelectionNetBounds(initial, current)

	return (
		<rect
			x={x}
			y={y}
			width={width}
			height={height}
			fill='rgba(84, 23, 217, 0.3)'
			stroke='hsl(259 81% 47%)'
		/>
	)
}

export default SelectionNet
