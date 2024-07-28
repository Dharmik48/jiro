'use client'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Link, MoreHorizontal, Pen, Trash } from 'lucide-react'
import { toast } from 'sonner'
import ConfirmationModal from './ConfirmationModal'
import { useApiMutations } from '@/hooks/use-api-mutations'
import { api } from '@/convex/_generated/api'
import { Button } from './ui/button'
import RenameModal from './RenameModal'
import { useState } from 'react'

const BoardActions = ({ id, title }: { id: string; title: string }) => {
	const { mutate: mutateRemove, pending: pendingRemove } = useApiMutations(
		api.boards.remove
	)
	const { mutate: mutateRename, pending: pendingRename } = useApiMutations(
		api.boards.rename
	)
	const [open, setOpen] = useState(false)

	const copyLink = () => {
		navigator.clipboard
			.writeText(`${window.location.origin}/board/${id}`)
			.then(() => toast.success('Link copied!'))
			.catch(() => toast.error('Failed to copy link'))
			.finally(() => setOpen(false))
	}

	const remove = async () => {
		try {
			await mutateRemove({ orgId: id })
			toast.success('Deleted Successfully')
		} catch (error) {
			toast.error('Something went wrong.')
		} finally {
			setOpen(false)
		}
	}

	const rename = async (value: string) => {
		try {
			await mutateRename({ orgId: id, title: value })
			toast.success('Successfully renamed')
		} catch (error) {
			toast.error('Failed to rename')
		} finally {
			setOpen(false)
		}
	}

	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger asChild>
				<button className='absolute z-[5] right-4 top-2 opacity-0 group-hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm'>
					<MoreHorizontal />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				onClick={e => e.stopPropagation()}
				side='right'
				className='border-border w-60 peer'
			>
				<DropdownMenuItem
					className='space-x-3 p-3 cursor-pointer'
					onClick={copyLink}
				>
					<Link size={16} /> <span>Copy Link</span>
				</DropdownMenuItem>
				<RenameModal
					title='Rename Board'
					description='Enter the new title for the board.'
					onConfirm={rename}
					oldTitle={title}
					disabled={pendingRename}
				>
					<Button className='p-3 w-full justify-start gap-3' variant={'ghost'}>
						<Pen size={16} />
						<span>Rename</span>
					</Button>
				</RenameModal>
				<ConfirmationModal
					title='Delete board?'
					description='This cannot be undone. This board will be deleted forever.'
					onConfirm={remove}
					disabled={pendingRemove}
				>
					<Button className='p-3 w-full justify-start gap-3' variant={'ghost'}>
						<Trash size={16} />
						<span>Delete</span>
					</Button>
				</ConfirmationModal>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default BoardActions
