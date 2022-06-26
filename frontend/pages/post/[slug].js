import Layout from '../../components/Layout'
import PostContent from '../../components/PostContent'

import { fetchAPI, getPostsBySlug } from '../../utils/api'
import { getLocalizedPaths } from '../../utils/localize'
import Custom404 from '../404'

const Post = ({ post, error, pageContext, ...pageProps }) => {
	const { live } = pageProps.adminSettings.attributes
	if (!error) {
		return (
			<Layout live={live} pageContext={pageContext}>
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
	const { params, locale, locales, defaultLocale } = context

	const postData = await getPostsBySlug({
		slug: params.slug,
		locale,
	})

	if (!postData) {
		return { props: { post: null, error: true } }
	}

	const pageContext = {
		pageName: 'post',
		locale,
		locales,
		defaultLocale,
		slug: params.slug,
	}

	const localizedPaths = getLocalizedPaths(pageContext)

	return {
		props: {
			post: postData,
			pageContext: { ...pageContext, localizedPaths },
		},
	}
}

export default Post
