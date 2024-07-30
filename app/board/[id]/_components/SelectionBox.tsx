'use client'

import { useSelectionBounds } from '@/hooks/use-selection-bound'
import { LayerType, Side, XYWH } from '@/types/canvas'
import { useSelf, useStorage } from '@liveblocks/react/suspense'
import { memo } from 'react'

interface Props {
	onResizeHandlePointerDown: (corner: Side, initialBounds: XYWH) => void
}

const HANDLE_WIDTH = 8

const SelectionBox = memo(({ onResizeHandlePointerDown }: Props) => {
	const soleLayerId = useSelf(me =>
		me.presence.selection.length ? me.presence.selection[0] : null
	)

	const isShowingHandles = useStorage(
		root => soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path
	)

	const bounds = useSelectionBounds()

	if (!bounds) return bounds

	return (
		<>
			<rect
				className='fill-transparent stroke-blue-500 pointer-events-none'
				style={{ translate: `${bounds.x}px ${bounds.y}px` }}
				x={0}
				y={0}
				height={bounds.height}
				width={bounds.width}
			/>
			{isShowingHandles && (
				<>
					<rect
						className='fill-white stroke-1 stroke-blue-500'
						x={0}
						y={0}
						style={{
							cursor: 'nwse-resize',
							width: `${HANDLE_WIDTH}px`,
							height: `${HANDLE_WIDTH}px`,
							translate: `${bounds.x - HANDLE_WIDTH / 2}px ${bounds.y - HANDLE_WIDTH / 2}px`,
						}}
						onPointerDown={e => {
							e.stopPropagation()
							onResizeHandlePointerDown(Side.Top + Side.Left, bounds)
						}}
					/>
					<rect
						className='fill-white stroke-1 stroke-blue-500'
						x={0}
						y={0}
						style={{
							cursor: 'ns-resize',
							width: `${HANDLE_WIDTH}px`,
							height: `${HANDLE_WIDTH}px`,
							translate: `${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px ${bounds.y - HANDLE_WIDTH / 2}px`,
						}}
						onPointerDown={e => {
							e.stopPropagation()
							onResizeHandlePointerDown(Side.Top, bounds)
						}}
					/>
					<rect
						className='fill-white stroke-1 stroke-blue-500'
						x={0}
						y={0}
						style={{
							cursor: 'nesw-resize',
							width: `${HANDLE_WIDTH}px`,
							height: `${HANDLE_WIDTH}px`,
							translate: `${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px ${bounds.y - HANDLE_WIDTH / 2}px`,
						}}
						onPointerDown={e => {
							e.stopPropagation()
							onResizeHandlePointerDown(Side.Top + Side.Right, bounds)
						}}
					/>
					<rect
						className='fill-white stroke-1 stroke-blue-500'
						x={0}
						y={0}
						style={{
							cursor: 'ew-resize',
							width: `${HANDLE_WIDTH}px`,
							height: `${HANDLE_WIDTH}px`,
							translate: `${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px ${bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2}px`,
						}}
						onPointerDown={e => {
							e.stopPropagation()
							onResizeHandlePointerDown(Side.Right, bounds)
						}}
					/>
					<rect
						className='fill-white stroke-1 stroke-blue-500'
						x={0}
						y={0}
						style={{
							cursor: 'nwse-resize',
							width: `${HANDLE_WIDTH}px`,
							height: `${HANDLE_WIDTH}px`,
							translate: `${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px`,
						}}
						onPointerDown={e => {
							e.stopPropagation()
							onResizeHandlePointerDown(Side.Bottom + Side.Right, bounds)
						}}
					/>
					<rect
						className='fill-white stroke-1 stroke-blue-500'
						x={0}
						y={0}
						style={{
							cursor: 'ns-resize',
							width: `${HANDLE_WIDTH}px`,
							height: `${HANDLE_WIDTH}px`,
							translate: `${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px`,
						}}
						onPointerDown={e => {
							e.stopPropagation()
							onResizeHandlePointerDown(Side.Bottom, bounds)
						}}
					/>
					<rect
						className='fill-white stroke-1 stroke-blue-500'
						x={0}
						y={0}
						style={{
							cursor: 'nesw-resize',
							width: `${HANDLE_WIDTH}px`,
							height: `${HANDLE_WIDTH}px`,
							translate: `${bounds.x - HANDLE_WIDTH / 2}px ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px`,
						}}
						onPointerDown={e => {
							e.stopPropagation()
							onResizeHandlePointerDown(Side.Bottom + Side.Left, bounds)
						}}
					/>
					<rect
						className='fill-white stroke-1 stroke-blue-500'
						x={0}
						y={0}
						style={{
							cursor: 'ew-resize',
							width: `${HANDLE_WIDTH}px`,
							height: `${HANDLE_WIDTH}px`,
							translate: `${bounds.x - HANDLE_WIDTH / 2}px ${bounds.y - HANDLE_WIDTH / 2 + bounds.height / 2}px`,
						}}
						onPointerDown={e => {
							e.stopPropagation()
							onResizeHandlePointerDown(Side.Left, bounds)
						}}
					/>
				</>
			)}
		</>
	)
})

SelectionBox.displayName = 'SelectionBox'

export default SelectionBox
