import { colorToCSS } from '@/lib/utils'
import { RectangleLayer } from '@/types/canvas'

interface Props {
	id: string
	layer: RectangleLayer
	selectionColor?: string
	onPointerDown: (e: React.PointerEvent, id: string) => void
}

const Rectangle = ({ id, layer, onPointerDown, selectionColor }: Props) => {
	const { x, y, fill, height, width } = layer

	return (
		<rect
			className='drop-shadow-md'
			onPointerDown={e => onPointerDown(e, id)}
			style={{
				translate: `${x}px ${y}px`,
			}}
			width={width}
			height={height}
			x={0}
			y={0}
			fill={fill ? colorToCSS(fill) : '#fff'}
			stroke={selectionColor || 'transparent'}
			strokeWidth={1}
		/>
	)
}

export default Rectangle
