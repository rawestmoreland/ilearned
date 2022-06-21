import Head from 'next/head'
import ErrorPage from 'next/error'
import App from 'next/app'

import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import React, { createContext } from 'react'

import { getAdminSettings, getGlobalData } from '../utils/api'
import { getStrapiMedia } from '../utils/media'

import '../styles/globals.css'

export const GlobalContext = createContext({})

function MyApp({ Component, pageProps }) {
	const [queryClient] = React.useState(() => new QueryClient())
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
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools />
				<Component {...pageProps} />
			</QueryClientProvider>
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
