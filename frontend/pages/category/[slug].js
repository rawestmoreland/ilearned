import { useState } from 'react'

import InfininiteScroll from 'react-infinite-scroll-component'

import { fetchAPI, getCategoriesBySlug } from '../../utils/api'
import Layout from '../../components/Layout'
import PostGrid from '../../components/PostGrid'

const Category = ({ category, meta, locale }) => {
	const { name, posts, slug } = category.attributes
	const [postsMeta, setPostsMeta] = useState(meta)
	const [postsData, setPostsData] = useState(posts.data)
	// const seo = {
	// 	metaTitle: category.attributes.name,
	// 	metaDescription: `All ${category.attributes.name} posts`,
	// }

	async function getMorePosts() {
		const postsRes = await getCategoriesBySlug({
			slug: slug,
		})

		setPostsData([
			...allPosts,
			...postsRes.data.categories.data[0].attributes.posts.data,
		])
		setPostsMeta(postsRes.data.categories.meta.pagination)
	}

	return (
		<Layout>
			{/* <Seo seo={seo} /> */}
			<div>
				<div>
					<div className='mt-4 md:mt-8'>
						<span className='text-terracotta font-big-shoulders tracking-widest font-extrabold'>
							ARTICLES TAGGED
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
						<PostGrid posts={postsData} />
					</InfininiteScroll>
				</div>
			</div>
		</Layout>
	)
}

export async function getStaticPaths(context) {
	const categories = await context.locales.reduce(
		async (currentCategoriesPromise, locale) => {
			const currentCategories = await currentCategoriesPromise
			const categorySlugs = await fetchAPI('/categories', false, {
				fields: ['slug'],
			})

			/**
			 * Categories aren't localized, but we want paths to
			 * all categories for each locale route.
			 */
			categorySlugs.data.forEach((slug) => (slug.locale = locale))

			return [...currentCategories, ...categorySlugs.data]
		},
		Promise.resolve([])
	)

	const paths = categories.map((category) => {
		const { slug } = category.attributes
		const { locale } = category

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
	const matchingCategories = await getCategoriesBySlug({
		slug: params.slug,
		page: 1,
	})

	// Filter out the posts that don't match our current locale
	// TODO: This could probably be more efficient
	matchingCategories.data.categories.data[0].attributes.posts.data =
		matchingCategories.data.categories.data[0].attributes.posts.data.filter(
			(post) => post.attributes.locale === locale
		)

	return {
		props: {
			category: matchingCategories.data.categories.data[0],
			meta: matchingCategories.data.categories.meta.pagination,
			locale,
		},
	}
}

export default Category
