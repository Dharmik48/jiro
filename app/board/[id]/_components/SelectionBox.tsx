'use client'

import { useSelectionBounds } from '@/hooks/use-selection-bounds'
import { useSelf } from '@liveblocks/react/suspense'
import { memo } from 'react'

const STROKE_WIDTH = 8

const SelectionBox = memo(() => {
	const isOnlyOneLayerSelected = useSelf(
		me => me.presence.selection.length === 1
	)

	const bounds = useSelectionBounds()

	if (!bounds) return null

	return (
		<>
			<rect
				className='fill-transparent stroke-blue-500 stroke-2 pointer-events-none'
				style={{ translate: `${bounds.x}px ${bounds.y}px` }}
				x={0}
				y={0}
				height={bounds.height}
				width={bounds.width}
			/>
			{isOnlyOneLayerSelected && (
				<>
					{/* TOP LEFT */}
					<rect
						className='stroke-blue-500 cursor-nwse-resize'
						width={STROKE_WIDTH}
						height={STROKE_WIDTH}
						fill={'#fff'}
						x={bounds.x - STROKE_WIDTH / 2}
						y={bounds.y - STROKE_WIDTH / 2}
					/>
					{/* TOP */}
					<rect
						className='stroke-blue-500 cursor-ns-resize'
						width={STROKE_WIDTH}
						height={STROKE_WIDTH}
						fill={'#fff'}
						x={bounds.x + bounds.width / 2 - STROKE_WIDTH / 2}
						y={bounds.y - STROKE_WIDTH / 2}
					/>
					{/* TOP RIGHT */}
					<rect
						className='stroke-blue-500 cursor-nesw-resize'
						width={STROKE_WIDTH}
						height={STROKE_WIDTH}
						fill={'#fff'}
						x={bounds.x + bounds.width - STROKE_WIDTH / 2}
						y={bounds.y - STROKE_WIDTH / 2}
					/>
					{/* RIGHT */}
					<rect
						className='stroke-blue-500 cursor-ew-resize'
						width={STROKE_WIDTH}
						height={STROKE_WIDTH}
						fill={'#fff'}
						x={bounds.x + bounds.width - STROKE_WIDTH / 2}
						y={bounds.y + bounds.height / 2 - STROKE_WIDTH / 2}
					/>
					{/* BOTTOM RIGHT */}
					<rect
						className='stroke-blue-500 cursor-nwse-resize'
						width={STROKE_WIDTH}
						height={STROKE_WIDTH}
						fill={'#fff'}
						x={bounds.x + bounds.width - STROKE_WIDTH / 2}
						y={bounds.y + bounds.height - STROKE_WIDTH / 2}
					/>
					{/* BOTTOM */}
					<rect
						className='stroke-blue-500 cursor-ns-resize'
						width={STROKE_WIDTH}
						height={STROKE_WIDTH}
						fill={'#fff'}
						x={bounds.x + bounds.width / 2 - STROKE_WIDTH / 2}
						y={bounds.y + bounds.height - STROKE_WIDTH / 2}
					/>
					{/* BOTTOM LEFT */}
					<rect
						className='stroke-blue-500 cursor-nesw-resize'
						width={STROKE_WIDTH}
						height={STROKE_WIDTH}
						fill={'#fff'}
						x={bounds.x - STROKE_WIDTH / 2}
						y={bounds.y + bounds.height - STROKE_WIDTH / 2}
					/>
					{/* LEFT */}
					<rect
						className='stroke-blue-500 cursor-ew-resize'
						width={STROKE_WIDTH}
						height={STROKE_WIDTH}
						fill={'#fff'}
						x={bounds.x - STROKE_WIDTH / 2}
						y={bounds.y + bounds.height / 2 - STROKE_WIDTH / 2}
					/>
				</>
			)}
		</>
	)
})

SelectionBox.displayName = 'Selection Box'

export default SelectionBox
