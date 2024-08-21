import mongoose, {Schema} from "mongoose";
// กำหนด Schema สำหรับโมเดล Product
const productSchema = new Schema(
    {
        productSKU: { type: String, required: true, unique: true },
        productName: { type: String, required: true },
        price: { type: Number, default: 0 },
        description: { type: String },
        public_id: String,
        secure_url: String,
        note: String
    },
    {
        timestamps: true
    }
);
// สร้างโมเดล โดยตรวจสอบว่าถ้ายังไม่มีโมเดล Product ให้สร้างขึ้นใหม่
const Product = mongoose.models?.Product || mongoose.model("Product", productSchema)
export default Product