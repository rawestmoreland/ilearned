import PropTypes from 'prop-types'
import { mediaPropTypes } from '../utils/types'
import { NextSeo } from 'next-seo'
import { useContext } from 'react'
import { GlobalContext } from '../pages/_app'
import { getStrapiMedia } from '../utils/media'

const Seo = ({ seo }) => {
	const globalContext = useContext(GlobalContext)
	const { metadata, siteName, metaTitleSuffix } = globalContext.global
	console.log({ metadata })
	const seoWithDefaults = {
		...metadata,
		...seo,
	}
	const fullSeo = {
		...seoWithDefaults,
		metaTitle: `${
			seoWithDefaults.metaTitle === siteName
				? siteName + ' | ' + metaTitleSuffix
				: seoWithDefaults.metaTitle + ' | ' + siteName
		}`,
		shareImage: seoWithDefaults.shareImage.data.attributes || null,
	}

	return (
		<NextSeo
			title={fullSeo.metaTitle || ''}
			description={fullSeo.metaDescription || ''}
			openGraph={{
				// Title and description are mandatory
				title: fullSeo.metaTitle || '',
				description: fullSeo.metaDescription || '',
				// Only include OG image if we have it
				// Careful: if you disable image optimization in Strapi, this will break
				...(fullSeo.shareImage && fullSeo.shareImage.formats
					? {
							images: Object.values(
								fullSeo.shareImage.formats
							).map((image) => {
								return {
									url: getStrapiMedia(image.url),
									width: image.width,
									height: image.height,
								}
							}),
					  }
					: {
							images: [
								{
									url: fullSeo.shareImage.url,
									width: fullSeo.shareImage.width,
									height: fullSeo.shareImage.height,
								},
							],
					  }),
			}}
			// Only included Twitter data if we have it
			twitter={{
				...(fullSeo.twitterCardType && {
					cardType: fullSeo.twitterCardType,
				}),
				// Handle is the twitter username of the content creator
				...(fullSeo.twitterUsername && {
					handle: fullSeo.twitterUsername,
				}),
			}}
		/>
	)
}

Seo.propTypes = {
	metadata: PropTypes.shape({
		metaTitle: PropTypes.string.isRequired,
		metaDescription: PropTypes.string.isRequired,
		shareImage: mediaPropTypes,
		twitterCardType: PropTypes.string,
		twitterUsername: PropTypes.string,
	}),
}

export default Seo
