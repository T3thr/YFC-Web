import { getSession } from "next-auth/react";
import mongodbConnect from "@/backend/lib/mongodb";
import User from "@/backend/models/User";

const handler = async (req, res) => {
  try {
    await mongodbConnect();

    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await User.findById(session.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default handler;
