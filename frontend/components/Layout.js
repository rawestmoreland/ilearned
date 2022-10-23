import { useState, useEffect, useContext } from 'react';

import ComingSoon from './ComingSoon';

import { useRouter } from 'next/router';

import Loading from './Loading';
import Navbar from './Navbar';
import Footer from './Footer';

import { GlobalContext } from '../pages/_app';

const Layout = ({ children, live = true, ...props }) => {
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
        <Loading loading={loading} />
        <div className={`${loading ? 'hidden' : 'container pt-16'}`}>{live ? children : <ComingSoon />}</div>
      </div>
      <Footer footer={footer} />
    </div>
  );
};

export default Layout;
