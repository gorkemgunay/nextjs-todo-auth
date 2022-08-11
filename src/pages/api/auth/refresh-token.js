import Cookies from "cookies";
import jwt from "jsonwebtoken";
import User from "../../../models/user";
import db from "../../../lib/db";

export default async function handler(req, res) {
  const { method } = req;

  await db();

  switch (method) {
    case "GET":
      const cookies = new Cookies(req, res);
      const refreshToken = cookies.get("uid");

      if (!refreshToken) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const uid = jwt.verify(
        refreshToken,
        process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET
      );

      if (!uid) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const userId = uid.userId;
      const user = await User.findById(userId).select("+refreshToken");

      const newAccessToken = jwt.sign(
        { userId: user._id },
        process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      const newRefreshToken = jwt.sign(
        { userId: user._id },
        process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );
      user.refreshToken = newRefreshToken;
      await user.save();
      cookies.set("uid", newRefreshToken, {
        httpOnly: true,
      });
      return res.status(200).json({ accessToken: newAccessToken });

    default:
      return res
        .status(405)
        .json({ message: `Method ${req.method} not allowed` });
  }
}
