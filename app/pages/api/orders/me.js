import nc from "next-connect";
import mongodbConnect from "@/backend/lib/mongodb";
import onError from "@/backend/middlewares/errors";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import { myOrders } from "@/backend/controllers/orderControllers";

const handler = nc({ onError });

mongodbConnect();

handler.use(isAuthenticatedUser).get(myOrders);

export default handler;