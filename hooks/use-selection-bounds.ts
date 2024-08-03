import { Layer, XYWH } from '@/types'
import { shallow, useSelf, useStorage } from '@liveblocks/react'

const getBoundingBox = (layers: Layer[]): XYWH => {
	const first = layers[0]

	let left = first.x
	let top = first.y
	let right = first.x + first.width
	let bottom = first.y + first.height

	layers.forEach(layer => {
		// check left
		if (layer.x < left) left = layer.x
		// check top
		if (layer.y < top) top = layer.y
		// check right
		if (layer.x + layer.width > right) right = layer.x + layer.width
		// check bottom
		if (layer.y + layer.height > bottom) bottom = layer.y + layer.height
	})

	return { x: left, y: top, width: right - left, height: bottom - top }
}

export const useSelectionBounds = () => {
	const selection = useSelf(root => root.presence.selection)
	const layers: any = useStorage(root =>
		selection?.map(layerId => root.layers.get(layerId))
	)

	if (!layers || !layers.length) return null

	return getBoundingBox(layers)
}
