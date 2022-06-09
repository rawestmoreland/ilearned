import Head from 'next/head'
import ErrorPage from 'next/error'
import App from 'next/app'

import { createContext } from 'react'

import { getGlobalData } from '../utils/api'
import { getStrapiMedia } from '../utils/media'

import '../styles/globals.css'
import Router from 'next/router'

export const GlobalContext = createContext({})

function MyApp({ Component, pageProps }) {
	const { global, locale } = pageProps
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
			<GlobalContext.Provider
				value={{ global: global.attributes, locale }}
			>
				<Component {...pageProps} />
			</GlobalContext.Provider>
		</>
	)
}

MyApp.getInitialProps = async (ctx) => {
	const appProps = await App.getInitialProps(ctx)
	const globalLocale = await getGlobalData({ locale: ctx.router.locale })
	return {
		...appProps,
		pageProps: { global: globalLocale?.data, locale: ctx.router.locale },
	}
}

export default MyApp
