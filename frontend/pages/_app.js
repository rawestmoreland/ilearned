import Head from 'next/head'
import ErrorPage from 'next/error'
import App from 'next/app'

import { createContext } from 'react'

import { fetchAPI } from '../utils/api'
import { getStrapiMedia } from '../utils/media'

import '../styles/globals.css'
import Router from 'next/router'

export const GlobalContext = createContext({})

function MyApp({ Component, pageProps }) {
	console.log(process.env.ADMIN_API_TOKEN)
	const { global } = pageProps
	if (global == null) {
		return <ErrorPage statusCode={404} />
	}
	const { favicon } = global.attributes
	return (
		<>
			<Head>
				<link
					rel='shortcut icon'
					href={getStrapiMedia(favicon.data.attributes.url)}
				/>
			</Head>
			<GlobalContext.Provider value={global.attributes}>
				<Component {...pageProps} />
			</GlobalContext.Provider>
		</>
	)
}

MyApp.getInitialProps = async (ctx) => {
	const appProps = await App.getInitialProps(ctx)
	const globalLocale = await fetchAPI('/global', false, {
		locale: ctx.router.locale,
		populate: {
			favicon: { populate: '*' },
			metadata: { populate: '*' },
			navbar: { populate: '*' },
		},
	})
	return { ...appProps, pageProps: { global: globalLocale } }
}

export default MyApp
