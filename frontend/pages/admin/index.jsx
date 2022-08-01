import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import CustomSwitch from '../../components/Switch';

import Layout from '../../components/Layout';

import { getLocalizedPaths } from '../../utils/localize';
import { getNextURL } from '../../utils/api';
import { startCase } from 'lodash';

export default function AdminDashboard({ pageContext, ...pageProps }) {
  const { data: session } = useSession();
  const [adminSettings, setAdminSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getAdminSettings = async () => {
      setLoading(true);
      try {
        const nextUrl = getNextURL('/api/admin-settings');
        const adminSettingsRes = await fetch(nextUrl);
        const { data, error } = await adminSettingsRes.json();
        if (error) {
          setError(error);
        } else {
          setAdminSettings(data.attributes);
        }
        setLoading(false);
      } catch (error) {
        //TODO: replace with modal
        setError(error);
        setLoading(false);
      }
    };
    if (session) {
      getAdminSettings();
    } else return;
  }, []);

  const handleUpdate = async (data) => {
    try {
      const nextUrl = getNextURL('/api/admin-settings');
      const updateRes = fetch(nextUrl, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (updateRes.error) {
        setUpdateError(updateRes.error.message);
      } else console.log(updateRes);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleSetting = async (setting) => {
    const newAdminSettings = {
      ...adminSettings,
      [setting]: !adminSettings[setting],
    };
    setAdminSettings(newAdminSettings);
    try {
      await handleUpdate(newAdminSettings);
    } catch (error) {
      setAdminSettings(adminSettings);
    }
  };

  const ErrorText = ({ error }) => {
    return (
      <div className='text-white'>
        {error === 'Forbidden' ? 'Sorry, this is for admins only.' : error}
      </div>
    );
  };

  return (
    <Layout live={true} pageContext={pageContext}>
      {!loading && (
        <div className='flex h-screen w-full items-center justify-center'>
          {error ? (
            <ErrorText error={error} />
          ) : (
            <>
              <div className='text-white'>
                <table className='bg-gray-500 rounded p-4'>
                  <thead>
                    <th colSpan={2}>Admin Settings</th>
                  </thead>
                  <tbody>
                    {Object.keys(adminSettings).map((setting) => {
                      return (
                        <tr key={setting}>
                          <td className='text-right p-2'>
                            {startCase(setting)}
                          </td>
                          <td className='text-right p-2'>
                            <CustomSwitch
                              setting={setting}
                              enabled={adminSettings[setting]}
                              setEnabled={toggleSetting}
                              label={startCase(setting)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { locale, locales, defaultLocale } = context;

  const pageContext = {
    page: 'admin',
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

AdminDashboard.auth = true;
