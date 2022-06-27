import Layout from '../components/Layout'

const Custom404 = ({ live, pageContext }) => {
	return (
		<Layout live={live} pageContext={pageContext}>
			<div className='container flex h-screen w-screen items-center justify-center text-off-white text-xl font-big-rubik font-bold tracking-wider'>
				<h1>😢 Sorry, we couldn&apos;t find that page 😢</h1>
			</div>
		</Layout>
	)
}

export default Custom404
