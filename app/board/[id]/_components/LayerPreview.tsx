'use client'

import { LayerType } from '@/types/canvas'
import { useStorage } from '@liveblocks/react/suspense'
import { memo } from 'react'
import Rectangle from './rectangle'

interface Props {
	id: string
	selectionColor?: string
	onPointerDown: (e: React.PointerEvent, id: string) => void
}

const LayerPreview = memo(({ id, selectionColor, onPointerDown }: Props) => {
	const layer = useStorage(root => root.layers.get(id))
	if (!layer) return null

	switch (layer.type) {
		case LayerType.Rectangle:
			return (
				<Rectangle
					id={id}
					selectionColor={selectionColor}
					onPointerDown={onPointerDown}
					layer={layer}
				/>
			)

		default:
			console.warn('Unknown layer type')
			return null
	}
})

LayerPreview.displayName = 'LayerPreview'

export default LayerPreview
