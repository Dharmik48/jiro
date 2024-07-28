'use client'

import {
	OrganizationProfile,
	OrganizationSwitcher,
	useOrganization,
	UserButton,
} from '@clerk/nextjs'
import { Input } from './ui/input'
import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'
import queryString from 'query-string'
import OrganizationInvite from './OrganizationInvite'

const NavBar = () => {
	const router = useRouter()
	const [value, setValue] = useState('')
	const [debouncedValue] = useDebounceValue(value, 500)
	const { organization, membership } = useOrganization()
	const searchParams = useSearchParams()

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value)
	}

	useEffect(() => {
		const url = queryString.stringifyUrl(
			{
				url: '/',
				query: {
					search: debouncedValue,
					favorite: searchParams?.get('favorite'),
				},
			},
			{ skipEmptyString: true, skipNull: true }
		)

		router.push(url)
	}, [debouncedValue, router])

	return (
		<nav className='flex py-4 lg:px-8 px-4 gap-4 items-center justify-between w-full self-start'>
			<div className='relative w-full max-w-lg hidden lg:block'>
				<Search className='absolute left-2 top-1/2 -translate-y-1/2 text-muted h-4 w-4' />
				<Input placeholder='Search' className='pl-8' onChange={handleChange} />
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
			<div className='space-x-8'>
				{!!organization && membership?.role !== 'org:member' && (
					<div className='hidden xl:inline-block'>
						<OrganizationInvite />
					</div>
				)}
				<UserButton />
			</div>
		</nav>
	)
}

export default NavBar
