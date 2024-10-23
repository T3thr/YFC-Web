// components/OrderList.jsx
'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import OrderItem from './OrderItem';
import Loading from '@/app/loading';

export default function OrderList() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      const response = await fetch(`/api/orders?userEmail=${session?.user?.email}`);
      const data = await response.json();
      const sortedOrders = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(data);
      setIsLoading(false); 
    };

    if (session?.user?.email) {
      fetchOrders();
    } else {
      setIsLoading(false); // ไม่ต้องโหลดหากไม่ได้ log in
    }
  }, [session?.user?.email]);

  if (isLoading) {
    return <Loading />;
  }

  if (!orders.length) {
    return <div className='text-center'>No orders found</div>;
  }

  return (
    <div className='order-list p-6'>
      {orders.map((order, index) => (
        <OrderItem key={index} order={order} />
      ))}
    </div>
  );
}
