import { Skeleton } from '@/components/ui/skeleton'
import ToolButton from './ToolButton'
import {
	Circle,
	MousePointer2,
	Pencil,
	Redo,
	Square,
	StickyNote,
	Type,
	Undo,
} from 'lucide-react'

const Toolbar = () => {
	return (
		<div className='absolute top-1/2 left-4 -translate-y-1/2 space-y-4'>
			<div className='rounded-lg border p-2 bg-secondary gap-2 text-secondary-foreground border-border shadow-sm max-w-sm flex flex-col'>
				<ToolButton
					icon={MousePointer2}
					label='Select'
					onClick={() => {}}
					isActive={true}
				/>
				<ToolButton
					icon={Type}
					label='Type'
					onClick={() => {}}
					isActive={false}
				/>
				<ToolButton
					icon={StickyNote}
					label='Sticky Note'
					onClick={() => {}}
					isActive={false}
				/>
				<ToolButton
					icon={Square}
					label='Square'
					onClick={() => {}}
					isActive={false}
				/>
				<ToolButton
					icon={Circle}
					label='Circle'
					onClick={() => {}}
					isActive={false}
				/>
				<ToolButton
					icon={Pencil}
					label='Pencil'
					onClick={() => {}}
					isActive={false}
				/>
			</div>
			<div className='rounded-lg border p-2 bg-secondary text-secondary-foreground border-border shadow-sm max-w-sm flex flex-col gap-2'>
				<ToolButton
					icon={Undo}
					label='Undo'
					onClick={() => {}}
					isDisabled={true}
				/>
				<ToolButton
					icon={Redo}
					label='Redo'
					onClick={() => {}}
					isDisabled={true}
				/>
			</div>
		</div>
	)
}

Toolbar.Skeleton = function ToolbarSkeleton() {
	return (
		<div className='absolute top-1/2 left-4 -translate-y-1/2 space-y-4'>
			<div className='rounded-lg border p-4 bg-secondary text-secondary-foreground border-border shadow-sm w-28 h-28'>
				<Skeleton />
			</div>
			<div className='rounded-lg border p-4 bg-secondary text-secondary-foreground border-border shadow-sm w-28 h-16'>
				<Skeleton />
			</div>
		</div>
	)
}

export default Toolbar
