'use client'

import Path from '@/components/Path'
import { colorTypeToRGB, connectionIdToColor } from '@/lib/utils'
import { User } from '@liveblocks/node'
import { useOthersMapped, useOthers, shallow } from '@liveblocks/react/suspense'
import { MousePointer2 } from 'lucide-react'
import { memo } from 'react'

const Cursor = memo(({ other }: { other: User }) => {
	if (!other.presence.cursor) return

	const color = connectionIdToColor(other.connectionId)
	const { x, y } = other.presence.cursor

	return (
		<foreignObject
			className='shadow-sm relative'
			style={{
				translate: `${x}px ${y}px`,
			}}
			height={50}
			width={other.info.name.length * 10 + 24}
		>
			<MousePointer2 className='h-5 w-5' fill={color} color={color} />
			<span
				style={{ backgroundColor: color }}
				className='text-white rounded-md py-0.5 px-1 text-sm absolute left-5 block'
			>
				{other.info.name}
			</span>
		</foreignObject>
	)
})

Cursor.displayName = 'Cursor'

const Drafts = () => {
	const others = useOthersMapped(
		other => ({
			pencilDraft: other.presence.pencilDraft,
			color: other.presence.color,
		}),
		shallow
	)

	return (
		<>
			{others.map(([key, other]) => {
				if (other.pencilDraft)
					return (
						<Path
							key={key}
							x={0}
							y={0}
							points={other.pencilDraft}
							fill={other.color ? colorTypeToRGB(other.color) : '#fff'}
						/>
					)
				return null
			})}
		</>
	)
}

const Cursors = () => {
	const others = useOthers()

	if (!others.length) return

	return (
		<>
			{others.map(other => (
				<Cursor key={other.id} other={other} />
			))}
			<Drafts />
		</>
	)
}

export default Cursors
