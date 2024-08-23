import { NextResponse } from "next/server"
import Product from '@/backend/models/Product'

export async function GET(request, {params}) {
    
    const {sku} = params
    try {
        
        const product = await Product.findOne({productSKU: sku})
        
        
        if(product) {
            
            const prvProduct =  {
                productSKU: product.productSKU,
                productName: product.productName,
                price: product.price,
            }
            return NextResponse.json(prvProduct)
        }
        return NextResponse.json({message: 'Not Found Product'})
    } catch (error) {
        
        return NextResponse.json({message: error.message})
    }
}

export async function POST(request, {params}) {
    const {sku} = params
    const {productName, price} = await request.json()
    try {
        
        const product = await Product.findOneAndUpdate({productSKU: sku}, {productName, price})
        
        if(product) {
            
            const prvProduct =  {
                productSKU: product.productSKU,
                productName: product.productName,
                price: product.price,
            }
            return NextResponse.json(prvProduct)
        }
        return NextResponse.json({message: 'NO Product Found'})
    } catch (error) {
        
        return NextResponse.json({message: error.message})
    }
}

export async function DELETE(request, {params}) {
    
    const {productSKU} = await request.json()
    try {
        
        const product = await Product.findOneAndDelete({productSKU: productSKU})
        
        
        if(product) {
            // ส่งข้อมูลสินค้าทั้งหมดออกไป
            const prvProduct =  {
                productSKU: product.productSKU,
                productName: product.productName,
                price: product.price,
            }
            return NextResponse.json(prvProduct)
        }
        return NextResponse.json({message: 'NO Product Deleted'})
    } catch (error) {
        
        return NextResponse.json({message: error.message})
    }
}
