import NewOrgDialog from './NewOrgDialog'
import OrganizationList from './OrganizationList'

const Sidebar = () => {
	return (
		<aside className='bg-primary h-full w-16 flex flex-col items-center p-2 py-4 fixed left-0 z-10 space-y-2'>
			<OrganizationList />
			<NewOrgDialog />
		</aside>
	)
}

export default Sidebar
