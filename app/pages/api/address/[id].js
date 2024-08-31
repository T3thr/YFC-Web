import nc from "next-connect";
import mongodbConnect from "@/backend/lib/mongodb";
import {
  deleteAddress,
  getAddress,
  updateAddress,
} from "@/backend/controllers/addressControllers";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";

import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });

mongodbConnect();

handler.use(isAuthenticatedUser).get(getAddress);
handler.use(isAuthenticatedUser).put(updateAddress);
handler.use(isAuthenticatedUser).delete(deleteAddress);

export default handler;