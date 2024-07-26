import { OrganizationSwitcher } from '@clerk/nextjs'
import Image from 'next/image'

import BoardsTypesSwitcher from './BoardsTypeSwitcher'

const OrganizationSidebar = () => {
	return (
		<div className='p-4 bg-secondary min-w-52 lg:flex flex-col shadow-sm h-full gap-8 hidden'>
			<div className='flex items-center gap-4'>
				<Image src={'/logo.svg'} alt='Jiro Logo' width={40} height={40} />
				<h1 className='text-3xl font-bold tracking-wider'>Jiro</h1>
			</div>
			<OrganizationSwitcher
				hidePersonal
				appearance={{
					elements: {
						rootBox: 'w-full shadow-input rounded-md',
						organizationSwitcherTrigger:
							'w-full justify-between py-2 px-4 rounded-md',
						organizationPreviewMainIdentifier: 'text-lg',
						organizationPreviewAvatarBox: 'w-6 h-6',
					},
				}}
			/>
			<BoardsTypesSwitcher />
		</div>
	)
}

export default OrganizationSidebar
