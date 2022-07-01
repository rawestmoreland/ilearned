import Layout from '../../components/Layout'
import PostContent from '../../components/PostContent'
import Seo from '../../components/Seo'

import { fetchAPI, getPostsBySlug } from '../../utils/api'
import { getLocalizedPaths } from '../../utils/localize'
import Custom404 from '../404'

const Post = ({ posts, error, pageContext, ...pageProps }) => {
	const { live } = pageProps?.adminSettings?.attributes
	const { locale } = pageContext
	const post = posts?.find((post) => post?.attributes.locale === locale)
	const { title, description, image } = post?.attributes || {}
	const seo = {
		metaTitle: title,
		metaDescription: description,
		shareImage: image,
		article: true,
	}
	if (!error && post) {
		return (
			<Layout live={live} pageContext={pageContext}>
				<Seo seo={seo} />
				<PostContent post={post} />
			</Layout>
		)
	}

	return (
		<Custom404
			live={live}
			pageContext={pageContext}
			noTranslation={!post}
		/>
	)
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
		locale: 'all',
	})

	const pageContext = {
		pageName: 'post',
		locale,
		locales,
		defaultLocale,
		slug: params.slug,
	}

	const localizedPaths = getLocalizedPaths(pageContext)

	if (!postData.data.posts.data.length || postData.errors) {
		return {
			props: {
				post: null,
				error: true,
				pageContext: { ...pageContext, localizedPaths },
			},
		}
	}

	return {
		props: {
			posts: [
				postData.data.posts.data[0],
				...postData.data.posts.data[0].attributes.localizations.data,
			],
			pageContext: { ...pageContext, localizedPaths },
		},
	}
}

export default Post
