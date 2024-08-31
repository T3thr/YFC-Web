import nc from "next-connect";
import mongodbConnect from "@/backend/lib/mongodb";
import onError from "@/backend/middlewares/errors";
import upload from "@/backend/utils/multer";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "@/backend/middlewares/auth";
import { uploadProductImages } from "@/backend/controllers/productControllers";

const handler = nc({ onError });

mongodbConnect();

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadMiddleware = upload.array("image");

handler
  .use(uploadMiddleware, isAuthenticatedUser, authorizeRoles("admin"))
  .post(uploadProductImages);

export default handler;