import type { Metadata } from 'next'
import { Oxygen } from 'next/font/google'
import './globals.css'
import { ClerkProvider, useAuth } from '@clerk/nextjs'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { ConvexReactClient } from 'convex/react'

const oxygen = Oxygen({ weight: ['400', '700'], subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Jiro',
	description:
		'Discover Jiro, the ultimate platform for collaborative teamwork and task planning. Create interactive boards to streamline projects, share ideas in real-time, and achieve seamless productivity. Start collaborating effortlessly with Jiro today!',
}

const convex = new ConvexReactClient(process.env.CONVEX_DEPLOYMENT as string)

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={oxygen.className}>
				<ClerkProvider
					publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
				>
					<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
						{children}
					</ConvexProviderWithClerk>
				</ClerkProvider>
			</body>
		</html>
	)
}
