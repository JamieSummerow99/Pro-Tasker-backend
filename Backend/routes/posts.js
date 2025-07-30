import express from "express";
import Post from "../models/Post.js";
import { authMiddleware } from "../utils/auth.js";

const router = express.Router();

// 🔐 Protect all routes
router.use(authMiddleware);

/**
 * @route   GET /api/posts
 * @desc    Get all posts
 */
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username email");
    res.json(posts);
  } catch (error) {
    console.error("Error getting posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

/**
 *   GET /api/posts/user/:userId
 *  Get all posts by a specific user
 */
router.get("/user/:userId", async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.userId });
    res.json(posts);
  } catch (error) {
    console.error("Error getting user's posts:", error);
    res.status(500).json({ error: "Failed to fetch user's posts" });
  }
});

/**
  GET /api/posts/:id
   Get a single post by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "username email");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error("Error getting post:", error);
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

/**
 *  POST /api/posts
 *   Create a new post
 */
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const newPost = await Post.create({
      title,
      content,
      author: req.user._id,
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
});

/**
 *   PUT /api/posts/:id
 *  Update an existing post
 */
router.put("/:id", async (req, res) => {
  try {
    const { title, content } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, author: req.user._id },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Failed to update post" });
  }
});

/**
    DELETE /api/posts/:id
   Delete a post
 */
router.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Failed to delete post" });
  }
});

export default router;