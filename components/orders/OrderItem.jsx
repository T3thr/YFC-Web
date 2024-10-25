// components/orders/OrderItem.jsx
import React from 'react';

export default function OrderItem({ order }) {

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
    </div>
  );
}
