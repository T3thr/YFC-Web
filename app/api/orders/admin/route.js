// app/api/orders/admin/route.js
import { getSession } from 'next-auth/react';
import mongodbConnect from '@/backend/lib/mongodb';
import OrderModel from '@/backend/models/Order';

export async function GET(req) {
  await mongodbConnect();
  const session = await getSession({ req });

  if (!session || !session.user.isAdmin) {
    return new Response('Unauthorized', { status: 401 });
  }

  const orders = await OrderModel.find().populate('user');
  return new Response(JSON.stringify(orders), { status: 200 });
}
