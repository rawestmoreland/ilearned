import { getToken } from 'next-auth/jwt';
import { getMe } from '../../../utils/api';

export default async (req, res) => {
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req, secret });
  if (token) {
    const userData = await getMe(token.jwt);
    if (userData.error) {
      return res
        .status(userData.error.status)
        .json({ error: userData.error.message });
    }
    return res.status(200).json({ data: userData });
  } else {
    // Not Signed in
    res.status(401).json({ error: 'Not Signed in' });
  }
  res.end();
};
