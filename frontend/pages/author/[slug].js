import { useEffect, useState } from 'react'

import InfininiteScroll from 'react-infinite-scroll-component'

import { fetchAPI, getPostsByAuthor } from '../../utils/api'
import Layout from '../../components/Layout'
import PostGrid from '../../components/PostGrid'

import { getLocalizedPaths } from '../../utils/localize'

const Author = ({ posts, author, meta, locale, pageContext, ...pageProps }) => {
	const { live } = pageProps.adminSettings.attributes
	const { name, slug } = author.attributes
	const [postsMeta, setPostsMeta] = useState(meta)
	const [postsData, setPostsData] = useState(posts)
	// const seo = {
	// 	metaTitle: author.attributes.name,
	// 	metaDescription: `All ${author.attributes.name} posts`,
	// }

	async function getMorePosts() {
		const postsRes = await getPostsByAuthor({
			slug,
			locale,
			page: postsMeta.page + 1,
		})

		setPostsData([...postsData, ...postsRes.data.posts.data])
		setPostsMeta(postsRes.data.posts.meta.pagination)
	}

	useEffect(() => {
		setPostsData(posts)
		setPostsMeta(meta)
	}, [posts])

	return (
		<Layout live={live} pageContext={pageContext}>
			{/* <Seo seo={seo} /> */}
			<div>
				<div>
					<div className='mt-4 md:mt-8'>
						<span className='text-terracotta font-big-shoulders tracking-widest font-extrabold'>
							ARTICLES WRITTEN BY
						</span>
						<h1 className='text-off-white font-rubik text-5xl'>
							{name.toUpperCase()}
						</h1>
					</div>
					<InfininiteScroll
						dataLength={postsData.length}
						next={getMorePosts}
						loader={<h4>Loading...</h4>}
						hasMore={postsMeta.pageCount > postsMeta.page}
					>
						<PostGrid posts={postsData} marginTop={4} />
					</InfininiteScroll>
				</div>
			</div>
		</Layout>
	)
}

export async function getStaticPaths(context) {
	const authors = await context.locales.reduce(
		async (currentAuthorsPromise, locale) => {
			const currentAuthors = await currentAuthorsPromise
			const authorNames = await fetchAPI('/authors', false, {
				fields: ['slug'],
			})

			/**
			 * authors aren't localized, but we want paths to
			 * all authors for each locale route.
			 */
			authorNames.data.forEach((name) => (name.locale = locale))

			return [...currentAuthors, ...authorNames.data]
		},
		Promise.resolve([])
	)

	const paths = authors.map((author) => {
		const { slug } = author.attributes
		const { locale } = author

		return {
			params: { slug },
			locale,
		}
	})

	return {
		paths,
		fallback: false,
	}
}

export async function getStaticProps(context) {
	const { params, locale, locales, defaultLocale } = context
	const matchingPosts = await getPostsByAuthor({
		slug: params.slug,
		locale,
		page: 1,
	})

	const pageContext = {
		pageName: 'author',
		locale,
		locales,
		defaultLocale,
		slug: params.slug,
	}

	const localizedPaths = getLocalizedPaths(pageContext)

	return {
		props: {
			posts: matchingPosts.data.posts.data,
			author: matchingPosts.data.authors.data[0],
			meta: matchingPosts.data.posts.meta.pagination,
			pageContext: {
				...pageContext,
				localizedPaths,
			},
		},
	}
}

export default Author
