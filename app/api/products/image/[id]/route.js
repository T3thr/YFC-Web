import { NextResponse } from 'next/server';
import mongodbConnect from '@/lib/mongodb';
import { GridFSBucket, ObjectId } from 'mongodb';
import mongoose from 'mongoose';

export async function GET(req, { params }) {
    try {
        await mongodbConnect();

        const db = mongoose.connection.db;
        const bucket = new GridFSBucket(db, { bucketName: 'images' });

        const imageId = new ObjectId(params.id);

        const downloadStream = bucket.openDownloadStream(imageId);

        const chunks = [];
        for await (const chunk of downloadStream) {
            chunks.push(chunk);
        }

        const imageBuffer = Buffer.concat(chunks);

        return new NextResponse(imageBuffer, {
            headers: {
                'Content-Type': 'image/jpeg', // Adjust the MIME type according to your needs
                'Content-Length': imageBuffer.length,
            },
        });
    } catch (error) {
        console.error('Error fetching image:', error.message);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
