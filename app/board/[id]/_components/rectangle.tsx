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
			onPointerDown={e => onPointerDown(e, id)}
			style={{
				translate: `${x}px ${y}px`,
			}}
			width={width}
			height={height}
			x={0}
			y={0}
			fill={`rgb(${fill.r}, ${fill.g}, ${fill.b})`}
			stroke={selectionColor}
			strokeWidth={1}
		/>
	)
}

export default Rectangle
