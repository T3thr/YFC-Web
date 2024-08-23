import mongodbConnect from "@/backend/lib/mongodb"
import Product from "@/backend/models/Product"
import { NextResponse } from "next/server"

export async function POST(request) {
    try {
        const { productSKU, productName, price } = await request.json()
        await mongodbConnect()
        
        const product = await Product.create({
            productSKU: productSKU.trim(), 
            productName, 
            price
        })
        
        const productMap = {
            _id: product._id,
            productSKU: product.productSKU, 
            productName: product.productName, 
            price: product.price
        }
        return NextResponse.json(productMap)
    } catch (error) {
        return NextResponse.json({error: error.message})
    }
}