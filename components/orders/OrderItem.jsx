// components/OrderItem.jsx
import React from 'react';

export default function OrderItem({ order }) {
  return (
    <div className='order-item'>
      <h3>Order #{order._id}</h3>
      <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
      <p>Total: ${order.totalAmount}</p>
      <p>Shipping: ${order.shippingCost}</p>
      <ul>
        {order.cartItems.map((item, index) => (
          <li key={index}>
            {item.productName} - {item.quantity} x ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
