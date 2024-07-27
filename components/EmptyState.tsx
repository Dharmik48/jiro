import Image from 'next/image'

interface Props {
	imageSrc: string
	heading: string
	subheading: string
	children?: React.ReactNode
}

const EmptyState = ({ imageSrc, heading, subheading, children }: Props) => {
	return (
		<div className='h-full flex flex-col items-center justify-center gap-2'>
			<Image
				src={imageSrc}
				width={200}
				height={200}
				alt='elements'
				className='h-48 w-auto'
			/>
			<h2 className='font-bold text-2xl'>{heading}</h2>
			<p className='text-muted-foreground'>{subheading}</p>
			{children}
		</div>
	)
}

export default EmptyState
