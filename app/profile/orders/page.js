// app/profile/orders/page.js
import { getSession } from 'next-auth/react';
import Order from '@/backend/models/Order';
import mongodbConnect from '@/backend/lib/mongodb';

export async function getServerSideProps(context) {
  try {
    await mongodbConnect(); // Ensure the database connection

    const session = await getSession(context);
    if (!session || !session.user) {
      return { redirect: { destination: '/signin', permanent: false } };
    }

    const orders = await Order.find({ userId: session.user._id })
      .populate('cartItems.product')
      .exec();

    return {
      props: { orders: JSON.parse(JSON.stringify(orders)) },
    };
  } catch (error) {
    return {
      props: { orders: [] },
    };
  }
}

export default function ProfileOrdersPage({ orders }) {
  return (
    <section className="py-10 bg-gray-100">
      <div className="container max-w-screen-xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">My Orders</h2>
        {orders.length === 0 ? (
          <p>You have no orders yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order._id} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Order #{order._id}</h3>
                <div>
                  {order.cartItems.map(item => (
                    <div key={item.product._id} className="flex justify-between mb-4">
                      <div>{item.product.productName}</div>
                      <div>{item.quantity} x {item.price} ฿</div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between font-bold mt-4">
                  <span>Total Amount</span>
                  <span>{order.totalAmount} ฿</span>
                </div>
                <div className="mt-4 text-gray-500">
                  Status: {order.status}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
