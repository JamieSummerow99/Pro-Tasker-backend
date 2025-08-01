import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_SECRET;

export default function verifyJWT(req, res, next) {
  let token = req.headers.authorization || req.body?.token || req.query?.token;
  // Bearer <token>

  if (token) {
    token = token.split(" ").pop().trim();
  }

  if (!token) {
    return res.status(401).json({ message: "No token found!" });
  }

  try {
    // The decoded object will contain the original payload ({ data: { _id, ... } })
    const { data } = jwt.verify(token, secret, { maxAge: "2h" });
    req.user = data;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token!" });
  }
}

// req -> middleware (req.user = data) -> route -> res