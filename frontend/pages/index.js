import Layout from '../components/Layout'
import PostGrid from '../components/PostGrid'

import { fetchAPI } from '../utils/api'

export default function Home({ posts, adminSettings, categories }) {
	console.log(process.env.ADMIN_API_TOKEN)
	const { live } = adminSettings.attributes
	return (
		<Layout>
			{live || process.env.NODE_ENV === 'development' ? (
				<PostGrid posts={posts} />
			) : (
				<div className='absolute top-1/2 left-1/2 -translate-x-1/2'>
					<h1 className='font-big-shoulders text-4xl tracking-widest text-off-white'>
						🧠 Coming Soon 🧠
					</h1>
				</div>
			)}
		</Layout>
	)
}

export async function getServerSideProps(ctx) {
	// Run API calls in parallel
	const [postsRes, categoriesRes, adminSettingsRes] = await Promise.all([
		fetchAPI('/posts', false, {
			locale: ctx.locale,
			sort: 'published:desc',
			populate: {
				authors: { populate: ['picture'] },
				image: '*',
				categories: '*',
			},
		}),
		fetchAPI('/categories'),
		fetchAPI('/admin-setting', true),
	])

	return {
		props: {
			posts: postsRes,
			adminSettings: adminSettingsRes,
			categories: categoriesRes,
		},
	}
}
