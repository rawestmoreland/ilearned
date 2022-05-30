import { useState, useEffect } from 'react'

import { useRouter } from 'next/router'

import Loading from './Loading'

const Layout = ({ children, ...props }) => {
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	useEffect(() => {
		const handleStart = () => setLoading(true)

		const handleComplete = () => setLoading(false)

		router.events.on('routeChangeStart', handleStart)
		router.events.on('routeChangeComplete', handleComplete)
		router.events.on('routeChangeError', handleComplete)
		return function cleanup() {
			handleComplete
		}
	}, [router])

	return (
		<>
			<Loading loading={loading} />
			<div
				className={`${
					loading
						? 'hidden'
						: 'container flex flex-col gap-y-4 md:grid md:grid-cols-4 md:gap-x-8 font-poppins py-12'
				}`}
			>
				<div className='md:col-span-3'>{children}</div>
			</div>
		</>
	)
}

export default Layout
