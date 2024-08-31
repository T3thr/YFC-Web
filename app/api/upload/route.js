import { NextResponse } from 'next/server';
import cloudinary from '@/backend/lib/cloudinary'; // Assuming you have a Cloudinary setup
import Product from '@/backend/models/Product'; // Import your Product model
import Photo from '@/backend/models/Photo';

export async function POST(req, { params }) {
    const { sku } = params;
    const formData = new FormData();
    formData.append('files', req.body.files);

    try {
        const uploadResponse = await cloudinary.v2.uploader.upload_stream((error, result) => {
            if (error) throw new Error('Upload failed');
            return result;
        }, { resource_type: 'image' });

        const newPhoto = new Photo({
            public_id: uploadResponse.public_id,
            secure_url: uploadResponse.secure_url,
        });

        await newPhoto.save();

        await Product.findOneAndUpdate(
            { productSKU: sku },
            { $push: { images: newPhoto } },
            { new: true }
        );

        return NextResponse.json({ msg: 'Upload successful' });
    } catch (error) {
        return NextResponse.json({ errMsg: error.message });
    }
}
