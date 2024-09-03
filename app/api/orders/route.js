import mongodbConnect from "@/backend/lib/mongodb"; // Ensure this path is correct
import Order from "@/backend/models/Order";

export async function POST(req) {
    try {
        await mongodbConnect();
        const { userId, cartItems } = await req.json();
        
        if (!userId || !cartItems) {
            return new Response("Invalid data", { status: 400 });
        }

        // Calculate the total amount and shipping cost here
        const amountWithoutShip = cartItems.reduce(
            (acc, item) => acc + item.quantity * item.price,
            0
        );
        const shippingCost = 100; // Example shipping cost
        const totalAmount = amountWithoutShip + shippingCost;

        // Create a new order
        const order = await Order.create({
            userId,
            products: cartItems.map(item => ({
                productId: item.product,
                quantity: item.quantity,
                price: item.price
            })),
            totalAmount,
            shippingCost,
            status: 'Pending',
        });

        return new Response(JSON.stringify({ success: true, order }), { status: 201 });
    } catch (error) {
        console.error("Failed to place order:", error);
        return new Response("Failed to place order", { status: 500 });
    }
}
