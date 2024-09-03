import React from 'react';
import OrderList from '@/components/orders/OrderList';

const OrdersPage = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Order History</h1>
      <OrderList />
    </div>
  );
};

export default OrdersPage;
