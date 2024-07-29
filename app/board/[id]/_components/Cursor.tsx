import { connectionIdToColor } from '@/lib/utils'
import { useOther } from '@liveblocks/react/suspense'
import { MousePointer2 } from 'lucide-react'
import { memo } from 'react'

const Cursor = memo(({ id }: { id: number }) => {
	const info = useOther(id, user => user.info)
	const cursor = useOther(id, user => user.presence.cursor)

	const name = info.name

	if (!cursor) return null

	const { x, y } = cursor

	return (
		<foreignObject
			style={{ translate: `${x}px ${y}px` }}
			height={50}
			width={name.length * 10 + 24}
			className='relative drop-shadow-md'
		>
			<MousePointer2
				className='h-5 w-5'
				style={{
					fill: connectionIdToColor(id),
					color: connectionIdToColor(id),
				}}
			/>
			<div
				className='absolute rounded-md left-5 px-1.5 py-0.5 text-xs text-white'
				style={{ backgroundColor: connectionIdToColor(id) }}
			>
				{name}
			</div>
		</foreignObject>
	)
})

Cursor.displayName = 'Cursor'

export default Cursor
