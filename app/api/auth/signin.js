// /pages/api/auth/signin.js
import { getCsrfToken } from 'next-auth/react';

export default async function handler(req, res) {
  const csrfToken = await getCsrfToken();
  res.status(200).json({ csrfToken });
}
