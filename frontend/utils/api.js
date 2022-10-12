import qs from 'qs';

export function getStrapiURL(path) {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1338'}${path}`;
}

export function getNextURL(path) {
  return `${process.env.NEXT_PUBLIC_ILEARNED_URL || 'http://localhost:3000'}${path}`;
}

export function getApiToken(token) {
  return process.env.NODE_ENV === 'development'
    ? token || process.env.NEXT_PUBLIC_DEV_API_TOKEN
    : token || process.env.NEXT_PUBLIC_ADMIN_API_TOKEN;
}

export async function signIn({ email, password }) {
  const signInRes = await fetch(`${getStrapiURL('/api/auth/local')}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      identifier: email,
      password,
    }),
  });

  const data = await signInRes.json();

  // {jwt, data, error}

  return data;
}

export async function getMe(token) {
  const userRes = await fetch(`${getStrapiURL('/api/users/me')}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const userJson = await userRes.json();
  return userJson;
}

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {RequestInit} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPIWithToken({ path, urlParamsObject = {}, options = {}, token = null }) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getApiToken(token)}`,
    },
    ...options,
  };

  // Build request URL
  const queryString = qs.stringify(urlParamsObject, { encodeValuesOnly: true });
  const requestUrl = `${getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ''}`)}`;

  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions);

  const { data, error } = await response.json();

  return { data, error };
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path, authRequired = false, urlParamsObject = {}) {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const API_TOKEN = getApiToken();

  if (authRequired) {
    defaultOptions.headers.Authorization = `Bearer ${API_TOKEN}`;
  }

  const mergedOptions = {
    ...defaultOptions,
  };

  // Build request URL
  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ''}`)}`;

  const response = await fetch(requestUrl, mergedOptions);

  const { data, error, meta } = await response.json();

  if (!response.ok) {
    console.log({ requestUrl });
    console.log({ error });
    throw new Error(`An error occured please try again`);
  }
  return { data, error: error || null, meta: meta || null };
}

export async function getAdminSettingsFetch(token = null) {
  const adminRes = await fetchAPIWithToken({
    path: '/admin-setting',
    urlParamsObject: { fields: ['live', 'showSignup'] },
    token,
  });
  return adminRes;
}

export async function getAdminSettings(token = null) {
  const apiToken = getApiToken(token);
  const gqlEndpoint = getStrapiURL('/graphql');
  const adminRes = await fetch(gqlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiToken}`,
    },
    body: JSON.stringify({
      query: `
			query GetAdminSettings {
				adminSetting {
					data {
						attributes {
							live
              showSignup
						}
					}
				}
			}
			`,
    }),
  });

  const { data, errors } = await adminRes.json();

  return { data, errors };
}

// Get site data from Strapi (metadata, navbar, footer...)
export async function getGlobalData() {
  const gqlEndpoint = getStrapiURL('/graphql');
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
			query GetGlobal {
				global {
					data {
						id
						attributes {
							favicon {
								...FileParts
							}
							siteName
							metadata {
                metaTitle
                metaDescription
                metaImage {
                  ...FileParts
                }
                metaSocial {
                  socialNetwork
                  title
                  description
                  image {
                    ...FileParts
                  }
                }
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
							footer {
								logo {
									...FileParts
								}
								smallText
								columns {
									id
									title
									links {
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
			}      
      `,
    }),
  });

  const { data, errors } = await globalRes.json();

  if (!data) {
    return null;
  }

  return { data };
}

export async function getPosts({ slug = null, page = 1, pageName = null }) {
  const gqlEndpoint = getStrapiURL('/graphql');
  const postsRes = await fetch(gqlEndpoint, {
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
			query GetPosts(
				$page: Int!
				${slug && '$slug: String'}
			) {
				posts(
					pagination: {page: $page, pageSize: 10}
					${
            (pageName === 'category' || pageName === 'author') &&
            'filters: {or: [{categories: {slug: {containsi: $slug}}}, {authors: {slug: {containsi: $slug}}}]  }'
          }
					${!pageName && 'filters: {slug: {eq: $slug}}'}
				) {
					data {
						id
						attributes {
							title
							content
							description
							locale
              publishedAt
							slug
							localizations {
								data {
									id
									attributes {
										locale
									}
								}
							}
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
										slug
										picture {
											...FileParts
										}
									}
								}
							}
							image {
								...FileParts
							}
						}
					}
					meta {
						pagination {
							page
							pageSize
							pageCount
							total
						}
					}
				}
			}
			`,
      variables: {
        slug,
        page,
      },
    }),
  });

  const { data, errors } = await postsRes.json();

  return { data, errors };
}

/**
 *
 * @param {Object} options
 * @param {string} options.slug The post's slug
 * @param {string} options.locale The current locale specified in router.locale
 */
export async function getPostsBySlug({ slug, locale = null }) {
  // Find the pages that match this slug
  const gqlEndpoint = getStrapiURL('/graphql');
  const pagesRes = await fetch(gqlEndpoint, {
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
      query GetPosts($slug: String!) {
        posts(
          filters: { slug: { eq: $slug } }
          pagination: { page: 1, pageSize: 10 }
        ) {
          data {
            attributes {
              title
              description
              content
              slug
              authors {
                data {
                  id
                  attributes {
                    name
                    email
                    slug
                    picture {
                      ...FileParts
                    }
                  }
                }
              }
              seo {
                metaTitle
                metaDescription
                metaImage {
                  ...FileParts
                }
                metaSocial {
                  socialNetwork
                  title
                  description
                  image {
                    ...FileParts
                  }
                }
              }
              publishedAt
              categories {
                data {
                  id
                  attributes {
                    name
                    slug
                  }
                }
              }
              image {
                ...FileParts
              }
            }
          }
          meta {
            pagination {
              page
              pageSize
              pageCount
              total
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
  });

  const { data, errors } = await pagesRes.json();

  // Return the first item since there should only be one result per slug
  return { data, errors };
}

/**
 *
 * @param {Object} options
 * @param {string} options.slug The category's slug
 */
export async function getPostsByCategory({ slug, page = 1 }) {
  // Find the pages that match this slug
  const gqlEndpoint = getStrapiURL('/graphql');
  const categoriesRes = await fetch(gqlEndpoint, {
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
			query GetCategoryPosts(
				$slug: String!
        $page: Int!
			) {        
				posts(
					pagination: {page: $page, pageSize: 10}
					filters: { categories: {slug: {containsi: $slug}} }
					sort: "id:asc"
				) {
					data {
						id
						attributes {
							title
							content
							description
              publishedAt
							slug
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
										slug
										picture {
											...FileParts
										}
									}
								}
							}
							image {
								...FileParts
							}
						}
					}
					meta {
						pagination {
							page
							pageSize
							pageCount
							total
						}
					}
				}
				categories(
					filters: {slug: {eq: $slug}}
				) {
					data {
						id
						attributes {
							name
							slug
						}
					}
				}
			}      
      `,
      variables: {
        slug,
        page,
      },
    }),
  });

  const { data } = await categoriesRes.json();
  // Make sure we found something, otherwise return null
  if (data.posts === null) {
    return null;
  }

  // Return the first item since there should only be one result per slug
  return { data };
}

export async function getPostsByAuthor({ slug, page = 1 }) {
  const gqlEndpoint = getStrapiURL('/graphql');
  const authorsRes = await fetch(gqlEndpoint, {
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
			query GetAuthorPosts(
				$slug: String!
			) {        
				posts(
					pagination: {page: ${page}, pageSize: 10}
					filters: { authors: {slug: {containsi: $slug}} }
					sort: "id:asc"
				) {
					data {
						id
						attributes {
							title
							content
							description
							locale
              publishedAt
							slug
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
										slug
										picture {
											...FileParts
										}
									}
								}
							}
							image {
								...FileParts
							}
						}
					}
					meta {
						pagination {
							page
							pageSize
							pageCount
							total
						}
					}
				}
				authors(
					filters: {slug: {eq: $slug}}
				) {
					data {
						attributes {
							name
							slug
							picture {
								...FileParts
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
  });

  const { data } = await authorsRes.json();
  // Make sure we found something, otherwise return null
  if (data.posts === null) {
    return null;
  }

  // Return the first item since there should only be one result per slug
  return { data };
}

export async function getHomePageData(locale) {
  const { data } = await fetchAPI('/posts', false, {
    locale: locale,
    pagination: {
      page: 1,
      pageSize: 10,
      withCount: true,
    },
    populate: {
      authors: { populate: ['picture'] },
      image: '*',
      categories: '*',
      meta: '*',
    },
  });

  return data;
}

export async function getAllThings(locale) {
  const gqlEndpoint = getStrapiURL('/graphql');
  const authorsRes = await fetch(gqlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getApiToken()}`,
    },
    body: JSON.stringify({
      query: `
			query GetAllThings(
				$locale: I18NLocaleCode!
			) {
				posts(
					locale: $locale
					pagination: { page: 1, pageSize: 10 }
					) {
					data {
						id
						attributes {
							title
							content
							description
							locale
							authors {
								data {
									attributes {
										name
										slug
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
							categories {
								data {
									id
									attributes {
										name
										slug
									}
								}
							}
							slug
							image {
								data {
									attributes {
										width
										height
										url
										formats
									}
								}
							}
						}
					}
					meta {
						pagination {
							page
							pageSize
							pageCount
							total
						}
					}
				}
				categories {
					data {
						id
						attributes {
							name
							posts {
								data {
									id
									attributes {
										title
									}
								}
							}
						}
					}
				}
				homepage {
					data {
						attributes {
							Hero {
								title
							}
							seo {
								metaTitle
								metaDescription
								twitterUsername
								twitterCardType
								shareImage {
									data {
										attributes {
											formats
											height
											width
											url
										}
									}
								}
							}
						}
					}
				}
				adminSetting {
					data {
						attributes {
							live
						}
					}
				}
			}
			`,
      variables: {
        locale,
      },
    }),
  });

  const { data, errors } = await authorsRes.json();

  return { data, errors: errors || null };
}
