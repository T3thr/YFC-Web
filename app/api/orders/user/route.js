// app/api/orders/user/route.js
import mongodbConnect from '@/backend/lib/mongodb'; // Your DB connection utility
import Order from '@/backend/models/Order';
import { getSession } from 'next-auth/react';

export async function GET(req) {
  await mongodbConnect();
  const session = await getSession({ req });

  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const orders = await OrderModel.find({ user: session.user._id });
    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return new Response('Failed to fetch orders', { status: 500 });
  }
}
