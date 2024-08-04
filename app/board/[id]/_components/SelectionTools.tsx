'use client'

import { useSelectionBounds } from '@/hooks/use-selection-bounds'
import { Camera, Color } from '@/types'
import ColorPicker from './ColorPicker'
import DeleteLayer from './DeleteLayer'

interface Props {
	camera: Camera
	onChange: (color: Color) => void
	onDelete: () => void
}

const SelectionTools = ({ camera, onChange, onDelete }: Props) => {
	const bounds = useSelectionBounds()

	if (!bounds) return

	const x = bounds.x + bounds.width / 2 + camera.x
	const y = bounds.y + camera.y

	return (
		<div
			className='bg-secondary shadow-lg absolute p-4 rounded-md flex items-center justify-center'
			style={{ translate: `calc(${x}px - 50%) calc(${y - 16}px - 100%)` }}
		>
			<ColorPicker onChange={onChange} />
			<DeleteLayer onClick={onDelete} />
		</div>
	)
}

export default SelectionTools
