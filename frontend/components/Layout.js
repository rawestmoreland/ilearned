import { useState, useEffect, useContext } from 'react'

import { useRouter } from 'next/router'

import Loading from './Loading'
import Navbar from './Navbar'

import { GlobalContext } from '../pages/_app'

const Layout = ({ children, ...props }) => {
	const { navbar } = useContext(GlobalContext)
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
		<div className='min-h-screen bg-main-background bg-cover bg-center bg-fixed bg-no-repeat'>
			<Navbar navbar={navbar} />
			<Loading loading={loading} />
			<div
				className={`${
					loading ? 'hidden' : 'w-10/12 h-screen m-auto pt-16'
				}`}
			>
				{children}
			</div>
		</div>
	)
}

export default Layout
