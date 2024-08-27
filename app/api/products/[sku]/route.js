import { NextResponse } from "next/server";
import Product from '@/backend/models/Product';

// GET: Retrieve a product by SKU
export async function GET(request, { params }) {
    const { sku } = params;
    try {
        const product = await Product.findOne({ productSKU: sku });
        if (product) {
            const productData = {
                productSKU: product.productSKU,
                productName: product.productName,
                price: product.price,
                category: product.category, // New field
                stock: product.stock // New field
            };
            return NextResponse.json(productData);
        }
        return NextResponse.json({ message: 'Product Not Found' });
    } catch (error) {
        return NextResponse.json({ message: error.message });
    }
}

// POST: Update a product by SKU
export async function POST(request, { params }) {
    const { sku } = params;
    const { productName, price, category, stock } = await request.json();
    try {
        const updatedProduct = await Product.findOneAndUpdate(
            { productSKU: sku },
            { productName, price, category, stock }, // Include new fields
            { new: true }
        );
        if (updatedProduct) {
            const productData = {
                productSKU: updatedProduct.productSKU,
                productName: updatedProduct.productName,
                price: updatedProduct.price,
                category: updatedProduct.category, // New field
                stock: updatedProduct.stock // New field
            };
            return NextResponse.json(productData);
        }
        return NextResponse.json({ message: 'Product Not Found' });
    } catch (error) {
        return NextResponse.json({ message: error.message });
    }
}

// DELETE: Delete a product by SKU
export async function DELETE(request, { params }) {
    const { sku } = params;
    try {
        const deletedProduct = await Product.findOneAndDelete({ productSKU: sku });
        if (deletedProduct) {
            const productData = {
                productSKU: deletedProduct.productSKU,
                productName: deletedProduct.productName,
                price: deletedProduct.price,
                category: deletedProduct.category, // New field
                stock: deletedProduct.stock // New field
            };
            return NextResponse.json(productData);
        }
        return NextResponse.json({ message: 'No Product Deleted' });
    } catch (error) {
        return NextResponse.json({ message: error.message });
    }
}
