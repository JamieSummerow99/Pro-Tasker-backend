Task Manager App
A complete full-stack Task Manager web application built with a modern React (Vite) frontend and a RESTful Express.js backend. Users can register, log in, manage projects, and organize tasks within each project. The app includes secure JWT authentication, protected routes, and a user-friendly interface.

Features
User Authentication: Secure registration and login using JWT.

Project Management: Create, update, and delete personal projects.

Task Management: Add, edit, complete, and remove tasks tied to specific projects.

Access Control: Only authorized users (project owners) can manage their projects and tasks.

Responsive Design: Clean and modern UI built with React and CSS.

Tech Stack
Frontend: React, Vite, Fetch API, CSS

Backend: Node.js, Express.js, MongoDB (Mongoose)

Authentication: JWT (JSON Web Tokens), bcrypt for password hashing

How to Use
Register for an account.

Log in to access your dashboard.

Create a new project.

Add and manage tasks within each project.

Mark tasks as complete, edit, or delete them as needed.

Log out securely when finished.

API Endpoints
POST /api/auth/register — Register a new user

POST /api/auth/login — Authenticate and receive a JWT

GET /api/projects — Retrieve the user’s projects

POST /api/projects — Create a new project

POST /api/tasks — Add a task (requires projectId)

GET /api/tasks?projectId=... — Fetch tasks for a specific project


