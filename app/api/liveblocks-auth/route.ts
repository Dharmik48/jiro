import { api } from '@/convex/_generated/api'
import { currentUser, auth } from '@clerk/nextjs/server'
import { Liveblocks } from '@liveblocks/node'
import { ConvexHttpClient } from 'convex/browser'

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

const liveblocks = new Liveblocks({
	secret: process.env.LIVEBLOCKS_PRIVATE_KEY!,
})

export async function POST(request: Request) {
	// Get the current user from your database
	const a = auth()
	const user = await currentUser()
	if (!user) return new Response('Unauthorized', { status: 403 })

	const { room } = await request.json()
	const board = await convex.query(api.boards.getSingle, { id: room })

	if (board?.orgId !== a.orgId)
		return new Response('Unauthorized', { status: 403 })

	// Start an auth session inside your endpoint
	const session = liveblocks.prepareSession(user.id, {
		userInfo: {
			name: user.username || `${user.firstName} ${user.lastName}`,
			avatar: user.imageUrl,
		},
	})

	session.allow(room, session.FULL_ACCESS)

	// Authorize the user and return the result
	const { status, body } = await session.authorize()
	return new Response(body, { status })
}
