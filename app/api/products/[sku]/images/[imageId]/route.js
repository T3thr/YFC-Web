// app/api/products/[sku]/images/[imageId].js

import Product from '@/backend/models/Product';
import { deleteImageFromCloudinary } from '@/backend/lib/cloudinary'; // Your Cloudinary deletion function

export async function DELETE(req, { params }) {
  const { sku, imageId } = params;

  const product = await Product.findOne({ productSKU: sku });
  if (!product) {
    return new Response(JSON.stringify({ message: 'Product not found' }), { status: 404 });
  }

  const imageIndex = product.images.findIndex(img => img._id === imageId);
  if (imageIndex === -1) {
    return new Response(JSON.stringify({ message: 'Image not found' }), { status: 404 });
  }

  await deleteImageFromCloudinary(imageId); // Cloudinary deletion logic
  product.images.splice(imageIndex, 1);
  
  await product.save();

  return new Response(JSON.stringify({ message: 'Image deleted', product }), { status: 200 });
}
