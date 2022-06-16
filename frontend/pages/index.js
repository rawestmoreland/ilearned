import { useEffect } from 'react'

import { useInfiniteQuery } from 'react-query'

import { useInView } from 'react-intersection-observer'

import Layout from '../components/Layout'
import PostGrid from '../components/PostGrid'

import { fetchAPI, getPosts } from '../utils/api'

export default function Home({ posts, adminSettings, locale, ...pageProps }) {
	const { ref, inView } = useInView()
	const { live } = adminSettings.data.attributes

	const { data, fetchNextPage, isLoading } = useInfiniteQuery(
		['posts', locale],
		({ pageParam = 1 }) => getPosts({ locale, page: pageParam }),
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
					pageParams: [null],
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
			{live ? (
				data && (
					<>
						<PostGrid pages={data.pages} />
						<div ref={ref}></div>
					</>
				)
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
	const [postsRes, adminSettingsRes] = await Promise.all([
		getPosts({ locale: ctx.locale, page: 1 }),
		fetchAPI('/admin-setting', true),
	])

	return {
		props: {
			posts: postsRes.data.posts,
			adminSettings: adminSettingsRes,
			locale: ctx.locale,
		},
	}
}
