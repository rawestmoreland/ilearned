import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ConfirmPage = () => {
  const { query } = useRouter();
  const [activated, setActivated] = useState(false);
  const [validating, setValidating] = useState(true);
  const verifyEmail = async token => {
    const requestUrl = process.env.NEXT_PUBLIC_ILEARNED_URL || 'http://localhost:3000';
    const res = await fetch(`${requestUrl}/api/verifyemail`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        token,
      }),
    });
    const { data } = await res.json();

    setValidating(false);

    if (data && data.activated) {
      setActivated(true);
    }
  };

  useEffect(() => {
    verifyEmail(query.token);
    return () => {};
  }, []);

  return (
    <Layout>
      {!activated && !validating && (
        <div className="relative text-white w-full h-full top-[20vh]">
          😞 sorry, we were unable to verify your email 😞
        </div>
      )}
      {activated && !validating && (
        <div className="relative text-white text-center w-full h-full flex flex-col items-center gap-y-4 top-[20vh]">
          <span>🧠 thank you! you email has been verified 🧠</span>
          <Link href="/">
            <span className="text-blue-400 cursor-pointer underline">check out the home page to browse posts</span>
          </Link>
        </div>
      )}
    </Layout>
  );
};

export default ConfirmPage;
