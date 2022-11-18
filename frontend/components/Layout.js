import { useState, useEffect, useContext } from 'react';

import ComingSoon from './ComingSoon';

import { useRouter } from 'next/router';

import Loading from './Loading';
import Navbar from './Navbar';
import Footer from './Footer';

import { GlobalContext } from '../pages/_app';

const PreviewModeBanner = () => {
  const router = useRouter();
  const exitURL = `/api/exit-preview?redirect=${encodeURIComponent(router.asPath)}`;

  return (
    <div className="mt-16 py-4 bg-red-600 text-red-100 font-semibold uppercase tracking-wide">
      <div className="container">
        Preview mode is on.{' '}
        <a className="underline" href={`/api/exit-preview?redirect=${router.asPath}`}>
          Turn off
        </a>
      </div>
    </div>
  );
};

const Layout = ({ children, live = true, preview, ...props }) => {
  const { global } = useContext(GlobalContext);
  const { navbar, footer } = global;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);

    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
    return function cleanup() {
      handleComplete;
    };
  }, [router]);

  return (
    <div className="relative min-h-screen">
      <div className="pb-60">
        <Navbar navbar={navbar} pageContext={props.pageContext} />
        {preview && <PreviewModeBanner />}
        <Loading loading={loading} />
        <div className={`${loading ? 'hidden' : 'container pt-16'}`}>{live ? children : <ComingSoon />}</div>
      </div>
      <Footer footer={footer} />
    </div>
  );
};

export default Layout;
