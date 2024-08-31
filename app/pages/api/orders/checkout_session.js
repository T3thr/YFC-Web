import nc from "next-connect";
import mongodbConnect from "@/backend/lib/mongodb";
import onError from "@/backend/middlewares/errors";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import { checkoutSession } from "@/backend/controllers/orderControllers";

const handler = nc({ onError });

mongodbConnect();

handler.use(isAuthenticatedUser).post(checkoutSession);

export default handler;