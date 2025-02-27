// app/admin/orders/page.js
import React from 'react';
import AdminOrderList from '@/components/orders/AdminOrderList';

export default function AdminOrderPage() {
  return (
    <div className='container mx-auto p-4'>
    <h2 className='text-2xl font-bold mb-4'>Manage All Orders</h2>
      <AdminOrderList />
    </div>
  );
}
