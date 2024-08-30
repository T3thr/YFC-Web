// app/api/auth/signup/route.js
import bcrypt from 'bcryptjs';
import User from '@/backend/models/User';
import mongodbConnect from '@/backend/lib/mongodb';

export async function POST(req, res) {
  await mongodbConnect();

  const { name, email, password } = await req.json();

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new Response(JSON.stringify({ error: 'User already exists' }), { status: 400 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the new user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return new Response(JSON.stringify({ success: true, user }), { status: 201 });
}
