import { request } from 'http'
import qs from 'qs'

export function getStrapiURL(path) {
	return `${
		process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'
	}${path}`
}

// Helper to make GET requests to Strapi
export async function fetchAPI(
	path,
	authRequired = false,
	urlParamsObject = {}
) {
	const defaultOptions = {
		headers: {
			'Content-Type': 'application/json',
		},
	}

	if (authRequired) {
		defaultOptions.headers.Authorization = `Bearer ${process.env.ADMIN_API_TOKEN}`
	}

	const mergedOptions = {
		...defaultOptions,
	}

	// Build request URL
	const queryString = qs.stringify(urlParamsObject)
	const requestUrl = `${getStrapiURL(
		`/api${path}${queryString ? `?${queryString}` : ''}`
	)}`

	const response = await fetch(requestUrl, mergedOptions)

	const { data, error } = await response.json()

	if (!response.ok) {
		throw new Error(`An error occured please try again`)
	}
	return data
}

// Get site data from Strapi (metadata, navbar, footer...)
export async function getGlobalData(locale) {
	const gqlEndpoint = getStrapiURL('/graphql')
	const globalRes = await fetch(gqlEndpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			query: `
			fragment FileParts on UploadFileEntityResponse {
				data {
					id
					attributes {
						alternativeText
						width
						height
						mime
						url
						formats
					}
				}
			}
query GetGlobal($locale: I18NLocaleCode!) {
global(locale: $locale) {
					data {
						id
						attributes {
							favicon {
								...FileParts
							}
							metadata {
								metaTitle
								metaDescription
								shareImage {
									...FileParts
								}
								twitterCardType
								twitterUsername
							}
							metaTitleSuffix
							navbar {
								logo {
									...FileParts
								}
								link {
									id
									url
									newTab
									text
								}
							}
						}
					}
				}
}      
      `,
			variables: {
				locale,
			},
		}),
	})

	const global = await globalRes.json()

	return global?.data.global.data
}

/**
 *
 * @param {Object} options
 * @param {string} options.slug The post's slug
 * @param {string} options.locale The current locale specified in router.locale
 */
export async function getPostsBySlug({ slug, locale }) {
	// Find the pages that match this slug
	const gqlEndpoint = getStrapiURL('/graphql')
	const pagesRes = await fetch(gqlEndpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			query: `
        query GetPosts(
          $slug: String!
          $locale: I18NLocaleCode!
        ) {        
          posts(
            filters: { slug: { eq: $slug } }
            locale: $locale
          ) {
						data {
							attributes {
								title
								content
								description
								published
								locale
								categories {
									data {
										id
										attributes {
											name
											slug
										}
									}
								}
								authors {
									data {
										attributes {
											name
											picture {
												data {
													attributes {
														height
														width
														formats
														alternativeText
														url
													}
												}
											}
										}
									}
								}
								image {
									data {
										attributes {
											height
											width
											formats
											alternativeText
											url
										}
									}
								}
							}
						}
					}
        }      
      `,
			variables: {
				slug,
				locale,
			},
		}),
	})

	const postData = await pagesRes.json()
	// Make sure we found something, otherwise return null
	if (postData.data.posts === null || postData.data.posts.length === 0) {
		return null
	}

	// Return the first item since there should only be one result per slug
	return postData.data.posts.data[0]
}

/**
 *
 * @param {Object} options
 * @param {string} options.slug The category's slug
 */
export async function getPostsByCategory({ slug }) {
	// Find the pages that match this slug
	const gqlEndpoint = getStrapiURL('/graphql')
	const pagesRes = await fetch(gqlEndpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			query: `
        query GetGategoryPosts(
          $slug: String!
        ) {        
          categories(
            filters: { slug: { eq: $slug } }
          ) {
						data {
							attributes {
								name
								slug
								posts {
									data {
										id
										attributes {
											title
											content
											description
											locale
										}
									}
								}
							}
						}
					}
        }      
      `,
			variables: {
				slug,
			},
		}),
	})

	const postData = await pagesRes.json()
	// Make sure we found something, otherwise return null
	if (postData.data.categories === null) {
		return null
	}

	// Return the first item since there should only be one result per slug
	return postData.data.categories.data
}
