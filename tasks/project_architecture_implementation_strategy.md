# Project BAYANI: Implementation Strategy & Architecture

## System Overview
Project BAYANI is a web-based educational repository and content management system designed to systematically digitalize, store, and distribute localized history materials created for SDO Pangasinan II (Binalonan public schools).

---

## Technical Stack
- **Frontend**: React (Vite), Tailwind CSS, Lucide Icons, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **File Storage**: Express static / Local Uploads (Multer middleware)
- **Authentication**: JWT (JSON Web Tokens) with bcrypt password hashing

---

## User Roles & Permissions Matrix
| Role | Access Level | Responsibilities |
| :--- | :--- | :--- |
| **Guest / Student** | Public | Browse, filter, search, view, and download approved historical manuals. |
| **Educator / Contributor** | Authenticated | Submit historical write-ups, PDF manuals, and metadata for verification. |
| **Admin / Coordinator** | Authenticated (Admin) | Review pending submissions, approve/reject manuals, manage categories. |

---

## Folder Architecture Reference
```text
project-bayani/
├── backend/
│   ├── controllers/       # Business logic (authController, resourceController)
│   ├── middleware/        # JWT auth verification, Multer configuration
│   ├── models/            # Mongoose models (User, HistoricalResource)
│   ├── routes/            # Route handlers (/api/auth, /api/resources)
│   ├── uploads/           # PDF and image storage destination
│   ├── .env               # Environment variables
│   └── server.js          # Express app setup & database connection
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI (Navbar, SearchBar, Cards)
│   │   ├── data/          # Mock data for offline prototype
│   │   ├── pages/         # Views (Repository, Upload, Admin Queue)
│   │   ├── services/      # Axios API configuration
│   │   ├── App.jsx        # Routing and tab state layout
│   │   └── main.jsx       # React DOM root entry
├── tasks/                 # Project documentation and progress logs
└── package.json           # Root package file (Concurrently configuration)
```