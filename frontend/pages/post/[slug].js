import Layout from '../../components/Layout'
import PostContent from '../../components/PostContent'

import { fetchAPI, getPostsBySlug } from '../../utils/api'
import Custom404 from '../404'

const Post = ({ post, error, ...pageProps }) => {
	const { live } = pageProps.adminSettings.attributes
	if (!error) {
		return (
			<Layout global={pageProps.global} live={live}>
				<PostContent post={post} />
			</Layout>
		)
	}

	return <Custom404 />
}

export async function getStaticPaths(context) {
	const posts = await context.locales.reduce(
		async (currentPostsPromise, locale) => {
			const currentPosts = await currentPostsPromise
			const localePosts = await fetchAPI('/posts', false, {
				locale,
				fields: ['slug', 'locale'],
			})
			return [...currentPosts, ...localePosts.data]
		},
		Promise.resolve([])
	)

	const paths = posts.map((post) => {
		const { slug, locale } = post.attributes

		return {
			params: { slug },
			// Specify the locale to render
			locale,
		}
	})

	return { paths, fallback: true }
}

export async function getStaticProps(context) {
	const { params, locale } = context

	const postData = await getPostsBySlug({
		slug: params.slug,
		locale,
	})

	if (!postData) {
		return { props: { post: null, error: true } }
	}

	return {
		props: { post: postData },
	}
}

export default Post
