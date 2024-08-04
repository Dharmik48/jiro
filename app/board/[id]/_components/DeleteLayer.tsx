import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

interface Props {
	onClick: () => void
}

const DeleteLayer = ({ onClick }: Props) => {
	return (
		<div className=''>
			<Button
				className='h-9 w-9 p-1.5 hover:bg-red-500'
				variant={'ghost'}
				onClick={onClick}
			>
				<Trash2 className='h-full w-full' />
			</Button>
		</div>
	)
}

export default DeleteLayer
