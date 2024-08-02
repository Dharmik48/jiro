import { colorTypeToRGB } from '@/lib/utils'
import { RectangleLayer } from '@/types'

interface Props {
	id: string
	layer: RectangleLayer
	onLayerPointerDown: (id: string, e: React.PointerEvent) => void
	selectionColor: string
}

const Rectangle = ({
	id,
	layer,
	onLayerPointerDown,
	selectionColor,
}: Props) => {
	return (
		<rect
			className='drop-shadow-md'
			style={{ translate: `${layer.x}px ${layer.y}px` }}
			x={0}
			y={0}
			height={layer.height}
			width={layer.width}
			fill={colorTypeToRGB(layer.fill)}
			onPointerDown={e => onLayerPointerDown(id, e)}
			strokeWidth={2}
			stroke={selectionColor}
		/>
	)
}

export default Rectangle
