import jwt from "jsonwebtoken";

const withAuth = (handler) => {
  return async (req, res) => {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = accessToken.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const payload = jwt.verify(
      token,
      process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET,
    );

    if (!payload) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.payload = payload;

    return handler(req, res);
  };
};

export default withAuth;
