import nc from "next-connect";
import mongodbConnect from "@/backend/lib/mongodb";
import {
  getAddresses,
  newAddress,
} from "@/backend/controllers/addressControllers";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";

import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });

mongodbConnect();

handler.use(isAuthenticatedUser).get(getAddresses);
handler.use(isAuthenticatedUser).post(newAddress);

export default handler;