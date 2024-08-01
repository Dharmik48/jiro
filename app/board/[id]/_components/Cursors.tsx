'use client'

import { connectionIdToColor } from '@/lib/utils'
import { User } from '@liveblocks/node'
import { useOthers } from '@liveblocks/react/suspense'
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

const Cursors = () => {
	const others = useOthers()

	if (!others.length) return

	return others.map(other => <Cursor key={other.id} other={other} />)
}

export default Cursors
