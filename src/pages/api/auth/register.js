import bcrypt from "bcrypt";
import db from "../../../lib/db";
import User from "../../../models/user";

export default async function handler(req, res) {
  const { method } = req;
  await db();
  switch (method) {
    case "POST":
      const email = await User.findOne({ email: req.body.email });
      if (!email) {
        req.body.password = await bcrypt.hash(req.body.password, 12);
        const createUser = await User.create({
          email: req.body.email,
          password: req.body.password,
        });
        return res.status(200).json(createUser);
      }
      if (email) {
        return res.status(405).json({ message: "Email already exist" });
      }

    default:
      return res
        .status(405)
        .json({ message: `Method ${req.method} not allowed` });
  }
}
