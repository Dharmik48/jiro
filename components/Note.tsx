'use client'

import { Kalam } from 'next/font/google'
import { cn, colorTypeToRGB, getContrastTextColor } from '@/lib/utils'
import type { NoteLayer } from '@/types'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import { useMutation } from '@liveblocks/react'

const font = Kalam({
	subsets: ['latin'],
	weight: ['400'],
})

interface Props {
	id: string
	layer: NoteLayer
	onLayerPointerDown: (id: string, e: React.PointerEvent) => void
	selectionColor: string
}

const NoteLayer = ({
	id,
	layer,
	onLayerPointerDown,
	selectionColor,
}: Props) => {
	const updateValue = useMutation(({ storage }, newValue: string) => {
		const layer = storage.get('layers').get(id)

		layer?.set('value', newValue)
	}, [])

	const handleChange = (e: ContentEditableEvent) => {
		updateValue(e.target.value)
	}

	const calculateFontSize = (width: number, height: number) => {
		const maxSize = 96
		const scaleFactor = 0.1
		const basedOnHeight = height * scaleFactor
		const basedOnWidth = width * scaleFactor

		return Math.min(basedOnHeight, basedOnWidth, maxSize)
	}

	return (
		<foreignObject
			x={layer.x}
			y={layer.y}
			width={layer.width}
			height={layer.height}
			onPointerDown={e => onLayerPointerDown(id, e)}
			style={{
				outline: `1px solid ${selectionColor}`,
			}}
			className='drop-shadow-xl shadow-md'
		>
			<ContentEditable
				className={cn(
					'h-full w-full flex items-center justify-center outline-none text-center',
					font.className
				)}
				style={{
					backgroundColor: layer.fill ? colorTypeToRGB(layer.fill) : '#000',
					fontSize: calculateFontSize(layer.width, layer.height),
					color: getContrastTextColor(layer.fill),
				}}
				html={layer.value || 'Text'}
				disabled={false}
				onChange={handleChange}
				defaultValue={'Type Here'}
			/>
		</foreignObject>
	)
}

export default NoteLayer
