import NewOrgDialog from './NewOrgDialog'
import OrganizationList from './OrganizationList'

import { Button } from '@/components/ui/button'
import { Plus, X } from 'lucide-react'

const Sidebar = () => {
	return (
		<aside className='bg-primary h-full w-16 flex flex-col items-center p-2 py-4 fixed left-0 z-10 space-y-2'>
			<OrganizationList />
			<NewOrgDialog>
				<Button variant='ghost' className='aspect-square w-fit p-0'>
					<Plus size={24} />
				</Button>
			</NewOrgDialog>
		</aside>
	)
}

export default Sidebar
