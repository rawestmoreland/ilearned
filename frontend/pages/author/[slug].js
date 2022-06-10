import { useState } from 'react'

import InfininiteScroll from 'react-infinite-scroll-component'

import { fetchAPI, getAuthorsByName } from '../../utils/api'
import Layout from '../../components/Layout'
import PostGrid from '../../components/PostGrid'

const Author = ({ author, meta }) => {
	const { name, posts } = author.attributes
	const [postsMeta, setPostsMeta] = useState(meta)
	const [postsData, setPostsData] = useState(posts.data)
	// const seo = {
	// 	metaTitle: author.attributes.name,
	// 	metaDescription: `All ${author.attributes.name} posts`,
	// }

	async function getMorePosts() {
		const postsRes = await getAuthorsByName({
			slug: slug,
			page: postsMeta.page + 1,
		})

		setPostsData([
			...allPosts,
			...postsRes.data.authors.data[0].attributes.posts.data,
		])
		setPostsMeta(postsRes.data.authors.meta.pagination)
	}

	return (
		<Layout>
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
						<PostGrid posts={postsData} marginTop={8} />
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
	const { params, locale } = context
	const matchingAuthors = await getAuthorsByName({
		slug: params.slug,
		page: 1,
	})

	// Filter out the posts that don't match our current locale
	// TODO: This could probably be more efficient
	matchingAuthors.data.authors.data[0].attributes.posts.data =
		matchingAuthors.data.authors.data[0].attributes.posts.data.filter(
			(post) => post.attributes.locale === locale
		)

	return {
		props: {
			author: matchingAuthors.data.authors.data[0],
			meta: matchingAuthors.data.authors.meta.pagination,
			locale,
		},
	}
}

export default Author
