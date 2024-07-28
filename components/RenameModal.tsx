'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

interface Props {
	children: React.ReactNode
	title: string
	description: string
	onConfirm: (value: string) => void
	disabled: boolean
	oldTitle: string
}

const RenameModal = ({
	children,
	title,
	description,
	onConfirm,
	disabled,
	oldTitle,
}: Props) => {
	const [value, setValue] = useState(oldTitle)
	const [open, setOpen] = useState(false)

	const handleClick = () => {
		onConfirm(value)
		setOpen(false)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className='sm:max-w-[425px] border-border'>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<div className='py-4'>
					<Input
						id='title'
						value={value}
						maxLength={60}
						onChange={e => setValue(e.target.value)}
						className='w-full'
					/>
				</div>
				<DialogFooter>
					<Button type='submit' onClick={handleClick} disabled={disabled}>
						Save changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default RenameModal
