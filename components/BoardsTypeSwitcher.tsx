'use client'

import { cn } from '@/lib/utils'
import { LayoutDashboard, Star } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const BoardsTypesSwitcher = () => {
	const searchParams = useSearchParams()
	const favorite = searchParams.get('favorite')

	return (
		<div className='space-y-2'>
			<Link
				href={'/'}
				className={cn(
					'flex items-center gap-2 rounded-md px-2 py-3 hover:bg-muted',
					!favorite && 'bg-muted'
				)}
			>
				<LayoutDashboard size={20} />
				<h4>Team Boards</h4>
			</Link>
			<Link
				href={'/?favorite=true'}
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
