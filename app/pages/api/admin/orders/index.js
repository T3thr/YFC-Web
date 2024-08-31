import nc from "next-connect";
import mongodbConnect from "@/backend/lib/mongodb";
import onError from "@/backend/middlewares/errors";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "@/backend/middlewares/auth";
import { getOrders } from "@/backend/controllers/orderControllers";

const handler = nc({ onError });

mongodbConnect();

handler.use(isAuthenticatedUser, authorizeRoles("admin")).get(getOrders);

export default handler;