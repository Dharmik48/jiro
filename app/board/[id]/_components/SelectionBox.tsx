'use client'

import { useSelectionBounds } from '@/hooks/use-selection-bounds'
import { Side, XYWH } from '@/types'
import { useSelf } from '@liveblocks/react/suspense'
import { memo } from 'react'

const STROKE_WIDTH = 8

interface Props {
	onResizePointerDown: (initialBounds: XYWH, corner: Side[]) => void
}

const SelectionBox = memo(({ onResizePointerDown }: Props) => {
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
						onPointerDown={() =>
							onResizePointerDown(bounds, [Side.Left, Side.Top])
						}
					/>
					{/* TOP */}
					<rect
						className='stroke-blue-500 cursor-ns-resize'
						width={STROKE_WIDTH}
						height={STROKE_WIDTH}
						fill={'#fff'}
						x={bounds.x + bounds.width / 2 - STROKE_WIDTH / 2}
						y={bounds.y - STROKE_WIDTH / 2}
						onPointerDown={() => onResizePointerDown(bounds, [Side.Top])}
					/>
					{/* TOP RIGHT */}
					<rect
						className='stroke-blue-500 cursor-nesw-resize'
						width={STROKE_WIDTH}
						height={STROKE_WIDTH}
						fill={'#fff'}
						x={bounds.x + bounds.width - STROKE_WIDTH / 2}
						y={bounds.y - STROKE_WIDTH / 2}
						onPointerDown={() =>
							onResizePointerDown(bounds, [Side.Top, Side.Right])
						}
					/>
					{/* RIGHT */}
					<rect
						className='stroke-blue-500 cursor-ew-resize'
						width={STROKE_WIDTH}
						height={STROKE_WIDTH}
						fill={'#fff'}
						x={bounds.x + bounds.width - STROKE_WIDTH / 2}
						y={bounds.y + bounds.height / 2 - STROKE_WIDTH / 2}
						onPointerDown={() => onResizePointerDown(bounds, [Side.Right])}
					/>
					{/* BOTTOM RIGHT */}
					<rect
						className='stroke-blue-500 cursor-nwse-resize'
						width={STROKE_WIDTH}
						height={STROKE_WIDTH}
						fill={'#fff'}
						x={bounds.x + bounds.width - STROKE_WIDTH / 2}
						y={bounds.y + bounds.height - STROKE_WIDTH / 2}
						onPointerDown={() =>
							onResizePointerDown(bounds, [Side.Bottom, Side.Right])
						}
					/>
					{/* BOTTOM */}
					<rect
						className='stroke-blue-500 cursor-ns-resize'
						width={STROKE_WIDTH}
						height={STROKE_WIDTH}
						fill={'#fff'}
						x={bounds.x + bounds.width / 2 - STROKE_WIDTH / 2}
						y={bounds.y + bounds.height - STROKE_WIDTH / 2}
						onPointerDown={() => onResizePointerDown(bounds, [Side.Bottom])}
					/>
					{/* BOTTOM LEFT */}
					<rect
						className='stroke-blue-500 cursor-nesw-resize'
						width={STROKE_WIDTH}
						height={STROKE_WIDTH}
						fill={'#fff'}
						x={bounds.x - STROKE_WIDTH / 2}
						y={bounds.y + bounds.height - STROKE_WIDTH / 2}
						onPointerDown={() =>
							onResizePointerDown(bounds, [Side.Bottom, Side.Left])
						}
					/>
					{/* LEFT */}
					<rect
						className='stroke-blue-500 cursor-ew-resize'
						width={STROKE_WIDTH}
						height={STROKE_WIDTH}
						fill={'#fff'}
						x={bounds.x - STROKE_WIDTH / 2}
						y={bounds.y + bounds.height / 2 - STROKE_WIDTH / 2}
						onPointerDown={() => onResizePointerDown(bounds, [Side.Left])}
					/>
				</>
			)}
		</>
	)
})

SelectionBox.displayName = 'Selection Box'

export default SelectionBox
