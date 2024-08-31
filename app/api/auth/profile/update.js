import nc from "next-connect";
import mongodbConnect from "@/backend/config/mongodb";
import { updateProfile } from "@/backend/controllers/authControllers";
import onError from "@/backend/middlewares/errors";
import upload from "@/backend/lib/multer";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";

const handler = nc({ onError });

mongodbConnect();

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadMiddleware = upload.array("image");

handler.use(isAuthenticatedUser, uploadMiddleware).put(updateProfile);

export default handler;