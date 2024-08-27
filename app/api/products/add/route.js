import mongodbConnect from "@/backend/lib/mongodb";
import Product from "@/backend/models/Product";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const {
            productSKU,
            productName,
            price,
            images,
            category,
            stock,
            status,
            rating,
            review,
            note
        } = await request.json();
        
        await mongodbConnect();
        
        const product = await Product.create({
            productSKU: productSKU.trim(),
            productName,
            price,
            images,
            category,
            stock,
            status,
            rating,
            review,
            note
        });
        
        const productMap = {
            _id: product._id,
            productSKU: product.productSKU,
            productName: product.productName,
            price: product.price,
            images: product.images,
            category: product.category,
            stock: product.stock,
            status: product.status,
            rating: product.rating,
            review: product.review,
            note: product.note
        };
        
        return NextResponse.json(productMap);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
