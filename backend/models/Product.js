import mongoose, {Schema} from "mongoose";

const productSchema = new Schema({
    productSKU: { type: String, required: [true , 'กรุณาใส่ รหัส SKU กับกับสินค้า'], unique: true },
    productName: { type: String, required: [true , 'กรุณาใส่ชื่อสินค้า']},
    price: { type: Number, default: 0},
    images : [
    {    
        _id: mongoose.Schema.Types.ObjectId,
        url: {type: String,required: true,},
        public_id: { type: String },
        secure_url: { type: String }, 
    }],
    category : { type: String,
        enum: {
            values: [  "เมนูแนะนำ", "โปรโมชัน" , "ไก่ๆๆ" , "ของทานเล่น" , "เครื่องดื่ม" , "ของสด",  ],
            message: "{values}, ไม่ใช่หมวดหมู่ที่รองรับ"
        }
    },
    stock: { type: Number, default: 1},
    status: { type: String,
        enum: {
            values: ["active", "inactive"],
            message: "{values} ไม่ใช่สถานะที่รองรับ"
        },
        default: "active"
    },
    rating: { type: Number, default: 0},
    review: {
        rating: { type: Number, },
        comment: { type: String, },
        createAt: { type: Date, default: Date.now }
    },
    note: String
    }, 
    { timestamps: true }
)

const Product = mongoose.models?.Product || mongoose.model("Product", productSchema)
export default Product