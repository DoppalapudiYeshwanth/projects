# HireUs 🚀  
AI-Powered Recruitment & Job Application Platform (MERN Stack)

HireUs is a production-ready full-stack recruitment platform built using the MERN ecosystem.  
It enables **HRs to post and manage job listings** while allowing **candidates to apply, upload resumes, and track application status**.

The platform is designed with scalable MVC architecture and AI-ready extensions for future automated resume screening and skill assessment.

---

## 🌟 Project Highlights

- Modular MVC architecture with clean routing and controllers  
- Secure role-based HR/Candidate access using JWT authentication  
- Complete Job, Candidate, and Application workflow management  
- Resume upload pipeline using Multer + Cloudinary  
- MongoDB Atlas persistence with scalable schema design  
- Deployment-ready backend with production configuration  

---

## ✨ Core Features

### 👩‍💼 HR Panel
- Post new job openings  
- Update and delete only jobs posted by that HR  
- View applications for each job  
- Change application status: **Applied / Shortlisted / Rejected**  
- Recruiter dashboard with job + applicant management  

---

### 👨‍🎓 Candidate Panel
- Browse all available job openings  
- Apply for jobs  
- Track applied jobs with live status updates  
- Upload resume and maintain candidate profile  
- Candidate dashboard with skills and application statistics  

---

## 🔐 Authentication & Security

- JWT-based login system  
- Role-based authorization middleware  
- Protected routes for HR-only actions  
- Password hashing using bcrypt  
- Secure cookie-based session handling  

---

## 📄 Resume Upload System

- Resume uploads handled via **Multer**  
- Stored securely on **Cloudinary**  
- Candidate profiles include resume + structured skill storage  

---

## 🛠 Tech Stack

| Category | Technologies |
|---------|-------------|
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Frontend | EJS, Bootstrap 5 |
| Authentication | JWT, Cookies |
| File Upload | Multer, Cloudinary |
| Deployment | Render |

---

## 🚀 Live Deployment

🔗 Live Demo: https://hireus.onrender.com/login

## 📂 Folder Structure

hireus/
│── controllers/ # Business logic
│── routes/ # Route definitions
│── models/ # MongoDB schemas
│── middleware/ # Auth + validation middleware
│── views/ # EJS templates (HR + Candidate panels)
│── public/ # CSS, JS, assets
│── config/ # Cloudinary + environment setup
│── app.js # Main server entry


---

## ⚡ Setup Instructions (Run Locally)

### 1️⃣ Clone Repository

```bash
git clone https://github.com/DoppalapudiYeshwanth/projects.git
cd hireus

│── package.json




