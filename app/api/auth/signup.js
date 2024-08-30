import User from "@/models/User";
import mongodbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  await mongodbConnect();

  const { name, email, password } = await req.json();

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { message: "Email already registered" },
      { status: 400 }
    );
  }

  // Create new user
  const user = await User.create({ name, email, password });

  return NextResponse.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
}
