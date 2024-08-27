// pages/api/photos.js

import { uploadPhoto, getAllPhotos, deletePhoto } from '@/backend/lib/uploadActions';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const photos = await getAllPhotos();
        return NextResponse.json(photos);
    } catch (error) {
        return NextResponse.json({ errMsg: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const formData = await request.formData();
        const response = await uploadPhoto(formData);

        if (response?.errMsg) {
            return NextResponse.json({ errMsg: response.errMsg }, { status: 400 });
        }
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ errMsg: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { public_id } = await request.json();
        const response = await deletePhoto(public_id);

        if (response?.errMsg) {
            return NextResponse.json({ errMsg: response.errMsg }, { status: 400 });
        }
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ errMsg: error.message }, { status: 500 });
    }
}
