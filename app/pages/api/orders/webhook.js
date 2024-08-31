import nc from "next-connect";
import mongodbConnect from "@/backend/lib/mongodb";
import onError from "@/backend/middlewares/errors";
import { webhook } from "@/backend/controllers/orderControllers";

const handler = nc({ onError });

mongodbConnect();

export const config = {
  api: {
    bodyParser: false,
  },
};

handler.post(webhook);

export default handler;