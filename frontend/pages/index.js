import Layout from '../components/Layout'
import PostGrid from '../components/PostGrid'

import { fetchAPI } from '../utils/api'

export default function Home({ posts }) {
	return (
		<Layout>
			<PostGrid posts={posts} />
		</Layout>
	)
}

export async function getServerSideProps(ctx) {
	// Run API calls in parallel
	console.log(ctx.locale)
	const [postsRes] = await Promise.all([
		fetchAPI('/posts', {}, { locale: ctx.locale, populate: '*' }),
	])

	return {
		props: {
			posts: postsRes.data,
		},
	}
}
