// app/user/orders/page.js
'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function UserOrdersPage() {
  const [orders, setOrders] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch('/api/orders/user');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    };

    if (session) {
      fetchOrders();
    }
  }, [session]);

  if (!session) {
    return <p>Please log in to view your orders.</p>;
  }

  return (
    <section>
      <h1>Your Orders</h1>
      <div>
        {orders.map((order) => (
          <div key={order._id}>
            <Link href={`/user/orders/${order._id}`}>
              <a>
                <h2>Order #{order._id}</h2>
                <p>Total: {order.totalPrice} ฿</p>
                <p>Paid: {order.isPaid ? 'Yes' : 'No'}</p>
                <p>Delivered: {order.isDelivered ? 'Yes' : 'No'}</p>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
