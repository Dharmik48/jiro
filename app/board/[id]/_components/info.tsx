import { Skeleton } from '@/components/ui/skeleton'

const Info = () => {
	return (
		<div className='absolute top-4 left-4 rounded-lg border p-4 bg-secondary text-secondary-foreground border-border shadow-sm max-w-sm'>
			Information about board
		</div>
	)
}

Info.Skeleton = function InfoSkeleton() {
	return (
		<div className='absolute top-4 left-4 rounded-lg border p-4 bg-secondary text-secondary-foreground border-border shadow-sm w-52 h-14'>
			<Skeleton />
		</div>
	)
}

export default Info
