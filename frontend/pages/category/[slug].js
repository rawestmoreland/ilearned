import { useEffect, useState } from 'react'

import InfininiteScroll from 'react-infinite-scroll-component'

import Layout from '../../components/Layout'
import PostGrid from '../../components/PostGrid'
import Seo from '../../components/Seo'

import { getLocalizedPaths } from '../../utils/localize'
import { fetchAPI, getPostsByCategory } from '../../utils/api'

const Category = ({
	posts,
	category,
	meta,
	locale,
	pageContext,
	...pageProps
}) => {
	const { live } = pageProps.adminSettings.attributes
	const { name, slug } = category?.attributes
	const [postsMeta, setPostsMeta] = useState(meta)
	const [postsData, setPostsData] = useState(posts)
	const seo = {
		metaTitle: category.attributes.name,
		metaDescription: `All ${category.attributes.name} posts`,
	}

	async function getMorePosts() {
		const postsRes = await getPostsByCategory({
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
			<Seo seo={seo} />
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
						next={() => getMorePosts()}
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
	const { params, locale, locales, defaultLocale } = context
	const matchingPosts = await getPostsByCategory({
		slug: params.slug,
		locale,
		page: 1,
	})

	const pageContext = {
		pageName: 'category',
		locale,
		locales,
		defaultLocale,
		slug: params.slug,
	}

	const localizedPaths = getLocalizedPaths(pageContext)

	return {
		props: {
			posts: matchingPosts.data.posts.data,
			category: matchingPosts.data.categories?.data[0] || null,
			meta: matchingPosts.data.posts.meta.pagination,
			pageContext: {
				...pageContext,
				localizedPaths,
			},
		},
	}
}

export default Category
