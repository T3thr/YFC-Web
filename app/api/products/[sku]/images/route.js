// /api/products/[sku]/images/route.js

import { NextResponse } from "next/server";
import Product from '@/backend/models/Product';
import cloudinary from '@/backend/lib/cloudinary'; // Cloudinary configuration

// POST: Upload an image for a product SKU
export async function POST(request, { params }) {
    const { sku } = params;
    const formData = await request.formData();
    const file = formData.get('files');

    try {
        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(file, {
            folder: `products/${sku}`, // Save image in a folder named after the SKU
        });

        const updatedProduct = await Product.findOneAndUpdate(
            { productSKU: sku },
            {
                $push: { images: { url: result.secure_url, public_id: result.public_id, secure_url: result.secure_url } }
            },
            { new: true }
        );

        if (updatedProduct) {
            return NextResponse.json({ message: 'Image uploaded successfully', data: updatedProduct });
        }
        return NextResponse.json({ message: 'Product Not Found' });
    } catch (error) {
        return NextResponse.json({ message: error.message });
    }
}

// DELETE: Delete an image for a product SKU
export async function DELETE(request, { params }) {
    const { sku } = params;
    const { imageId } = await request.json();

    try {
        // Delete image from Cloudinary
        await cloudinary.uploader.destroy(imageId);

        const updatedProduct = await Product.findOneAndUpdate(
            { productSKU: sku },
            {
                $pull: { images: { public_id: imageId } }
            },
            { new: true }
        );

        if (updatedProduct) {
            return NextResponse.json({ message: 'Image deleted successfully', data: updatedProduct });
        }
        return NextResponse.json({ message: 'Product Not Found' });
    } catch (error) {
        return NextResponse.json({ message: error.message });
    }
}
