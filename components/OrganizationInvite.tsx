import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { OrganizationProfile } from '@clerk/nextjs'
import { Plus } from 'lucide-react'

const OrganizationInvite = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={'secondary'}>
					<Plus size={24} />
					Invite Members
				</Button>
			</DialogTrigger>
			<DialogContent className='p-0 border-none max-w-max'>
				<DialogTitle className='sr-only'>Invite Members</DialogTitle>

				<OrganizationProfile routing='hash' />
			</DialogContent>
		</Dialog>
	)
}

export default OrganizationInvite
