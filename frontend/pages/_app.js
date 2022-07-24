import Head from 'next/head';
import ErrorPage from 'next/error';
import App from 'next/app';
import { DefaultSeo } from 'next-seo';

import { SessionProvider } from 'next-auth/react';

import { createContext } from 'react';

import { getAdminSettings, getGlobalData } from '../utils/api';
import { getStrapiMedia } from '../utils/media';

import { useSession } from 'next-auth/react';

import '../styles/globals.css';

export const GlobalContext = createContext({});

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const { global, locale } = pageProps;
  if (global == null) {
    return <ErrorPage statusCode={404} />;
  }
  const { favicon, metaTitleSuffix, metadata } = global.attributes;
  return (
    <>
      <Head>
        <link
          rel='shortcut icon'
          href={getStrapiMedia(favicon.data.attributes.url)}
        />
      </Head>
      <DefaultSeo
        titleTemplate={`%s | ${metaTitleSuffix}`}
        title={metadata.metaTitle}
        description={metadata.metaDescription}
        openGraph={{
          ...(metadata.shareImage && metadata.shareImage.data.attributes.formats
            ? {
                images: Object.values(
                  metadata.shareImage.data.attributes.formats
                ).map((image) => {
                  return {
                    url: getStrapiMedia(image.url),
                    width: image.width,
                    height: image.height,
                  };
                }),
              }
            : {
                images: [
                  {
                    url: metadata.shareImage.data.attributes.url,
                    width: metadata.shareImage.data.attributes.width,
                    height: metadata.shareImage.data.attributes.height,
                  },
                ],
              }),
        }}
        twitter={{
          cardType: metadata.twitterCardType,
          handle: metadata.twitterUsername,
        }}
      />
      <SessionProvider session={session}>
        <GlobalContext.Provider value={{ global: global.attributes, locale }}>
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </GlobalContext.Provider>
      </SessionProvider>
    </>
  );
}

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return children;
}

MyApp.getInitialProps = async (ctx) => {
  const appProps = await App.getInitialProps(ctx);
  const [globalLocale, adminSettings] = await Promise.all([
    getGlobalData({
      locale: ctx.router.locale,
    }),
    getAdminSettings(),
  ]);
  return {
    ...appProps,
    pageProps: {
      global: globalLocale.data.global.data,
      adminSettings: adminSettings?.data?.adminSetting.data,
      locale: ctx.router.locale,
    },
  };
};

export default MyApp;
