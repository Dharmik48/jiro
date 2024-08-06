'use client'

import { Kalam } from 'next/font/google'
import { cn, colorTypeToRGB } from '@/lib/utils'
import type { TextLayer } from '@/types'
import { createRef, useRef } from 'react'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import { useMutation } from '@liveblocks/react'

const font = Kalam({
	subsets: ['latin'],
	weight: ['400'],
})

interface Props {
	id: string
	layer: TextLayer
	onLayerPointerDown: (id: string, e: React.PointerEvent) => void
	selectionColor: string
}

const TextLayer = ({
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
		const scaleFactor = 0.25
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
				outline: selectionColor ? `1px solid ${selectionColor}` : 'none',
			}}
		>
			<ContentEditable
				className={cn(
					'h-full w-full flex items-center justify-center outline-none drop-shadow-md text-center',
					font.className
				)}
				style={{
					fontSize: calculateFontSize(layer.width, layer.height),
					color: colorTypeToRGB(layer.fill),
				}}
				html={layer.value || 'Text'}
				disabled={false}
				onChange={handleChange}
				defaultValue={'Type Here'}
			/>
		</foreignObject>
	)
}

export default TextLayer
