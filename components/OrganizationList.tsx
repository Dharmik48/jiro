'use client'

import { useOrganizationList } from '@clerk/nextjs'
import Image from 'next/image'
import OrganizationListItem from './OrganizationListItem'

const OrganizationList = () => {
	const { userMemberships } = useOrganizationList({
		userMemberships: { infinite: true },
	})

	if (userMemberships.data?.length === 0) return null

	return (
		<ul className='space-y-2'>
			{userMemberships.data?.map(({ organization }) => (
				<OrganizationListItem
					key={organization.id}
					image={organization.imageUrl}
					name={organization.name}
					id={organization.id}
				/>
			))}
		</ul>
	)
}

export default OrganizationList
