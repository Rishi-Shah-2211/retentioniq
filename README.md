# 🚀 RetentionIQ  
### AI-Powered Churn Intelligence Dashboard for SaaS Businesses

RetentionIQ is a full-stack churn analytics platform designed to help SaaS companies monitor customer behavior, detect churn risks, and generate actionable AI-driven insights in real time.

Built with production-grade architecture using modern technologies, RetentionIQ demonstrates complete system design — from database modeling and backend aggregation to interactive frontend analytics and deployment readiness.

---

## 🌟 Product Vision

Customer churn silently reduces SaaS growth and revenue.

RetentionIQ transforms raw subscription data into:

- 📊 Clear churn analytics  
- 🔍 Plan-wise churn comparison  
- 📈 Time-based churn trends  
- 🤖 AI-generated retention insights  
- 🎯 High-risk customer targeting  

The goal: **Enable proactive retention instead of reactive damage control.**

---

## 🧠 Core Features

### 📌 KPI Dashboard
- Total Users  
- Churned Users  
- Churn Rate (%)  
- Clickable KPI cards → Dynamic user tables  

### 📊 Plan-wise Churn Comparison
- Active vs Churned users by subscription plan  
- Clean visual bar analytics  

### 📈 Churn Trend Over Time
- Smooth curved time-series graph  
- Date-based churn aggregation  

### ⚠️ Risk Distribution by Plan
- High / Medium / Low churn risk segmentation  
- Realistic, non-symmetrical dataset modeling  

### 🤖 AI Insight Engine
Backend-generated insights such as:

> “Enterprise plan shows elevated churn among short-tenure users.”

Demonstrates:
- Analytical reasoning  
- Backend computation logic  
- Product intelligence  

### 📋 Actionable Retention Tables
- Full customer list (on KPI click)  
- High-risk users list for proactive outreach  
- Live data fetched from backend APIs  

---

## 🏗 System Architecture

Frontend (Next.js + TypeScript)  
  ↓ REST API  
Backend (Node.js + Express + Prisma ORM)  
  ↓  
PostgreSQL Database  

Designed with clean separation of concerns:
- API Layer  
- Data Aggregation Layer  
- Business Logic Layer  
- Presentation Layer  

---

## 🛠 Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- TailwindCSS (Neon Cyberpunk UI)
- Recharts (Data Visualization)

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL

### DevOps / Deployment
- GitHub

---

## 🎨 UI/UX Philosophy

RetentionIQ follows a modern SaaS aesthetic:

- Dark gradient base
- Glassmorphism dashboard cards
- Neon accent color system
- Smooth transitions & animations
- Professional typography
- Consistent chart styling

Designed to reflect:
- Product maturity
- Attention to detail
- Real-world dashboard standards

---

## 📂 Project Structure

```
RETENTIONIQ/
│
├── retentioniq-backend/
│   ├── src/
│   ├── prisma/
│   ├── controllers/
│   ├── routes/
│   └── server.ts
│
├── retentioniq-frontend/
│   ├── app/dashboard/
│   ├── components/
│   ├── lib/
│   └── page.tsx
│
└── README.md
```

---

## ⚙️ Run Locally

### 1️⃣ Clone Repository

```
git clone https://github.com/Rishi-Shah-2211/retentioniq.git
cd RETENTIONIQ
```

---

### 2️⃣ Backend Setup

```
cd retentioniq-backend
npm install
npx prisma generate
npm run dev
```

Backend runs at:
```
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

```
cd retentioniq-frontend
npm install
npm run dev
```

Frontend runs at:
```
http://localhost:3000
```

---

## 🔮 Future Enhancements

- Machine Learning-based churn prediction model
- Authentication & role-based access control
- Multi-tenant SaaS architecture
- Real-time analytics via WebSockets
- Stripe integration for revenue analytics
- Automated churn email trigger system

---

## 🎯 Why This Project Matters

RetentionIQ demonstrates:

- Full-stack engineering capability  
- REST API design  
- Database schema modeling  
- Aggregation-based analytics logic  
- Interactive data visualization  
- AI-inspired backend insight generation  
- Deployment-ready architecture  

This is not a template clone.

This is a production-minded analytics system built with product thinking.

---

## 👨‍💻 Author

**Rishi Shah**  
Full-Stack Developer | AI & Data Enthusiast  

---

⭐ If you found this project interesting, consider giving it a star.
