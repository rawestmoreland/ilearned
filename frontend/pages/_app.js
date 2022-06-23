import Head from 'next/head'
import ErrorPage from 'next/error'
import App from 'next/app'

import { createContext } from 'react'

import { getAdminSettings, getGlobalData } from '../utils/api'
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
	const [globalLocale, adminSettings] = await Promise.all([
		getGlobalData({
			locale: ctx.router.locale,
		}),
		getAdminSettings(),
	])
	console.log(globalLocale)
	return {
		...appProps,
		pageProps: {
			global: globalLocale.data.global.data,
			adminSettings: adminSettings.data.adminSetting.data,
			locale: ctx.router.locale,
		},
	}
}

export default MyApp
