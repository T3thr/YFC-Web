// backend/models/Order.js

import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    user: {
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        id: {
          type: String,
          required: true,
        },
        role: { type: String, required: false },
      },
  orderItems: [
    {
        product: { type: String, required: true }, // Assuming this is product SKU or similar
        productName: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        images: [{ type: String }]
    },
  ],
  amountWithoutShip: { type: Number, required: true },
  shippingCost: { type: Number, required: true, default: 100 },
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'pending'},
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
