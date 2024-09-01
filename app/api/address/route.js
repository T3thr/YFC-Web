import mongodbConnect from '@/backend/lib/mongodb';
import Address from '@/backend/models/Address';

export async function POST(req) {
  await mongodbConnect();

  const { street, city, state, zipCode, phoneNo, country, user } = await req.json();

  try {
    const newAddress = await Address.create({
      street,
      city,
      state,
      zipCode,
      phoneNo,
      country,
      user
    });
    return new Response(JSON.stringify(newAddress), { status: 201 });
  } catch (error) {
    console.error("Error creating address:", error);
    return new Response(JSON.stringify({ message: error.message }), { status: 400 });
  }
}