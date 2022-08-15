import db from "../../../lib/db";
import withAuth from "../../../middlewares/withAuth";
import User from "../../../models/user";
import Cookies from "cookies";

async function handler(req, res) {
  const { method } = req;
  await db();

  switch (method) {
    case "POST":
      const { userId } = req.payload;
      const user = await User.findById(userId);
      if (user) {
        user.refreshToken = null;
        await user.save();
        const cookies = new Cookies(req, res);
        cookies.set("uid");

        return res.status(200).json({ message: "Successfully logout" });
      }
      return res.status(401).json({ message: "Unauthorized" });
    default:
      return res
        .status(405)
        .json({ message: `Method ${req.method} not allowed` });
  }
}

export default withAuth(handler);
