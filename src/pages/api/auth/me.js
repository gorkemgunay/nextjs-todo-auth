import db from "../../../lib/db";
import withAuth from "../../../middlewares/withAuth";
import User from "../../../models/user";

async function handler(req, res) {
  const { method } = req;
  await db();

  switch (method) {
    case "GET":
      const { userId } = req.payload;
      const user = await User.findById(userId);
      if (user) {
        return res.status(200).json(user);
      }
      return res.status(401).json({ message: "Unauthorized" });
    default:
      return res
        .status(405)
        .json({ message: `Method ${req.method} not allowed` });
  }
}

export default withAuth(handler);
