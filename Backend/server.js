import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./config/connection.js";

import usersRouter from "./routes/users.js";
import projectsRouter from "./routes/projects.js";
import tasksRouter from "./routes/tasks.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const PROD_URL = process.env.PROD_URL;

// Clean up whitelist 
const whitelist = ["http://localhost:3000"];
if (PROD_URL) whitelist.push(PROD_URL);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`Blocked CORS request from origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors({origin: 'http://localhost:5173'}));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Routes 
app.use("/api/users", usersRouter);//200
app.use("/api/projects", projectsRouter);//200
app.use("/api/:projectId/tasks", tasksRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


app.get("/", (req, res) => {
  res.send("Welcome to the Pro-Task API");
});

app.get("/api", (req, res) => {
  res.send("API is running...");
});
app.post("/api/users/login", (req, res) => {
  res.send("logging into your account")
})
//this gives a 200 request


//connection file
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`✅ We In There like swimwear http://localhost:${PORT}`);
  });
});

export default app;
