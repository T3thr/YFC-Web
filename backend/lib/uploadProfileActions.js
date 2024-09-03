'use server'
import cloudinary from 'cloudinary';
import fs from 'fs/promises';
import mongodbConnect from '@/backend/lib/mongodb';
import User from '@/backend/models/User';
import savePhotosToLocal from './uploadActions';
import uploadPhotosToCloudinary from './uploadActions';

export async function uploadAvatar(formData, userId) {
  try {
    await mongodbConnect(); // Ensure the database is connected

    // Save to temp directory
    const newFiles = await savePhotosToLocal(formData);

    // Upload to Cloudinary
    const photos = await uploadPhotosToCloudinary(newFiles);

    // Delete temp files
    await Promise.all(newFiles.map(file => fs.unlink(file.filepath)));

    // Prepare new photos for MongoDB
    const newAvatar = {
      public_id: photos[0].public_id,
      secure_url: photos[0].secure_url
    };

    // Fetch the user
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Delete old avatar from Cloudinary if exists
    if (user.avatar?.public_id) {
      await cloudinary.uploader.destroy(user.avatar.public_id);
    }

    // Update the User with new avatar
    user.avatar = newAvatar;
    await user.save();

    // Return avatar data for the frontend
    return {
      data: newAvatar,
      msg: 'Avatar Upload Success'
    };

  } catch (error) {
    return { errMsg: error.message };
  }
}
