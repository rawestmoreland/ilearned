import qs from 'qs'

export function getStrapiURL(path) {
	return `${
		process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'
	}${path}`
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path, options = {}, urlParamsObject = {}) {
	const defaultOptions = {
		headers: {
			'Content-Type': 'application/json',
		},
	}
	const mergedOptions = {
		...defaultOptions,
		...options,
	}

	// Build request URL
	const queryString = qs.stringify(urlParamsObject)
	const requestUrl = `${getStrapiURL(
		`/api${path}${queryString ? `?${queryString}` : ''}`
	)}`

	const response = await fetch(requestUrl, mergedOptions)

	if (!response.ok) {
		throw new Error(`An error occured please try again`)
	}
	const data = await response.json()
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

	return global.data.global.data
}
