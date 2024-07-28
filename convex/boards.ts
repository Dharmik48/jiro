import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

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

export const get = query({
	args: {
		orgId: v.string(),
		search: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const user = await ctx.auth.getUserIdentity()
		if (!user) throw new Error('Unauthorized')

		const userId = user.subject
		const search = args.search as string
		let boards = []

		if (search) {
			boards = await ctx.db
				.query('boards')
				.withSearchIndex('search_title', q =>
					q.search('title', search).eq('orgId', args.orgId)
				)
				.collect()
		} else {
			boards = await ctx.db
				.query('boards')
				.withIndex('by_org', q => q.eq('orgId', args.orgId))
				.order('desc')
				.collect()
		}

		const boardsWithFavorites = boards.map(board => {
			return ctx.db
				.query('userFavorites')
				.withIndex('by_user_board', q =>
					q.eq('userId', userId).eq('boardId', board._id)
				)
				.unique()
				.then(favorite => ({ ...board, isFavorite: !!favorite }))
		})

		const data = Promise.all(boardsWithFavorites)
		return data
	},
})

export const remove = mutation({
	args: {
		id: v.id('boards'),
	},
	handler: async (ctx, args) => {
		const user = await ctx.auth.getUserIdentity()
		if (!user) throw new Error('Unauthorized')

		const userId = user.subject

		const existingFavorite = await ctx.db
			.query('userFavorites')
			.withIndex('by_user_board', q =>
				q.eq('userId', userId).eq('boardId', args.id)
			)
			.unique()

		if (existingFavorite) await ctx.db.delete(existingFavorite._id)

		await ctx.db.delete(args.id)

		return true
	},
})

export const rename = mutation({
	args: {
		orgId: v.id('boards'),
		title: v.string(),
	},
	handler: async (ctx, args) => {
		const user = await ctx.auth.getUserIdentity()
		if (!user) throw new Error('Unauthorized')

		const title = args.title.trim()
		if (!title) throw new Error('Title is required')

		if (title.length > 60)
			throw new Error('Title length cannot be more than 60')

		const board = await ctx.db.patch(args.orgId, {
			title,
		})

		return board
	},
})

export const favorite = mutation({
	args: {
		id: v.id('boards'),
	},
	handler: async (ctx, args) => {
		const user = await ctx.auth.getUserIdentity()
		if (!user) throw new Error('Unauthorized')

		const userId = user.subject

		const board = await ctx.db.get(args.id)
		if (!board) throw new Error('Board not found')

		const existing = await ctx.db
			.query('userFavorites')
			.withIndex('by_user_board_org', q =>
				q.eq('userId', userId).eq('boardId', args.id).eq('orgId', board.orgId)
			)
			.unique()

		if (existing) throw new Error('Board already favorited!')

		await ctx.db.insert('userFavorites', {
			userId,
			boardId: args.id,
			orgId: board.orgId,
		})

		return board
	},
})

export const unfavorite = mutation({
	args: {
		id: v.id('boards'),
	},
	handler: async (ctx, args) => {
		const user = await ctx.auth.getUserIdentity()
		if (!user) throw new Error('Unauthorized')

		const userId = user.subject

		const board = await ctx.db.get(args.id)
		if (!board) throw new Error('Board not found')

		const existing = await ctx.db
			.query('userFavorites')
			.withIndex('by_user_board', q =>
				q.eq('userId', userId).eq('boardId', args.id)
			)
			.unique()

		if (!existing) throw new Error('Favorited board not found!')

		await ctx.db.delete(existing._id)

		return board
	},
})
