import Head from 'next/head';
import ErrorPage from 'next/error';
import App from 'next/app';
import { DefaultSeo } from 'next-seo';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import { createContext } from 'react';

import { getAdminSettings, getGlobalData } from '../utils/api';
import { getStrapiMedia } from '../utils/media';

import '../styles/globals.css';
import { ModalProvider } from '../utils/context/modal-context';

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
        <link rel="shortcut icon" href={getStrapiMedia(favicon.data.attributes.url)} />
      </Head>
      <DefaultSeo
        titleTemplate={`%s | ${metaTitleSuffix}`}
        title={metadata.metaTitle}
        description={metadata.metaDesription}
        openGraph={{
          ...(metadata.image && metadata.metaImage.data.attributes.formats
            ? {
                images: Object.values(metadata.metaImage.data.attributes.formats).map(image => {
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
                    url: metadata.metaImage.data.attributes.url,
                    width: metadata.metaImage.data.attributes.width,
                    height: metadata.metaImage.data.attributes.height,
                  },
                ],
              }),
        }}
      />
      <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY}>
        <GlobalContext.Provider value={{ global: global.attributes, locale }}>
          <ModalProvider>
            <Component {...pageProps} />
          </ModalProvider>
        </GlobalContext.Provider>
      </GoogleReCaptchaProvider>
    </>
  );
}

MyApp.getInitialProps = async ctx => {
  const appProps = await App.getInitialProps(ctx);
  const [globalLocale, adminSettings] = await Promise.all([
    getGlobalData({
      locale: ctx.router.locale || 'en',
    }),
    getAdminSettings(),
  ]);
  return {
    ...appProps,
    pageProps: {
      global: globalLocale.data.global.data,
      adminSettings: adminSettings?.data?.adminSetting.data,
    },
  };
};

export default MyApp;
