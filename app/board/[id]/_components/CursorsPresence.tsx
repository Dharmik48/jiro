import { useOthersConnectionIds } from '@liveblocks/react/suspense'
import { memo } from 'react'
import Cursor from './Cursor'

const Cursors = () => {
	const others = useOthersConnectionIds()

	return others.map(id => <Cursor key={id} id={id} />)
}

const CursorsPresence = memo(() => {
	return <Cursors />
})

CursorsPresence.displayName = 'CursorsPresence'

export default CursorsPresence
