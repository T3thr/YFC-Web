import nc from "next-connect";
import dbConnect from "@/backend/lib/mongodb";
import { newProduct } from "@/backend/controllers/productControllers";

const handler = nc();

dbConnect();

handler.post(newProduct);

export default handler;