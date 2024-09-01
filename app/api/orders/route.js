// app/api/orders/route.js
import mongodbConnect from '@/backend/lib/mongodb';
import Order from '@/backend/models/Order';
import { getServerSession } from 'next-auth/next'; 

export async function GET(request) {
  try {
    await mongodbConnect();

    const url = new URL(request.url);
    const userId = url.searchParams.get('user');

    if (!userId) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    const orders = await OrderModel.find({ user: userId }).populate('items.product');

    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Failed to fetch orders' }, { status: 500 });
  }
}
