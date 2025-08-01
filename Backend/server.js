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



// --- CORS 
const whitelist = ["http://localhost:3000", PROD_URL];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

//  Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Routes ---
app.use("/api/users", usersRouter);

app.use("/api/projects", projectsRouter);
app.use("/api/:projectId/tasks", tasksRouter);




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
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`✅ We In There like swimwear http://localhost:${PORT}`);
  });
});

export default app;
