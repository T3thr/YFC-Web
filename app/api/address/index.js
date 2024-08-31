import nc from "next-connect";
import mongodbConnect from "@/backend/lib/mongodb";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";
import Address from "@/backend/models/Address";

const handler = nc({ onError });

mongodbConnect();

handler.use(isAuthenticatedUser).post(async (req, res) => {
  try {
    const { street, city, state, zipCode, phoneNo, country } = req.body;

    // Validate fields
    if (!street || !city || !state || !zipCode || !phoneNo || !country) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Create new address
    const address = await Address.create({
      street,
      city,
      state,
      zipCode,
      phoneNo,
      country,
      user: req.user._id, // Assuming the user is authenticated and `req.user` contains the user data
    });

    res.status(201).json({
      success: true,
      address,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default handler;
