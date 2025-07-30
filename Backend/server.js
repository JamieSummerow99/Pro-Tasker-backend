import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./config/connection.js";
import usersRouter from "./routes/users.js";
import postsRouter from "./routes/posts.js";
import projectsRouter from "./routes/projects.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const PROD_URL = process.env.PROD_URL;

// 1
const whitelist = ["http://localhost:3000", PROD_URL];
// 2
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
// 3
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes
app.use("/api/users", usersRouter);

app.use("/api/posts", postsRouter);

app.use("/api/projects", projectsRouter);

//get
app.get("/", (req, res) => {
  res.send("Welcome to the Pro-Task API");
});
app.get("/api", (req, res) => {
  res.send("API is running...");})
app.get("/api/v1", (req, res) => {
  res.send("API v1 is running...");
});

db.once("open", () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
