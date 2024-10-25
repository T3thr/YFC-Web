// components/orders/AdminOrderList.jsx
'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import OrderItem from './OrderItem';
import Loading from '@/app/loading';

export default function AdminOrderList() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      const response = await fetch('/api/orders');
      const data = await response.json();
      const sortedOrders = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(data);
      setIsLoading(false);
    };

    fetchOrders();
  }, []);

  const handleToggleDelivery = async (orderId, isDelivered) => {
    const newStatus = isDelivered ? 'pending' : 'delivered';
    const response = await fetch('/api/orders', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId, status: newStatus }),
    });
    const updatedOrder = await response.json();

    setOrders((prev) =>
      prev.map((order) => (order._id === updatedOrder._id ? updatedOrder : order))
    );
  };

  const handleDeleteOrder = async (orderId) => {
    await fetch('/api/orders', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId }),
    });
    setOrders((prev) => prev.filter((order) => order._id !== orderId));
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!orders.length) {
    return <div className='text-center'>No orders found</div>;
  }

  if (!session?.user?.role || session.user.role !== 'admin') {
    return (
      <div className='flex justify-center items-center min-w-full min-h-screen'>
        <div className='text-xl text-red-500'>Access Denied. Admins Only.</div>
      </div>
    );
  }

  return (
    <div className='admin-order-list p-6'>
      {orders.map((order) => (
        <div
          key={order._id}
          className={`border rounded-lg p-4 mb-4 shadow-lg ${
            order.status === 'delivered' ? 'bg-green-100' : 'bg-red-100'
          }`}
        >
          <h3 className='text-lg font-semibold'>Order #{order._id}</h3>
          <p>User : {order.user.name}</p>
          <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
          <p>Total: {order.totalAmount} ฿</p>
          <p>Shipping: {order.shippingCost} ฿</p>
          <ul className='list-disc pl-5'>
            {order.orderItems.map((item, index) => (
              <li key={index}>
                {item.productName} = {item.quantity} x {item.price} = {item.quantity*item.price} ฿
              </li>
            ))}
          </ul>
          
          <div className='flex items-center mt-2'>
            <input
              type='checkbox'
              checked={order.status === 'delivered'}
              onChange={() => handleToggleDelivery(order._id, order.status === 'delivered')}
              className='mr-2'
            />
            <label>
              {order.status === 'delivered' ? 'This order is delivered' : 'Mark as delivered'}
            </label>
          </div>
          
          <button
            onClick={() => handleDeleteOrder(order._id)}
            className='mt-2 ml-2 p-2 rounded bg-red-500 text-white'
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
