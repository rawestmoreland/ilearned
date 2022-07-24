import { getProviders, signIn } from 'next-auth/react';

import { getLocalizedPaths } from '../../utils/localize';

import Layout from '../../components/Layout';

const SignIn = ({ providers, pageContext, ...pageProps }) => {
  return (
    <Layout
      live={pageProps.adminSettings.attributes.live}
      pageContext={pageContext}
    >
      {Object.values(providers).map((provider) => {
        return (
          <div className='text-white' key={provider.name}>
            <button
              className='border border-white rounded p-2'
              onClick={() => signIn(provider.id)}
            >
              Sign in with {provider.name}
            </button>
          </div>
        );
      })}
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { locale, locales, defaultLocale } = context;
  const providers = await getProviders();

  const pageContext = {
    locale,
    locales,
    defaultLocale,
    slug: '',
  };

  const localizedPaths = getLocalizedPaths(pageContext);
  return {
    props: {
      providers,
      pageContext: {
        ...pageContext,
        localizedPaths,
      },
    },
  };
}

export default SignIn;
