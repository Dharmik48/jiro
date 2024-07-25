import NewOrgDialog from './NewOrgDialog'

const Sidebar = () => {
	return (
		<aside className='bg-primary h-full w-16 flex flex-col items-center p-2 fixed left-0 z-10'>
			<NewOrgDialog />
		</aside>
	)
}

export default Sidebar
