import { useState, useEffect, useContext } from 'react'

import { useRouter } from 'next/router'

import Loading from './Loading'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children, ...props }) => {
	const { navbar, footer } = props.global.attributes
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
		<div>
			<div className='realtive min-h-screen'>
				<Navbar navbar={navbar} pageContext={props.pageContext} />
				<Loading loading={loading} />
				<div className={`${loading ? 'hidden' : 'container pt-16'}`}>
					{children}
				</div>
			</div>
			<div
				className={`${
					props.live ? 'relative' : 'fixed'
				} bottom-0 w-full`}
			>
				<Footer footer={footer} />
			</div>
		</div>
	)
}

export default Layout
