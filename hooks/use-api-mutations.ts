import { useMutation } from 'convex/react'
import { FunctionReference } from 'convex/server'
import { useState } from 'react'

export const useApiMutations = (mutation: FunctionReference<'mutation'>) => {
	const [pending, setPending] = useState(false)
	const apiMutation = useMutation(mutation)

	const mutate = async (payload: any) => {
		setPending(true)
		try {
			const res = await apiMutation(payload)
			return res
		} catch (error) {
			throw error
		} finally {
			setPending(false)
		}
	}

	return { pending, mutate }
}
