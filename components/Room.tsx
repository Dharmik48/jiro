'use client'

import { ReactNode } from 'react'
import {
	LiveblocksProvider,
	RoomProvider,
	ClientSideSuspense,
} from '@liveblocks/react/suspense'

interface Props {
	children: ReactNode
	roomId: string
	fallback: ReactNode
}

export function Room({ children, roomId, fallback }: Props) {
	return (
		<LiveblocksProvider authEndpoint={'/api/liveblocks-auth'}>
			<RoomProvider id={roomId}>
				<ClientSideSuspense fallback={fallback}>{children}</ClientSideSuspense>
			</RoomProvider>
		</LiveblocksProvider>
	)
}
