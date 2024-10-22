// components/OrderItem.jsx
import React from 'react';

export default function OrderItem({ order, isAdmin, onUpdateStatus, onDelete }) {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(order._id);
    }
  };

  return (
    <div
      className={`border rounded-lg p-4 mb-4 shadow-lg ${
        order.status === 'delivered' ? 'bg-green-100' : 'bg-white'
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
      <p>Status: {order.status}</p>
      {isAdmin && (
        <div className='mt-4'>
          <button
            className={`px-2 py-1 rounded mr-2 ${
              order.status === 'delivered' ? 'bg-red-500' : 'bg-blue-500'
            } text-white`}
            onClick={() => {
              const newStatus = order.status === 'delivered' ? 'undelivered' : 'delivered';
              onUpdateStatus(order._id, newStatus);
            }}
          >
            {order.status === 'delivered' ? 'Mark as Undelivered' : 'Mark as Delivered'}
          </button>
          <button
            className='bg-red-500 text-white px-2 py-1 rounded'
            onClick={handleDelete}
          >
            Delete Order
          </button>
        </div>
      )}
    </div>
  );
}
