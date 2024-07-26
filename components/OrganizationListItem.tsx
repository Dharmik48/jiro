import { cn } from '@/lib/utils'
import { useOrganization, useOrganizationList } from '@clerk/nextjs'
import Image from 'next/image'

interface Props {
	image: string
	name: string
	id: string
}

const OrganizationListItem = ({ image, name, id }: Props) => {
	const { organization } = useOrganization()
	const { setActive } = useOrganizationList()

	const isActive = organization?.id === id

	function handleClick(
		event: React.MouseEvent<HTMLLIElement, MouseEvent>
	): void {
		if (!setActive) return

		setActive({ organization: id })
	}

	return (
		<li onClick={handleClick} className='h-10 relative aspect-square'>
			<Image
				className={cn(
					'cursor-pointer rounded-md hover:opacity-100 opacity-75 transition-opacity w-full aspect-square',
					isActive && 'opacity-100'
				)}
				src={image}
				fill
				alt={name}
			/>
		</li>
	)
}

export default OrganizationListItem
