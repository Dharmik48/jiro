import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'

interface Props {
	children: React.ReactNode
	tooltip: string
	side?: 'right' | 'top' | 'bottom' | 'left' | undefined
	sideOffset?: number | undefined
}

const ToolTip = ({ children, tooltip, side, sideOffset }: Props) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent
					side={side}
					sideOffset={sideOffset}
					className='border-border'
				>
					<p>{tooltip}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

export default ToolTip
