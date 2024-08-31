import mongodbConnect from '@/backend/lib/mongodb';
import { GridFSBucket } from 'mongodb';
import formidable from 'formidable';
import fs from 'fs';
import { promisify } from 'util';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req, { params }) {
  const { sku } = params;

  const form = new formidable.IncomingForm();
  const parseForm = promisify(form.parse.bind(form));

  try {
    const { files } = await parseForm(req);
    const file = files.image[0]; // Assuming the file input name is 'image'

    const { db } = await mongodbConnect();

    const bucket = new GridFSBucket(db, {
      bucketName: 'productImages',
    });

    const uploadStream = bucket.openUploadStream(`${sku}_${file.originalFilename}`, {
      contentType: file.mimetype,
    });

    const fileStream = fs.createReadStream(file.filepath);
    fileStream.pipe(uploadStream);

    return new Response(JSON.stringify({ success: true, fileId: uploadStream.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Error uploading image' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
