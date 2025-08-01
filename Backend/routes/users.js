import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import verifyJWT from "../middlewares/verifyjwt.js";

dotenv.config();

const secret = process.env.JWT_SECRET;

const expiration = "2h";

const router = express.Router();

router.get("/profile", verifyJWT, async (req, res) => {


  try {
    console.log("req.user", req.user)
    const user = await User.findById(req.user._id);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/:id", verifyJWT, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.patch("/:id", verifyJWT, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", verifyJWT, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // find the user by the email
    const user = await User.findOne({ email: email });
    console.log("USER", user);

    if (!user) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    // compare the password with the hashed password
    const correctPw = await user.isCorrectPassword(password);

    if (!correctPw) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    // create a JWT token
    const payload = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign({ data: payload }, secret, {
      expiresIn: expiration,
    });

    res.json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
