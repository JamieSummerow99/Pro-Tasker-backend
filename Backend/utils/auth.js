import dotenv from "dotenv";
dotenv.config();

// JWT authentication functions//
//the pass code from .env
import jwt from "jsonwebtoken";


const secret = process.env.JWT_SECRET;
//expiration in 900 hours
const expiration ="900h";


export function signToken({ username, email, _id }) {
  const payload = { username, email, _id };

  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}

export function authMiddleware(req, res, next) {
  let token = req.body?.token || req.query?.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
  }

  if(!token) {
    return res.status(401).json({ message: " Turn around and log in "});
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch {
    console.log("Invalid token");
    return res.status(401).json({ message: "Bad token."});
  }

  next()

}


