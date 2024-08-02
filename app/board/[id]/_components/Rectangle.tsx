import { colorTypeToRGB } from '@/lib/utils'
import { RectangleLayer } from '@/types'

const Rectangle = ({ layer }: { layer: RectangleLayer }) => {
	return (
		<rect
			style={{ translate: `${layer.x}px ${layer.y}px` }}
			x={0}
			y={0}
			height={layer.height}
			width={layer.width}
			fill={colorTypeToRGB(layer.fill)}
		/>
	)
}

export default Rectangle
