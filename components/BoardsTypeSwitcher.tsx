'use client'

import { cn } from '@/lib/utils'
import { LayoutDashboard, Star } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import queryString from 'query-string'

const BoardsTypesSwitcher = () => {
	const searchParams = useSearchParams()
	const favorite = searchParams.get('favorite')
	const search = searchParams.get('search')

	const url = queryString.stringifyUrl(
		{
			url: '/',
			query: {
				search,
			},
		},
		{ skipEmptyString: true, skipNull: true }
	)

	const favoriteUrl = queryString.stringifyUrl(
		{
			url: '/',
			query: {
				search,
				favorite: true,
			},
		},
		{ skipEmptyString: true, skipNull: true }
	)

	return (
		<div className='space-y-2'>
			<Link
				href={url}
				className={cn(
					'flex items-center gap-2 rounded-md px-2 py-3 hover:bg-muted',
					!favorite && 'bg-muted'
				)}
			>
				<LayoutDashboard size={20} />
				<h4>Team Boards</h4>
			</Link>
			<Link
				href={favoriteUrl}
				className={cn(
					'flex items-center gap-2 rounded-md px-2 py-3 hover:bg-muted',
					favorite && 'bg-muted'
				)}
			>
				<Star size={20} />
				<h4>Favorite Boards</h4>
			</Link>
		</div>
	)
}

export default BoardsTypesSwitcher
