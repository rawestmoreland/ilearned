import { fetchAPI, getPostsByCategory } from '../../utils/api'
import Layout from '../../components/Layout'

const Category = ({ category, locale }) => {
	const seo = {
		metaTitle: category.attributes.name,
		metaDescription: `All ${category.attributes.name} posts`,
	}

	const { name, posts } = category.attributes

	return (
		<Layout>
			{/* <Seo seo={seo} /> */}
			<div className=''>
				<div className='text-off-white'>
					<div>Articles Tagged</div>
					<h1>{name.upperCase}</h1>
					{posts.data
						.filter((post) => {
							return post.attributes.locale === locale
						})
						.map((localePost) => {
							return (
								<div key={localePost.id}>
									{localePost.attributes.title}
								</div>
							)
						})}
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
			categorySlugs.forEach((slug) => (slug.locale = locale))

			return [...currentCategories, ...categorySlugs]
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
	const matchingCategories = await getPostsByCategory({ slug: params.slug })

	return {
		props: {
			category: matchingCategories[0],
			locale,
		},
	}
}

export default Category
