import mongodbConnect from "@/backend/lib/mongodb";
import Order from "@/backend/models/Order";
import { NextResponse } from "next/server";

export async function GET(req) {
    await mongodbConnect();

    try {
        const orders = await Order.find().populate('userId').populate('cartItems.productSKU');
        return new Response(JSON.stringify(orders), { status: 200 });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return new Response('Failed to fetch orders.', { status: 500 });
    }
}

export async function POST(req) {
    await mongodbConnect();
    const { userId, cartItems, totalAmount, shippingCost } = await req.json();

    try {
        const newOrder = new Order({
            userId,
            cartItems,
            totalAmount,
            shippingCost,
        });

        await newOrder.save();
        return new Response(JSON.stringify(newOrder), { status: 201 });
    } catch (error) {
        console.error('Error creating order:', error);
        return new Response('Failed to create order.', { status: 500 });
    }
}