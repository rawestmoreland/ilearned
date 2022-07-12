import { useForm } from 'react-hook-form';

import Layout from '../../components/Layout';
import { signIn } from '../../utils/api';

import { getLocalizedPaths } from '../../utils/localize';

const Admin = ({ pageContext, ...pageProps }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { live } = pageProps.adminSettings.attributes;

  async function handleLogin() {
    const loginData = await signIn();
  }

  return (
    <Layout live={live} pageContext={pageContext}>
      <div className='font-rubik container flex flex-col items-center justify-center h-screen'>
        <div>
          <h1 className='text-xl font-bold text-center text-white mb-8'>
            Admin Page
          </h1>
          <form
            onSubmit={handleSubmit(handleLogin)}
            action='submit'
            className='flex flex-col w-1/2 m-auto items-center justify-center text-white gap-y-4'
          >
            <span id='email-label'>Email</span>
            <input
              aria-labelledby='email-label'
              type='text'
              {...register('email', { required: true })}
            />
            <span id='password-label'>Password</span>
            <input
              aria-labelledby='password-label'
              type='password'
              {...register('password', { required: true })}
            />
            <button
              className='bg-white text-black rounded w-24 h-8'
              type='submit'
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;

export async function getStaticProps(context) {
  const { locale, locales, defaultLocale } = context;

  const pageContext = {
    pageName: 'admin',
    locale,
    locales,
    defaultLocale,
  };

  const localizedPaths = getLocalizedPaths(pageContext);

  return {
    props: {
      pageContext: {
        ...pageContext,
        localizedPaths,
      },
    },
  };
}
