# AI Resume Builder 🚀

🔗 **Live Demo:** [resume-builder-flame-alpha.vercel.app](https://resume-builder-flame-alpha.vercel.app/)

A powerful full-stack web application that helps users create, manage, customize, and export professional resumes effortlessly.  
Built using the **MERN stack** (MongoDB, Express.js, React, Node.js) and enhanced with **AI-powered writing assistance**.

---

## ✨ Features

- **📝 AI-Powered Content Enhancement**  
  Use AI to rewrite and improve professional summaries and job descriptions.

- **🎨 Interactive Resume Builder**  
  Real-time editing with instant visual preview.

- **🖼️ Image Uploads**  
  Upload and manage profile pictures using ImageKit.

- **📂 Resume Management**  
  Create, update, delete, and organize multiple resumes from a dashboard.

- **🔒 Secure Authentication**  
  User accounts protected with JWT and password hashing.

- **👀 Live Resume Preview**  
  View resumes in a dedicated public preview mode.

- **📄 PDF Resume Import**  
  Extract text from existing resumes to quickly generate new ones.

- **📱 Fully Responsive UI**  
  Built with Tailwind CSS for all screen sizes.

---

## 🛠️ Tech Stack

### Frontend (Client)

| Technology | Purpose |
|-----------|--------|
| **React (v19)** | UI framework |
| **Vite** | Fast build tool |
| **Tailwind CSS (v4)** | Styling |
| **Redux Toolkit** | State management |
| **React Router DOM** | Routing |
| **Axios** | API requests |
| **Lucide React** | Icons |
| **React Hot Toast** | Notifications |

---

### Backend (Server)

| Technology | Purpose |
|-----------|--------|
| **Node.js + Express** | Server & API |
| **MongoDB + Mongoose** | Database |
| **JWT + Bcrypt** | Authentication |
| **OpenAI API** | AI features |
| **ImageKit** | Image storage |
| **Multer** | File uploads |

---

## 🚀 Getting Started

### 🔹 Prerequisites

- Node.js (v14+)
- MongoDB Atlas or local MongoDB
- OpenAI API Key
- ImageKit Account

---

### 🔹 1. Clone the Repository

```bash
git clone https://github.com/kodurusravani34/ResumeBuilder.git
cd ResumeBuilder
```

### 🔹 2. Setup Backend

```bash
cd server
npm install
```

Create `.env` in `server/`:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
OPENAI_API_KEY=your_openai_key
IMAGEKIT_PUBLIC_KEY=your_key
IMAGEKIT_PRIVATE_KEY=your_key
IMAGEKIT_URL_ENDPOINT=your_url
```

Run backend:

```bash
npm run start
# or
npm run server
```

### 🔹 3. Setup Frontend

```bash
cd client
npm install
```

Create `.env` in `client/`:

```env
VITE_BASE_URL=http://localhost:3000
```

Run frontend:

```bash
npm run dev
```

### 🔹 4. Open the App

Visit:

http://localhost:5173

## 📂 Project Structure

```
ResumeBuilder/
├── client/                 # React frontend
│   ├── src/
│   │   ├── app/            # Redux store
│   │   ├── components/     # UI components
│   │   ├── pages/          # Pages
│   │   ├── configs/        # API configs
│   │   ├── App.jsx
│   │   └── main.jsx
│
└── server/                 # Express backend
    ├── configs/            # DB configs
    ├── controllers/        # Logic
    ├── middlewares/        # Auth middlewares
    ├── models/             # Schemas
    ├── routes/             # API routes
    └── server.js
```

## 🔌 API Endpoints

### Authentication

`POST /api/users/register`

`POST /api/users/login`

`GET /api/users/profile`

### Resumes

`GET /api/resumes`

`POST /api/resumes`

`GET /api/resumes/:id`

`PUT /api/resumes/:id`

`DELETE /api/resumes/:id`

### AI Features

`POST /api/ai/enhance-pro-sum`

`POST /api/ai/enhance-job-desc`

`POST /api/ai/upload-resume`

## 🤖 AI Capabilities

Resume summary rewriting

Job description enhancement

Resume parsing from uploaded PDFs

## 🔐 Security

JWT-based authentication

Password hashing with Bcrypt

Protected API routes

## 🤝 Contributing

Pull requests are welcome! Feel free to fork and improve.

## 📄 License

Licensed under the ISC License.
