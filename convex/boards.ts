import { v } from 'convex/values'
import { mutation } from './_generated/server'

const images = [
	'/placeholders/1.svg',
	'/placeholders/2.svg',
	'/placeholders/3.svg',
	'/placeholders/4.svg',
	'/placeholders/5.svg',
	'/placeholders/6.svg',
	'/placeholders/7.svg',
	'/placeholders/8.svg',
	'/placeholders/9.svg',
	'/placeholders/10.svg',
]

export const create = mutation({
	args: {
		title: v.string(),
		orgId: v.string(),
	},
	handler: async (ctx, args) => {
		console.log('board')
		const user = await ctx.auth.getUserIdentity()

		if (!user) throw new Error('Unauthorized')

		const randomImg = images[Math.floor(Math.random() * images.length)]

		const board = await ctx.db.insert('boards', {
			title: args.title,
			orgId: args.orgId,
			authorId: user.subject,
			authorName: user.name!,
			imageUrl: randomImg,
		})

		return board
	},
})
