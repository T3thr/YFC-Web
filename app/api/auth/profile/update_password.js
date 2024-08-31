import nc from "next-connect";
import mongodbConnect from "@/backend/config/mongodb";
import { updatePassword } from "@/backend/controllers/authControllers";
import onError from "@/backend/middlewares/errors";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";

const handler = nc({ onError });

mongodbConnect();

handler.use(isAuthenticatedUser).put(updatePassword);

export default handler;