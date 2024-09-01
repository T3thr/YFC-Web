// app/profile/orders/page.js
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function ProfileOrdersPage() {
  const [orders, setOrders] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!session) return;

      const res = await fetch('/api/orders/user');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      } else {
        console.error('Failed to fetch orders');
      }
    };

    fetchOrders();
  }, [session]);

  if (!session) {
    return <p>Please log in to view your orders.</p>;
  }

  return (
    <section>
      <h1 className="text-4xl font-bold mb-4">Your Orders</h1>
      <div>
        {orders.length === 0 ? (
          <p>You have no orders yet.</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="mb-8 p-4 border rounded-lg bg-white shadow-md">
              <h2 className="text-2xl font-semibold mb-2">Order #{order._id}</h2>
              <p>Total: {order.totalPrice} ฿</p>
              <p>Paid: {order.isPaid ? 'Yes' : 'No'}</p>
              <p>Delivered: {order.isDelivered ? 'Yes' : 'No'}</p>
              <ul>
                {order.items.map((item) => (
                  <li key={item.product} className="flex justify-between py-2">
                    <span>{item.name}</span>
                    <span>{item.qty} x {item.price} ฿</span>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
