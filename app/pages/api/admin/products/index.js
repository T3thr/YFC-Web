import nc from "next-connect";
import mongodbConnect from "@/backend/lib/mongodb";
import onError from "@/backend/middlewares/errors";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "@/backend/middlewares/auth";
import { newProduct } from "@/backend/controllers/productControllers";

const handler = nc({ onError });

mongodbConnect();

handler.use(isAuthenticatedUser, authorizeRoles("admin")).post(newProduct);

export default handler;