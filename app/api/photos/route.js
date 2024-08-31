// app/api/photos/route.js
import { NextResponse } from 'next/server';
import cloudinary from '@/backend/lib/cloudinary';
import Product from '@/backend/models/Product';
import Photo from '@/backend/models/Photo';

export async function POST(request) {
    const formData = await request.formData();
    const sku = formData.get('sku');
    const file = formData.get('files');

    if (!file || !sku) {
        return NextResponse.json({ errMsg: 'Missing required fields' });
    }

    try {
        const uploadedImage = await cloudinary.uploader.upload(file.path, {
            folder: `products/${sku}`,
        });

        const photo = await Photo.create({
            public_id: uploadedImage.public_id,
            secure_url: uploadedImage.secure_url,
        });

        const product = await Product.findOneAndUpdate(
            { productSKU: sku },
            { $push: { images: photo._id } },
            { new: true }
        ).populate('images');

        return NextResponse.json({ msg: 'Image uploaded successfully', product });
    } catch (error) {
        return NextResponse.json({ errMsg: 'Error uploading image: ' + error.message });
    }
}
