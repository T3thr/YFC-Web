"use client";

import React from 'react';
import OrderList from '@/components/orders/OrderList';

const UserOrdersPage = () => {
  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4'>Your Orders</h2>
      <OrderList />
    </div>
  );
};

export default UserOrdersPage;
