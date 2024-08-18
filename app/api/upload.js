import formidable from 'formidable';
import cloudinary from 'cloudinary';
import fs from 'fs';
import path from 'path';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    
    form.uploadDir = path.join(process.cwd(), '/public/tmp');
    form.keepExtensions = true;
    
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: 'Failed to upload image' });
        return;
      }

      try {
        const result = await cloudinary.v2.uploader.upload(files.file[0].filepath);
        fs.unlinkSync(files.file[0].filepath); // Clean up the temporary file
        res.status(200).json({ url: result.secure_url });
      } catch (error) {
        res.status(500).json({ error: 'Failed to upload image' });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
