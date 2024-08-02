'use client'

import { LayerType } from '@/types'
import { useStorage } from '@liveblocks/react/suspense'
import Rectangle from './Rectangle'

interface Props {
	id: string
}

const LayerPreview = ({ id }: Props) => {
	const layer = useStorage(root => root.layers.get(id))

	if (!layer) return

	switch (layer.layerType) {
		case LayerType.RECTANGLE:
			return <Rectangle layer={layer} />
		default:
			break
	}
	return 'layer'
}

export default LayerPreview
