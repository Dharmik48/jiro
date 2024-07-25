import type { Metadata } from 'next'
import { Oxygen } from 'next/font/google'
import './globals.css'
import { ConvexClientProvider } from '@/providers/ConvexClientProvider'
import { cn } from '@/lib/utils'

const oxygen = Oxygen({ weight: ['400', '700'], subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Jiro',
	description:
		'Discover Jiro, the ultimate platform for collaborative teamwork and task planning. Create interactive boards to streamline projects, share ideas in real-time, and achieve seamless productivity. Start collaborating effortlessly with Jiro today!',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={cn(
					oxygen.className,
					'min-h-screen bg-background text-white'
				)}
			>
				<ConvexClientProvider>{children}</ConvexClientProvider>
			</body>
		</html>
	)
}
