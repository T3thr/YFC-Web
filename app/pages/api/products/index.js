import nc from "next-connect";
import mongodbConnect from "@/backend/lib/mongodb";
import { getProducts } from "@/backend/controllers/productControllers";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });

mongodbConnect();

handler.get(getProducts);

export default handler;