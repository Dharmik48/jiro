import { colorTypeToRGB } from '@/lib/utils'
import { EllipsisLayer } from '@/types'

interface Props {
	id: string
	layer: EllipsisLayer
	onLayerPointerDown: (id: string, e: React.PointerEvent) => void
	selectionColor: string
}

const Ellipse = ({ id, layer, onLayerPointerDown, selectionColor }: Props) => {
	return (
		<ellipse
			className='drop-shadow-md'
			style={{ translate: `${layer.x}px ${layer.y}px` }}
			cx={layer.width / 2}
			cy={layer.height / 2}
			rx={layer.width / 2}
			ry={layer.height / 2}
			fill={colorTypeToRGB(layer.fill)}
			onPointerDown={e => onLayerPointerDown(id, e)}
			strokeWidth={2}
			stroke={selectionColor}
		/>
	)
}

export default Ellipse
