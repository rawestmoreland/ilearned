import { getToken } from 'next-auth/jwt';
import { getAdminSettingsFetch, getStrapiURL } from '../../utils/api';

export default async (req, res) => {
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req, secret });
  if (token) {
    if (req.method === 'PUT') {
      const url = getStrapiURL('/api/admin-setting');
      const putResponse = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.jwt}`,
        },
        body: JSON.stringify({ data: req.body }),
      });
      const { data, error } = await putResponse.json();
      if (error) {
        return res.status(error.status).json({ error: error.message });
      }
      return res.status(200).json({ data });
    } else {
      const adminSettings = await getAdminSettingsFetch(token.jwt);
      if (adminSettings.error) {
        return res
          .status(adminSettings.error.status)
          .json({ error: adminSettings.error.message });
      }
      return res.status(200).json({ data: adminSettings.data });
    }
  } else {
    // Not Signed in
    res.status(401).json({ error: 'Not Signed in' });
  }
  res.end();
};
