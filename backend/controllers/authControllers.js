// backend/controllers/authControllers.js

import User from "../models/User";  // Corrected path
import bcrypt from "bcryptjs";
import ErrorHandler from "../utils/errorHandler";

// Hashing password before saving user
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      avatar: {
        url: "/images/default.png", // Set default avatar
      },
    });

    res.status(201).json({
      success: true,
      user,  // Return the user data
    });
  } catch (error) {
    return next(new ErrorHandler("Failed to register user", 500));
  }
};
