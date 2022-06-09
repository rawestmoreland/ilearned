import { fetchAPI, getCategoriesBySlug } from '../../utils/api'
import Layout from '../../components/Layout'
import PostGrid from '../../components/PostGrid'

const Category = ({ category, locale }) => {
	const seo = {
		metaTitle: category.attributes.name,
		metaDescription: `All ${category.attributes.name} posts`,
	}

	const { name, posts } = category.attributes

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
					<PostGrid posts={posts.data} marginTop={8} />
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
	const matchingCategories = await getCategoriesBySlug({ slug: params.slug })

	// Filter out the posts that don't match our current locale
	// TODO: This could probably be more efficient
	matchingCategories.attributes.posts.data =
		matchingCategories.attributes.posts.data.filter(
			(post) => post.attributes.locale === locale
		)

	return {
		props: {
			category: matchingCategories,
			locale,
		},
	}
}

export default Category
