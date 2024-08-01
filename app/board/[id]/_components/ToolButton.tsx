import ToolTip from '@/components/ToolTip'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface Props {
	isActive?: boolean
	icon: LucideIcon
	onClick: () => void
	label: string
	isDisabled?: boolean
}

const ToolButton = ({
	icon: Icon,
	label,
	onClick,
	isActive,
	isDisabled,
}: Props) => {
	return (
		<ToolTip tooltip={label} side='right' sideOffset={10}>
			<Button
				className={cn(
					'h-auto aspect-square p-2 disabled:cursor-not-allowed',
					isActive && 'bg-primary hover:bg-primary'
				)}
				variant={'ghost'}
				disabled={!!isDisabled}
				onClick={onClick}
			>
				{<Icon />}
			</Button>
		</ToolTip>
	)
}

export default ToolButton
