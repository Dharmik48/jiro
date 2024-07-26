import Image from 'next/image'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import { Input } from './ui/input'
import { Search } from 'lucide-react'

const NavBar = () => {
	return (
		<nav className='flex py-4 lg:px-8 px-4 gap-4 items-center justify-between w-full self-start'>
			<div className='relative w-full max-w-lg hidden lg:block'>
				<Search className='absolute left-2 top-1/2 -translate-y-1/2 text-muted h-4 w-4' />
				<Input placeholder='Search' className='pl-8' />
			</div>
			<OrganizationSwitcher
				hidePersonal
				appearance={{
					elements: {
						rootBox: 'w-full shadow-input rounded-md lg:hidden max-w-lg h-10',
						organizationSwitcherTrigger:
							'w-full justify-between py-2 px-3 rounded-md',
						organizationPreviewMainIdentifier: 'text-base',
						organizationPreviewAvatarBox: 'w-5 h-5',
					},
				}}
			/>
			<UserButton />
		</nav>
	)
}

export default NavBar
