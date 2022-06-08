import { fetchAPI, getAuthorsByName } from '../../utils/api'
import Layout from '../../components/Layout'
import PostGrid from '../../components/PostGrid'
import slugify from 'slugify'

const Author = ({ author }) => {
	const seo = {
		metaTitle: author.attributes.name,
		metaDescription: `All ${author.attributes.name} posts`,
	}

	const { name, posts } = author.attributes

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
					<PostGrid posts={posts.data} marginTop={8} />
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
			authorNames.forEach((name) => (name.locale = locale))

			return [...currentAuthors, ...authorNames]
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

	console.log(paths)

	return {
		paths,
		fallback: false,
	}
}

export async function getStaticProps(context) {
	const { params, locale } = context
	const matchingAuthors = await getAuthorsByName({ slug: params.slug })

	// Filter out the posts that don't match our current locale
	// TODO: This could probably be more efficient
	matchingAuthors.attributes.posts.data =
		matchingAuthors.attributes.posts.data.filter(
			(post) => post.attributes.locale === locale
		)

	return {
		props: {
			author: matchingAuthors,
			locale,
		},
	}
}

export default Author
