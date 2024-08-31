import { NextResponse } from 'next/server';
import mongodbConnect from '@/backend/lib/mongodb'; // Assuming you have a connection utility
import Product from '@/backend/models/Product'; // Path to your Product model
import cloudinary from 'cloudinary';
import multer from 'multer';
import { NextRequest } from 'next/server';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

export async function POST(req) {
  try {
    const { sku } = req.query;
    const formData = await req.formData();
    const files = formData.getAll('images'); // Get all images

    // Connect to the database
    await mongodbConnect();

    // Find the product
    const product = await Product.findOne({ productSKU: sku });
    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    // Upload images to Cloudinary and update the product
    const uploadedImages = [];
    for (const file of files) {
      const result = await cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
        if (error) {
          throw new Error('Cloudinary upload error');
        }
        return result;
      }).end(file.buffer);

      uploadedImages.push({
        url: result.secure_url,
        public_id: result.public_id,
        secure_url: result.secure_url,
      });
    }

    // Update the product with new images
    product.images.push(...uploadedImages);
    await product.save();

    return NextResponse.json({ message: 'Images uploaded successfully', images: uploadedImages });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
