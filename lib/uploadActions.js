'use server'
import path from 'path'
import fs from 'fs/promises'
import { v4 as uuidv4 } from 'uuid'
import os from 'os'
import cloudinary from 'cloudinary'
import { revalidatePath } from 'next/cache'
import Photo from "@/models/Photo"

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

async function savePhotosToLocal(formData){
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

async function uploadPhotosToCloudinary(newFiles){
    const multiplePhotosPromise = newFiles.map(file => (
        cloudinary.v2.uploader.upload(file.filepath, { folder: 'nextjs_upload'})
    ))

    return await Promise.all(multiplePhotosPromise)
}

const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
}

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
        const newPhotos = photos.map(photo => {
            const newPhoto = new Photo({public_id: photo.public_id , secure_url:photo.secure_url})
            return newPhoto;
        })

        await Photo.insertMany(newPhotos)

        revalidatePath('/')
        return { msg: 'Upload Success'}

    } catch (error) {
        return { errMsg: error.message }
    }
}

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

export async function revalidate(path) {
    revalidatePath(path)
}