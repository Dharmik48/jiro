import Image from 'next/image'

const Loading = () => {
	return (
		<div className='flex gap-4 items-center justify-center h-dvh'>
			<Image
				src={'/logo.svg'}
				width={75}
				height={75}
				alt='Logo'
				className='animate-pulse'
			/>
		</div>
	)
}

export default Loading
