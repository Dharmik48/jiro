import { Skeleton } from '@/components/ui/skeleton'

const Toolbar = () => {
	return (
		<div className='absolute top-1/2 left-4 -translate-y-1/2 space-y-4'>
			<div className='rounded-lg border p-4 bg-secondary text-secondary-foreground border-border shadow-sm max-w-sm'>
				<div>Pencil</div>
				<div>Square</div>
				<div>Circle</div>
				<div>Ellipsis</div>
			</div>
			<div className='rounded-lg border p-4 bg-secondary text-secondary-foreground border-border shadow-sm max-w-sm'>
				<div>Undo</div>
				<div>Redo</div>
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
