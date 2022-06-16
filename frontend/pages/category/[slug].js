import { useEffect, useState } from 'react'

import { useInfiniteQuery } from 'react-query'
import { useInView } from 'react-intersection-observer'

import { fetchAPI, getPostsByCategory } from '../../utils/api'
import Layout from '../../components/Layout'
import PostGrid from '../../components/PostGrid'

const Category = ({ posts, category, meta, locale, ...pageProps }) => {
	const { ref, inView } = useInView()
	const { name, slug } = category?.attributes
	// const seo = {
	// 	metaTitle: category.attributes.name,
	// 	metaDescription: `All ${category.attributes.name} posts`,
	// }

	const { data, isLoading, fetchNextPage } = useInfiniteQuery(
		['posts', slug],
		({ pageParam = 1 }) =>
			getPostsByCategory({ slug, locale, page: pageParam }),
		{
			initialData: () => {
				return {
					pages: [
						{
							data: {
								posts: { data: posts.data, meta: posts.meta },
							},
						},
					],
				}
			},
			getNextPageParam: (lastPage) => {
				return lastPage.data.posts.meta.pagination.page <
					lastPage.data.posts.meta.pagination.pageCount
					? lastPage.data.posts.meta.pagination.page + 1
					: undefined
			},
		}
	)

	useEffect(() => {
		if (inView) {
			fetchNextPage()
		}
	}, [inView])

	return (
		<Layout global={pageProps.global}>
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
					data && (
					<>
						<PostGrid pages={data.pages} />
						<div ref={ref}></div>
					</>
					)
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
	const matchingPosts = await getPostsByCategory({
		slug: params.slug,
		locale,
		page: 1,
	})

	return {
		props: {
			posts: matchingPosts.data.posts,
			category: matchingPosts.data.categories?.data[0] || null,
			meta: matchingPosts.data.posts.meta.pagination,
			locale,
		},
	}
}

export default Category
