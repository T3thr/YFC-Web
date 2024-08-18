// /api/products/[sku]/route.js
import mongodbConnect from "@/lib/mongodb"
import Product from "@/models/Product"
import { NextResponse } from "next/server"

export async function POST(request) {
    try {
        const { productSKU, productName, price, imageUrl } = await request.json()
        await mongodbConnect()
        
        const product = await Product.findOneAndUpdate(
            { productSKU: productSKU.trim() },
            { productName, price, imageUrl }, // Update with imageUrl
            { new: true, upsert: true } // Update if exists, create if not
        )
        
        const productMap = {
            _id: product._id,
            productSKU: product.productSKU, 
            productName: product.productName, 
            price: product.price,
            imageUrl: product.imageUrl // Include imageUrl in the response
        }
        return NextResponse.json(productMap)
    } catch (error) {
        return NextResponse.json({error: error.message})
    }
}
