import type { Metadata } from 'next'
import { Oxygen } from 'next/font/google'
import './globals.css'
import { ConvexClientProvider } from '@/providers/ConvexClientProvider'
import { ThemeProvider } from '@/providers/theme-provider'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/sonner'

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
		<html lang='en' className='h-full' style={{ colorScheme: 'dark' }}>
			<body
				className={cn(oxygen.className, 'bg-background text-foreground h-full')}
			>
				<ThemeProvider attribute='class' defaultTheme='system'>
					<ConvexClientProvider>
						{children}
						<Toaster />
					</ConvexClientProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
