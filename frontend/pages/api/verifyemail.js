require('dotenv').config();
import { fetchAPIWithToken } from '../../utils/api';

export default async function handler(req, res) {
  const { token } = req.body;
  const updatedUser = await fetchAPIWithToken({
    path: `/api/confirm-subscription/${token}`,
    token: process.env.NEXT_PUBLIC_DEV_API_TOKEN,
  });
  return res.status(200).json({ data: updatedUser });
}
