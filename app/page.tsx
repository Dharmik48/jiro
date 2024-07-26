import OrganizationSidebar from '@/components/OrganizationSidebar'
import Sidebar from '@/components/Sidebar'

export default function Home() {
	return (
		<main className='h-full'>
			<Sidebar />
			<div className='pl-16 h-full'>
				<OrganizationSidebar />
			</div>
		</main>
	)
}
