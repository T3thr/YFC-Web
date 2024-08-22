import { NextResponse } from 'next/server';
import Product from '@/models/Product';
import mongodbConnect from '@/lib/mongodb';
import { GridFSBucket, ObjectId } from 'mongodb';

export async function POST(req) {
    try {
        // Connect to the MongoDB database
        await mongodbConnect();

        // Parse form data from the request
        const formData = await req.formData();
        const productSKU = formData.get('productSKU');
        const productName = formData.get('productName');
        const price = parseFloat(formData.get('price'));
        const imageFile = formData.get('image'); // assuming the image input field name is 'image'
        const note = formData.get('note');

        let imagePath = '';

        if (imageFile && imageFile.size > 0) {
            const db = mongoose.connection.db;

            // Create a GridFS bucket
            const bucket = new GridFSBucket(db, { bucketName: 'images' });

            // Generate a unique file ID
            const fileId = new ObjectId();

            // Upload the image to GridFS
            const uploadStream = bucket.openUploadStreamWithId(fileId, imageFile.name, {
                contentType: imageFile.type,
            });

            // Convert the image file into a stream and pipe it to the GridFS upload stream
            const stream = imageFile.stream();
            stream.pipe(uploadStream);

            await new Promise((resolve, reject) => {
                uploadStream.on('error', reject);
                uploadStream.on('finish', resolve);
            });

            imagePath = fileId.toString(); // Store the file ID in the imagePath field
        }

        // Create a new product with the received data
        const newProduct = new Product({
            productSKU,
            productName,
            price,
            imagePath,
            note,
        });

        // Save the product to the database
        await newProduct.save();

        return NextResponse.json({ success: true, message: 'Product added successfully!' }, { status: 201 });
    } catch (error) {
        console.error('Error adding product:', error.message);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
