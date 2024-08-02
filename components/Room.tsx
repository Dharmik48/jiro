'use client'

import { ReactNode } from 'react'
import {
	LiveblocksProvider,
	RoomProvider,
	ClientSideSuspense,
} from '@liveblocks/react/suspense'
import { LiveList, LiveMap, LiveObject } from '@liveblocks/client'
import { Layer } from '@/types'

interface Props {
	children: ReactNode
	roomId: string
	fallback: ReactNode
}

export function Room({ children, roomId, fallback }: Props) {
	return (
		<LiveblocksProvider authEndpoint={'/api/liveblocks-auth'} throttle={16}>
			<RoomProvider
				id={roomId}
				initialPresence={{ cursor: null, selection: [] }}
				initialStorage={{
					layerIds: new LiveList<string>([]),
					layers: new LiveMap<string, LiveObject<Layer>>(),
				}}
			>
				<ClientSideSuspense fallback={fallback}>{children}</ClientSideSuspense>
			</RoomProvider>
		</LiveblocksProvider>
	)
}
