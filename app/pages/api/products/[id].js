import nc from "next-connect";
import mongodbConnect from "@/backend/config/mongodb";
import { getProduct } from "@/backend/controllers/productControllers";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });

mongodbConnect();

handler.get(getProduct);

export default handler;