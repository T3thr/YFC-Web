// app/admin/orders/page.js
'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch('/api/orders/admin');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    };

    if (session?.user.isAdmin) {
      fetchOrders();
    }
  }, [session]);

  if (!session?.user.isAdmin) {
    return <p>Access denied.</p>;
  }

  return (
    <section>
      <h1>Manage Orders</h1>
      <div>
        {orders.map((order) => (
          <div key={order._id}>
            <Link href={`/admin/orders/${order._id}`}>
              <a>
                <h2>Order #{order._id}</h2>
                <p>User: {order.user.name}</p>
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
