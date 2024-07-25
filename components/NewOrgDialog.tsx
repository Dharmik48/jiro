'use client'

import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Plus, X } from 'lucide-react'
import { CreateOrganization } from '@clerk/clerk-react'

const NewOrgDialog = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='ghost' className='aspect-square'>
					<Plus />
				</Button>
			</DialogTrigger>
			<DialogContent className='p-0 border-none'>
				<DialogTitle className='sr-only'>Create Organization</DialogTitle>

				<CreateOrganization
					appearance={{
						elements: {
							formButtonPrimary:
								'bg-primary text-primary-foreground hover:bg-primary/90 !shadow-sm shadow-primary',
							card: 'bg-transparent !w-full',
							cardBox: 'shadow-none w-full',
							rootBox: 'w-full',
						},
					}}
				/>
			</DialogContent>
		</Dialog>
	)
}

export default NewOrgDialog
