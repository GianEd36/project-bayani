# Sprint Roadmap & Task Checklist

## Sprint 1: Prototype & Defense Preparation (In Progress)
- [x] Initial folder structure setup (`backend`, `frontend`, `tasks`)
- [x] React SPA setup using Vite and Tailwind CSS
- [x] Lucide icons and UI navigation components
- [x] Mock data dataset for offline prototype (`frontend/src/data/mockData.js`)
- [x] Interactive Public Repository with real-time text/dropdown filtering
- [x] Manual Submission portal view
- [x] Admin Verification Queue with dynamic approval workflow
- [ ] Prepare prototype demo script for faculty presentation

---

## Sprint 2: Express Backend & Database Integration
- [ ] Initialize MongoDB cluster / local MongoDB connection in `backend/server.js`
- [ ] Create Mongoose schemas (`User.js`, `HistoricalResource.js`)
- [ ] Configure `multer` for receiving document and PDF file uploads
- [ ] Build GET `/api/resources` endpoint with query parameter filtering
- [ ] Build POST `/api/resources/upload` endpoint for saving file paths and metadata
- [ ] Test endpoints using Postman or Thunder Client

---

## Sprint 3: Authentication & Security Workflows
- [ ] Implement `bcryptjs` password hashing in registration route
- [ ] Build JWT authentication middleware (`backend/middleware/auth.js`)
- [ ] Protect the Admin Queue endpoints (`/api/resources/pending` and `PUT status`)
- [ ] Integrate React state with actual login tokens and Axios requests

---

## Sprint 4: System Refinement & Deployment
- [ ] Add PDF view/download preview modal in React
- [ ] Optimize database indexes for fast query handling across eras and barangays
- [ ] Final testing across edge cases (empty search results, failed file uploads)
- [ ] Write final system documentation and deployment guides