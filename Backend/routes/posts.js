
import express from "express";
import Post from "../models/Post.js";
import { authMiddleware } from "../utils/auth.js";

const router = new express.Router();

router.use(authMiddleware);
// Middleware to protect routes
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});
// Create a new post
router.post("/", async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      author: req.user._id,
    });
    res.json(newPost);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});
// Update an existing post
router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { ...req.body, author: req.user._id },
      { new: true }
    );
    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});
// Delete a post
router.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});
// Get a single post by ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});
// /api/posts/user/:userId
// Get all posts by a specific user
router.get("/user/:userId", async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.userId });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});
router.createPost = async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      author: req.user._id,
    });
    res.json(newPost);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};



export default router;