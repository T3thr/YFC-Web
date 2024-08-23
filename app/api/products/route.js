import mongodbConnect from "@/backend/lib/mongodb"
import Product from "@/backend/models/Product"
import { NextResponse } from "next/server"

export async function GET(request) {
    
    const headers = new Headers(request.headers)
    
    await mongodbConnect()
    
    const products = await Product.find()
    
    const productsMap = products.map((product) => {
        return {
            productSKU: product.productSKU,
            productName: product.productName,
            price: product.price,
        }
    })
    return NextResponse.json(productsMap, {headers: headers})
}