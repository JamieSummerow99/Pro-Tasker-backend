import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./config/connection.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

db.connect();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
import usersRouter from './routes/users.js';
import postsRouter from './routes/posts.js';

app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);
db.once("open", () => {
  app.listen(process.env.PORT, () => console.log(`🌍 Now listening on localhost:${process.env.  PORT}`));
});