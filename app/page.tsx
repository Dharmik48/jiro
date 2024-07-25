import Sidebar from '@/components/Sidebar'
import { UserButton } from '@clerk/nextjs'

export default function Home() {
	return (
		<main className='h-full'>
			<Sidebar />
			<div className='pl-16'>
				<UserButton />
			</div>
		</main>
	)
}
