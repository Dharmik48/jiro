'use client'

import { LayerType } from '@/types'
import { useSelf, useStorage } from '@liveblocks/react/suspense'
import Rectangle from './Rectangle'
import Ellipse from '@/components/Ellipse'

interface Props {
	id: string
	onLayerPointerDown: (id: string, e: React.PointerEvent) => void
	selectionColor: string
}

const LayerPreview = ({ id, ...props }: Props) => {
	const layer = useStorage(root => root.layers.get(id))

	if (!layer) return

	switch (layer.layerType) {
		case LayerType.RECTANGLE:
			return <Rectangle id={id} layer={layer} {...props} />
		case LayerType.ELLIPSIS:
			return <Ellipse id={id} layer={layer} {...props} />
		default:
			break
	}
	return 'layer'
}

export default LayerPreview
