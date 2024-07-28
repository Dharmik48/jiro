'use client'

import BoardsList from '@/components/BoardsLists'
import EmptyState from '@/components/EmptyState'
import NavBar from '@/components/NavBar'
import NewOrgDialog from '@/components/NewOrgDialog'
import OrganizationSidebar from '@/components/OrganizationSidebar'
import Sidebar from '@/components/Sidebar'
import { Button } from '@/components/ui/button'
import { useOrganization } from '@clerk/nextjs'

interface Props {
	searchParams: { [key: string]: string | string[] | undefined }
}

export default function Home({ searchParams }: Props) {
	const { organization } = useOrganization()

	return (
		<main className='h-full'>
			<Sidebar />
			<div className='pl-16 h-full flex'>
				<OrganizationSidebar />
				<div className='w-full'>
					<NavBar />
					<div className='py-4 lg:px-8 px-4 h-[calc(100%-72px)]'>
						{!organization ? (
							<EmptyState
								imageSrc='/elements.svg'
								heading='Welcome to Jiro'
								subheading='Create an organization to get started'
							>
								<NewOrgDialog>
									<Button size={'lg'} className='mt-2'>
										Create Organization
									</Button>
								</NewOrgDialog>
							</EmptyState>
						) : (
							<BoardsList query={searchParams} orgId={organization.id} />
						)}
					</div>
				</div>
			</div>
		</main>
	)
}
