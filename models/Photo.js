import { Schema , model , models} from 'mongoose'

const photoSchema = new Schema({
    public_id: { type: String },
    secure_url: { type: String },
}, { timestamps: true})

const Photo = models?.photos || model('photos', photoSchema)

export default Photo;