import mongodbConnect from "@/backend/lib/mongodb";
import Order from "@/backend/models/Order";
import { NextResponse } from "next/server";

export async function POST(req) {
    await mongodbConnect();
    const { user,orderItems, amountWithoutShip,totalAmount, shippingCost , status } = await req.json();
    try {
        const newOrder = new Order({
            user,
            orderItems,
            amountWithoutShip,
            totalAmount,
            shippingCost,
            status
        });

        await newOrder.save();
        return NextResponse.json(newOrder, { status: 201 });
    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json({ message: 'Failed to create order.' }, { status: 500 });
    }
}

// Fetch orders for a specific user by email or all orders for admin
export async function GET(req) {
    await mongodbConnect();
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get('userEmail');
    
    try {
        const orders = userEmail
            ? await Order.find({ 'user.email': userEmail }) // User orders
            : await Order.find({}); // Admin orders
        return NextResponse.json(orders, { status: 200 });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json({ message: 'Failed to fetch orders.' }, { status: 500 });
    }
}

// Update order status (for admin)
export async function PUT(req) {
    await mongodbConnect();
    const { orderId, status } = await req.json();
    try {
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
        return NextResponse.json(updatedOrder, { status: 200 });
    } catch (error) {
        console.error('Error updating order:', error);
        return NextResponse.json({ message: 'Failed to update order.' }, { status: 500 });
    }
}

// Delete order (for admin)
export async function DELETE(req) {
    await mongodbConnect();
    const { orderId } = await req.json();
    try {
        await Order.findByIdAndDelete(orderId);
        return NextResponse.json({ message: 'Order deleted successfully.' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting order:', error);
        return NextResponse.json({ message: 'Failed to delete order.' }, { status: 500 });
    }
}