import { useState, useEffect, useContext } from 'react'

import { useRouter } from 'next/router'

import Loading from './Loading'
import Navbar from './Navbar'
import Footer from './Footer'

import { GlobalContext } from '../pages/_app'

const Layout = ({ children, ...props }) => {
	const { navbar, footer } = useContext(GlobalContext)
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
		<div className='grid min-h-screen'>
			<div>
				<Navbar navbar={navbar} />
				<Loading loading={loading} />
				<div className={`${loading ? 'hidden' : 'container pt-16'}`}>
					{children}
				</div>
			</div>
			<Footer footer={footer} />
		</div>
	)
}

export default Layout
