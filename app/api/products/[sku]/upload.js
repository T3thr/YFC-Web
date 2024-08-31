import { NextResponse } from 'next/server';
import connectDB from '@/lib/connectDB';
import Photo from '@/models/Photo';
import cloudinary from 'cloudinary';
import formidable from 'formidable';
import fs from 'fs';

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req, { params }) {
  try {
    const form = new formidable.IncomingForm();
    form.uploadDir = './public/uploads';
    form.keepExtensions = true;

    const data = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const file = data.files.file[0];
    const result = await cloudinary.v2.uploader.upload(file.path);

    const newPhoto = new Photo({
      public_id: result.public_id,
      secure_url: result.secure_url,
    });

    await newPhoto.save();

    fs.unlinkSync(file.path);

    return NextResponse.json({ success: true, message: 'Image uploaded successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Image upload failed' });
  }
}
