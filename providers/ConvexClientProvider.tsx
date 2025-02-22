'use client'

import { ClerkProvider, useAuth } from '@clerk/nextjs'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { Authenticated, AuthLoading, ConvexReactClient } from 'convex/react'
import { ReactNode } from 'react'
import Loading from '@/components/Loading'
import { dark } from '@clerk/themes'

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export function ConvexClientProvider({ children }: { children: ReactNode }) {
	return (
		<ClerkProvider
			appearance={{
				baseTheme: dark,
			}}
			publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
		>
			<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
				<Authenticated>{children}</Authenticated>
				<AuthLoading>
					<Loading />
				</AuthLoading>
			</ConvexProviderWithClerk>
		</ClerkProvider>
	)
}
