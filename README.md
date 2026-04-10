# esmagico-mern-assignment

# Collab Workflow — MERN Stack App

A full-stack workflow orchestration platform where teams can **collaborate, manage projects, handle task dependencies (DAG), and simulate execution plans in real-time**.

---

## 🌐 Live Demo

- Frontend: https://your-frontend-link.vercel.app
- Backend: https://your-backend-link.onrender.com

---

## 📌 Features

### 🔐 Authentication

- User Signup & Login (JWT based)
- Protected Routes
- Persistent sessions

---

### 📁 Project Management

- Create new projects
- Join projects using **Invite Token**
- Each project contains:
  - Owner
  - Members
  - Unique invite token

---

### ✅ Task Management

- Create, update, delete tasks
- Task properties:
  - Title
  - Priority
  - Estimated Hours
  - Dependencies (DAG)

- Prevents cyclic dependencies (Graph validation)

---

### ⚙️ Execution Engine

- Compute execution order using DAG
- Simulate task execution based on available hours
- Outputs:
  - Execution order
  - Selected tasks
  - Blocked tasks
  - Skipped tasks

---

### 🔄 Real-Time Updates

- Integrated with **Socket.io**
- Updates reflect instantly across users in same project

---

### 🎨 Frontend (React)

- Clean and responsive UI
- Shared layout using **React Router Outlet**
- Sidebar-based navigation (Dashboard, Projects, Tasks)
- Axios for API integration
- Tailwind CSS for styling

---

## 🧠 Architecture

### Backend (Node.js + Express)

- MVC Pattern
- REST APIs
- MongoDB with Mongoose
- Socket.io for real-time communication

### Frontend (React + Vite)

- Component-based architecture
- Context API for authentication
- Centralized API layer
- Reusable layout system

---

## 🛠️ Tech Stack

### Frontend

- React.js (Vite)
- Tailwind CSS
- Axios
- React Router DOM

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- Socket.io
- JWT Authentication

---

## 📂 Folder Structure

```
client/
  src/
    api/
    components/
    context/
    layouts/
    pages/

server/
  config/
  controllers/
  models/
  routes/
  utils/
```

---

## ⚙️ Setup Instructions

### 🔹 Clone the repository

```
git clone https://github.com/ParnandiVarun/collab-workflow.git
cd collab-workflow
```

---

### 🔹 Backend Setup

```
cd server
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

Run backend:

```
npm run dev
```

---

### 🔹 Frontend Setup

```
cd client
npm install
```

Create `.env` file:

```
VITE_API_URL=https://your-backend-url/api
```

Run frontend:

```
npm run dev
```

---

## 🚀 Deployment

- Backend deployed on **Render**
- Frontend deployed on **Vercel **

---

## 🧪 Future Improvements

- Role-based access (Admin / Member)
- Drag & Drop task dependencies
- Notifications system
- Advanced analytics dashboard
- Mobile responsiveness improvements

---

## 👨‍💻 Author

**Varun**

- GitHub: https://github.com/ParnandiVarun
- LinkedIn: https://www.linkedin.com/in/varun-parnandi-b75845332/

---

## ⭐ Final Note

This project demonstrates:

- Full-stack MERN development
- Scalable frontend architecture
- Graph-based task execution (DAG)
- Real-time systems with WebSockets

---

🔥 Built with a focus on **clean architecture, scalability, and real-world use cases**
