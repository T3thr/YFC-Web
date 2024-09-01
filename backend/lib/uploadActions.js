'use server'
import path from 'path'
import fs from 'fs/promises'
import { v4 as uuidv4 } from 'uuid'
import os from 'os'
import cloudinary from 'cloudinary'
import { revalidatePath } from 'next/cache'
import Photo from "@/backend/models/Photo"
import Product from '@/backend/models/Product';
import mongodbConnect from '@/backend/lib/mongodb'

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

export async function savePhotosToLocal(formData){
    const files = formData.getAll('files')
    
    const multipleBuffersPromise = files.map(file => (
        file.arrayBuffer()
            .then(data => {
                const buffer = Buffer.from(data)
                const name = uuidv4()
                const ext = file.type.split("/") [1]

                // ตัว test deploy ใน vercel ไม่ได้
                //const uploadDir = path.join(process.cwd(), "public" , file.name )

                const tempdir = os.tmpdir()
                const uploadDir = path.join(tempdir, `${name}.${ext}`) // ทำงานใน vercel ได้
                //console.log(tempdir)

                //console.log(uploadDir)
                fs.writeFile(uploadDir, buffer)

                return { filepath: uploadDir, filename: file.name}
            })
    ))

    return await Promise.all(multipleBuffersPromise)
}

export async function uploadPhotosToCloudinary(newFiles){
    const multiplePhotosPromise = newFiles.map(file => (
        cloudinary.v2.uploader.upload(file.filepath, { folder: 'nextjs_upload'})
    ))

    return await Promise.all(multiplePhotosPromise)
}

const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
}
{/*}
export async function uploadPhoto(formData){
    try {
        //save ลงในโฟลเดอร์ temp
        const newFiles = await savePhotosToLocal(formData)

        // upload รูปลง cloudinary เมื่อรูปเซฟใน temp
        const photos = await uploadPhotosToCloudinary(newFiles)

        // เมื่อ upload เสร็จจะลบไฟล์ใน temp
        newFiles.map(file => fs.unlink( file.filepath ))

        // delay ประมาณ 2 วิ
        // จากนั้น call getAllPhoto()
        //await delay(2000)

        // บันทึกรูปลง mongo
        // Save image info to MongoDB
        const newPhotos = photos.map(photo => {
            const newPhoto = new Photo({
                public_id: photo.public_id,
                secure_url: photo.secure_url
            });
            return newPhoto;
        });

        await Photo.insertMany(newPhotos)
        
        // Return photo data for the frontend
        return {
            data: photos.map(photo => ({
                url: photo.secure_url, // or any other URL field
                public_id: photo.public_id
            })),
            msg: 'Upload Success'
        };
        //revalidatePath('/')
        //return { msg: 'Upload Success'}

    } catch (error) {
        return { errMsg: error.message }
    }
}
*/}
export async function getAllPhotos(){
    try {
        // จาก cloudinary
        //const { resources }= await cloudinary.v2.search.expression(
            //'folder:nextjs_upload/'
        //).sort_by('created_at','desc').max_results(500).execute()

        // จาก mongodb
        const photos = await Photo.find().sort('-createdAt')
        const resources = photos.map(photo => ({...photo._doc, _id: photo._id.toString()}))
        //console.log(result)
        //return { msg: 'Upload Success'}
        return resources

    } catch (error) {
        return { errMsg: error.message }
    }
}

export async function deletePhoto(public_id){
    try {
        await Promise.all ([
            Photo.findOneAndDelete({public_id}),
            cloudinary.v2.uploader.destroy(public_id)
        ])

        revalidate("/")
        return {msg: 'Delete Success!!'};
    } catch (error) {
        return { errMsg: error.message }
    }
}



export async function uploadPhoto(formData, sku) {
    try {
        await mongodbConnect(); // Ensure the database is connected

        // Save to temp directory
        const newFiles = await savePhotosToLocal(formData);

        // Upload to Cloudinary
        const photos = await uploadPhotosToCloudinary(newFiles);

        // Delete temp files
        await Promise.all(newFiles.map(file => fs.unlink(file.filepath)));

        // Prepare new photos for MongoDB
        const newPhotos = photos.map(photo => ({
            public_id: photo.public_id,
            secure_url: photo.secure_url
        }));

        // Fetch the product
        const product = await Product.findOne({ productSKU: sku });

        if (!product) {
            throw new Error('Product not found');
        }

        // Delete old images from Cloudinary
        await Promise.all(product.images.map(img => cloudinary.uploader.destroy(img.public_id)));

        // Update the Product with new images
        await Product.findOneAndUpdate(
            { productSKU: sku },
            { images: newPhotos },
            { new: true }
        );

        // Return photo data for the frontend
        return {
            data: newPhotos,
            msg: 'Upload Success'
        };

    } catch (error) {
        return { errMsg: error.message };
    }
}

export async function uploadImageToCloudinary(filepath) {
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(filepath, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
  
  export async function deleteImageFromCloudinary(publicId) {
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader.destroy(publicId, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
  
export async function revalidate(path) {
    revalidatePath(path)
}
    

