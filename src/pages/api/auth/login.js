import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Cookies from "cookies";
import db from "../../../lib/db";
import User from "../../../models/user";

export default async function handler(req, res) {
  const { method } = req;
  await db();

  switch (method) {
    case "POST":
      const user = await User.findOne({ email: req.body.email })
        .select("+password")
        .select("+refreshToken");

      if (user) {
        const passwordCompare = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (passwordCompare) {
          const accessToken = jwt.sign(
            { userId: user._id },
            process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
          );

          const refreshToken = jwt.sign(
            { userId: user._id },
            process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET,
            { expiresIn: "7d" }
          );
          user.refreshToken = refreshToken;
          await user.save();
          const cookies = new Cookies(req, res);
          cookies.set("uid", refreshToken, {
            httpOnly: true,
          });
          return res.status(200).json({ accessToken });
        }

        return res.status(401).json({ message: "Email or password wrong" });
      }
      return res.status(404).json({ message: "User not found" });
    default:
      return res
        .status(405)
        .json({ message: `Method ${req.method} not allowed` });
  }
}
