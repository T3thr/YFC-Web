// app/api/auth/update-profile/route.js
import { NextResponse } from 'next/server';
import { updateUser } from '@/context/AuthContext'; // Replace with your actual user update logic

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const image = formData.get('image');
    
    const updatedUser = await updateUser({ name, email, image }); // Handle user update

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
