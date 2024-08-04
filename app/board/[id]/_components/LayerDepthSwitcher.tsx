import { Button } from '@/components/ui/button'
import { BringToFront, SendToBack } from 'lucide-react'

interface Props {
	bringToFront: () => void
	sendToBack: () => void
}

const LayerDepthSwitcher = ({ bringToFront, sendToBack }: Props) => {
	return (
		<div className='flex flex-col gap-2 border-r border-r-secondary-foreground pr-3 mr-3'>
			<Button
				className='h-10 w-10 p-2 text-secondary-foreground rounded-md hover:bg-card transition-colors'
				variant={'ghost'}
				onClick={bringToFront}
				title='Bring To Front'
			>
				<BringToFront className='' />
			</Button>

			<Button
				className='h-10 w-10 p-2 text-secondary-foreground rounded-md hover:bg-card transition-colors'
				variant={'ghost'}
				onClick={sendToBack}
				title='Send To Back'
			>
				<SendToBack />
			</Button>
		</div>
	)
}

export default LayerDepthSwitcher
