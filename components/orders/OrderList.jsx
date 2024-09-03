// components/OrderList.jsx
'use client'
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import OrderItem from './OrderItem';

export default function OrderList() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(`/api/orders?userId=${session?.user?.id}`);
      const data = await response.json();
      setOrders(data.orders);
    };

    if (session?.user?.id) {
      fetchOrders();
    }
  }, [session?.user?.id]);

  if (!orders.length) {
    return <div className='text-center'>No orders found</div>;
  }

  return (
    <div className='order-list'>
      <h2>Your Orders</h2>
      {orders.map((order, index) => (
        <OrderItem key={index} order={order} />
      ))}
    </div>
  );
}
