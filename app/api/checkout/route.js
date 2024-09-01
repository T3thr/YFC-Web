// app/api/checkout/route.js
import Order from '@/backend/models/Order';
import Product from '@/backend/models/Product';
import mongodbConnect from '@/backend/lib/mongodb';

export async function POST(req) {
  try {
    await mongodb(); // Ensure the database connection

    const { cartItems, totalAmount } = await req.json();
    const userId = req.cookies.userId; // Get the user ID from cookies or session

    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Create the order
    const order = await Order.create({
      userId,
      cartItems: cartItems.map(item => ({
        product: item.product,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount,
    });

    return new Response(JSON.stringify(order), { status: 201 });
  } catch (error) {
    return new Response('Error creating order', { status: 500 });
  }
}
