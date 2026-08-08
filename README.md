# ResumeAI — AI-Powered ATS Resume Builder

**ResumeAI** is a modern, simple, professional AI-powered ATS Resume Builder web application built for students, freshers, and experienced professionals.

---

## ✨ Features

- **No Resume Upload Required**: Step-by-step guided wizard from scratch.
- **Dynamic Experience-Level Structures**:
  - **Student / Fresher**: Prioritizes Education, Technical Skills, Key Projects, Internships, and Certifications.
  - **0–2 Years Experience**: Prioritizes Skills, Work Experience, Projects, and Education.
  - **2–5 Years Experience**: Prioritizes Work Experience, Achievements, Technical Skills, and Projects.
  - **5+ Years Experience**: Prioritizes Professional Experience, Leadership, Business Impact, and Core Competencies.
- **Optional Work Experience**: Freshers can easily skip the experience section without breaking the layout.
- **Fact-Based AI Assistance**:
  - Professional summary generator derived strictly from user facts.
  - Work experience bullet-point action verb improver.
  - Real-time ATS match score breakdown (0–100).
  - Missing skills warning alert with strict ethical accuracy disclaimers.
- **Dual-Pane Live Editor & 3 ATS Templates**:
  - **Classic**, **Modern**, and **Executive** ATS templates.
  - **1-Page Fit** toggle ensuring single-page A4 PDF exports.
  - Instant **PDF** and **DOCX** download capabilities.
- **"My Resumes" Dashboard**: Save, edit, duplicate, and delete multiple resumes.

---

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Lucide Icons, jsPDF, html2canvas, docx.js
- **Backend**: Python 3.11+, FastAPI, Uvicorn, Pydantic, Requests

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/resume-ai.git
cd resume-ai
```

### 2. Start the Backend API (FastAPI)
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### 3. Start the Frontend (React + Vite)
In a new terminal:
```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
