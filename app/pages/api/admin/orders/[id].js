import nc from "next-connect";
import mongodbConnect from "@/backend/lib/mongodb";
import onError from "@/backend/middlewares/errors";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "@/backend/middlewares/auth";
import {
  deleteOrder,
  getOrder,
  updateOrder,
} from "@/backend/controllers/orderControllers";

const handler = nc({ onError });

mongodbConnect();

handler.use(isAuthenticatedUser, authorizeRoles("admin")).get(getOrder);
handler.use(isAuthenticatedUser, authorizeRoles("admin")).put(updateOrder);
handler.use(isAuthenticatedUser, authorizeRoles("admin")).delete(deleteOrder);

export default handler;