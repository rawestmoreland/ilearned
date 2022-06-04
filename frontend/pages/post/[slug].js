import { fetchAPI, getPostsData } from '../../utils/api'

import client from '../../lib/apollo-client'
import gql from 'graphql-tag'

const Post = ({ post }) => {
	console.log(post)
	return <div></div>
}

export async function getStaticPaths(context) {
	const posts = await context.locales.reduce(
		async (currentPostsPromise, locale) => {
			const currentPosts = await currentPostsPromise
			const localePosts = await fetchAPI(
				'/posts',
				{},
				{
					locale,
					fields: ['slug', 'locale'],
				}
			)
			return [...currentPosts, ...localePosts.data]
		},
		Promise.resolve([])
	)

	const paths = posts.map((post) => {
		const { slug, locale } = post.attributes

		// Decompose the slug that was saved in Strapi

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

	const postData = await getPostsData({
		slug: params.slug,
		locale,
	})

	if (postData == null) {
		// Giving the page no props will trigger a 404 page
		return { props: {} }
	}

	return {
		props: { post: postData },
	}
}

export default Post
