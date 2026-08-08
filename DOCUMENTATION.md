# ResumeAI — Full Project Documentation & Step-by-Step Developer Guide

Welcome to the official technical documentation for **ResumeAI** — an **AI-powered, ATS-friendly Resume Builder web application**.

This document is structured so that you can explain the entire system **step-by-step from scratch** as a lead developer presenting to recruiters, clients, or evaluators.

---

## 📌 1. Project Overview & Core Concept

### 🎯 Product Purpose
Most resume builders force users to upload existing PDFs (which often contain bad formatting or parsing errors). **ResumeAI** takes a **guided, from-scratch approach**:
- Collects candidate details through a step-by-step wizard.
- Dynamically restructures the resume based on the candidate's **experience level**.
- Provides a **100% ATS-friendly single-column layout** guaranteed to pass Applicant Tracking Systems.
- Enhances wording using **Google's XYZ Bullet Formula** without inventing fake achievements or skills.

---

## 🏗️ 2. High-Level System Architecture

```text
               +-------------------------------------------------------+
               |                   USER INTERFACE                      |
               |              React (Vite) + Tailwind CSS              |
               +---------------------------+---------------------------+
                                           |
                    +----------------------+----------------------+
                    |                                             |
                    v                                             v
     +------------------------------+             +------------------------------+
     |      LOCAL STATE ENGINE      |             |     PYTHON FASTAPI BACKEND   |
     |   - Step-by-step Wizard      |             |   - Rule-Based NLP ATS Engine|
     |   - Live Dual-Pane Editor    |  HTTP/JSON  |   - Google XYZ Bullet Improver |
     |   - PDF (jsPDF/html2canvas)  | <=========> |   - Fact-Based Summary Gen   |
     |   - DOCX Export (docx.js)    |             |   - Missing Skills Detector  |
     |   - localStorage Persistence |             |   - Vercel Serverless (API)  |
     +------------------------------+             +------------------------------+
```

### 🛠️ Technology Stack Breakdown
- **Frontend Framework**: React 18 with Vite (Ultra-fast build & HMR).
- **Styling & Icons**: Tailwind CSS (custom tokens) + Lucide Icons.
- **Client-Side Export Engines**: `jsPDF` + `html2canvas` (pixel-perfect PDF export) and `docx.js` (native MS Word document export).
- **Backend API**: Python 3.11+, FastAPI, Uvicorn, Pydantic data validation.
- **Version Control & Deployment**: Portable Git, GitHub (`rumaizmohammed7-cmd/resume-ai`), Vercel (monorepo serverless hosting).

---

## 🧱 3. Step-by-Step Construction Guide (How to Explain It)

### Step 1: Setting Up Monorepo Architecture
Organized into a clean full-stack monorepo:
```text
resume-ai/
├── frontend/                # React Vite application
│   ├── src/
│   │   ├── components/      # UI Layout, Navbar, ResumePreview, TemplateSelector
│   │   ├── forms/           # Step-by-step wizard forms (Personal, Summary, Education...)
│   │   ├── pages/           # LandingPage, BuilderPage, EditorPage, DashboardPage
│   │   ├── templates/       # ATS Resume Templates (GoogleStandard, Classic, Modern...)
│   │   └── services/        # Client API & PDF/DOCX exporters
│   └── public/              # Static assets (logo.png, favicon.png)
├── backend/                 # FastAPI API service
│   ├── main.py              # Application entry point & CORS
│   ├── routes/              # API routes (ai_routes.py, resume_routes.py)
│   ├── services/            # Fact-based AI text generation (ai_service.py)
│   └── utils/               # NLP ATS Scoring & keyword matcher (ats_analyzer.py)
├── api/                     # Vercel serverless entry point (index.py)
└── vercel.json              # Vercel deployment routing configuration
```

---

### Step 2: Designing Dynamic Experience-Level Selection
At the start, the app asks **"What describes you best?"**:
1. **Student / Fresher**: Prioritizes Education, Technical Skills, Projects, Internships, and Certifications.
2. **0–2 Years Experience**: Prioritizes Skills, Work Experience, Projects, and Education.
3. **2–5 Years Experience**: Prioritizes Work Experience, Achievements, Technical Skills, and Projects.
4. **5+ Years Experience**: Prioritizes Professional Experience, Leadership, Business Impact, and Core Competencies.

---

### Step 3: Building the 8-Step Wizard & Optional Experience
Built an 8-step wizard controller (`BuilderPage.jsx` + `WizardProgress.jsx`):
- **Step 1: Personal Info** (Name, Email, Phone, Location, LinkedIn, GitHub)
- **Step 2: Summary** (Fact-based AI generator or manual typing)
- **Step 3: Education** (Institution, Degree, Specialization, Dates, GPA)
- **Step 4: Work Experience** (*Contains a prominent "Skip (No Experience)" button for freshers*)
- **Step 5: Technical Skills** (Categorized tags for Languages, Frameworks, Tools, Databases)
- **Step 6: Projects** (Project Name, Tech Stack, Live Links, Bullet Points)
- **Step 7: Extra Sections** (Certifications, Honors & Awards, Languages)
- **Step 8: Target Job Description** (Enables real-time ATS match scoring)

---

### Step 4: Crafting the "ATS Professional — One-Column Resume" Template
Implemented in `GoogleStandardTemplate.jsx` & `ClassicTemplate.jsx`:
- **Single-Column Structure**: Guarantees 100% parser compatibility across Workday, Taleo, Greenhouse, and Lever.
- **Reverse-Chronological Ordering**: Highlights current roles/education first.
- **1-Page A4 Spacing Rules**:
  - Compact typography (`text-[12px] leading-snug`).
  - Tight section margins (`mb-2.5`).
  - **1-Page Fit** toggle button in the Live Editor to guarantee single-page exports.

---

### Step 5: Developing the Fact-Based AI & ATS Engine

#### 1. Zero-Hallucination AI Summary & Bullet Improver (`ai_service.py`)
Refrains from fabricating fake companies, metrics, or technologies.
- **Google's XYZ Bullet Formula**: *"Accomplished [X] as measured by [Y], by doing [Z]"*.
- Replaces weak verbs (*worked*, *built*, *helped*) with power verbs (*Spearheaded*, *Architected*, *Engineered*, *Leveraged*).

#### 2. Natural Language ATS Match Engine (`ats_analyzer.py`)
Computes an overall ATS score (0–100%) based on 5 weighted criteria:
1. **Target Keyword Match (35%)**: Compares job description keywords with candidate resume text.
2. **Technical Skills Coverage (25%)**: Verifies presence of required technical stack.
3. **Experience Relevance (20%)**: Evaluates titles and bullet action verbs.
4. **Education Alignment (10%)**: Checks degree level matching.
5. **ATS Formatting Compliance (10%)**: Validates single-column structure and standard section headings.

#### 3. Missing Skills Ethical Alert (`MissingSkillsAlert.jsx`)
Highlights missing target job skills with a warning: *"Add them only if you genuinely have experience with them."*

---

### Step 6: Live Split-Screen Editor & Dual Exporters
- **Live Preview (`EditorPage.jsx`)**: Split-screen live preview with instant reactivity on every keystroke.
- **PDF Exporter (`pdfService.js`)**: Uses `html2canvas` + `jsPDF` for A4 vector rendering.
- **DOCX Exporter (`pdfService.js`)**: Uses `docx.js` to create editable MS Word documents.

---

### Step 7: Local Persistence & Dashboard
- Saves drafts and completed resumes into `localStorage`.
- Includes a **"My Resumes"** dashboard (`DashboardPage.jsx`) to edit, view, duplicate, or delete saved resumes.

---

### Step 8: Cloud Deployment on Vercel & GitHub
- Repository committed and pushed to GitHub: `https://github.com/rumaizmohammed7-cmd/resume-ai`.
- Deployed on Vercel: `https://resume-ai-ten-sandy.vercel.app`.

---

## 🎤 4. Presentation & Interview Q&A Cheatsheet

### Q1: Why did you build a single-column layout instead of fancy two-column templates?
> *"Recruiters and ATS parsers (like Workday and Taleo) read resumes line-by-line from top to bottom. Two-column layouts, graphics, and progress bars confuse parsers and can get candidate applications rejected automatically. Single-column reverse-chronological layouts achieve 100% ATS scannability."*

### Q2: How did you ensure the AI doesn't invent fake experience?
> *"Our AI engine is strictly rule-based and fact-restricted. It only operates on the raw text provided by the candidate, transforming weak action verbs into Google XYZ formula statements without fabricating metrics or job titles."*

### Q3: How does the ATS Match Score work?
> *"The ATS analyzer uses natural language keyword extraction to extract core skills and job requirements from a target job description, comparing them against the candidate's skills, experience, and education to generate a 0–100% match score with actionable feedback."*

### Q4: How is the project deployed?
> *"The frontend React Vite application and Python FastAPI backend serverless API are deployed together on Vercel using `vercel.json` routing, backed by GitHub for version control."*

---

## 🔗 Quick Reference Links
- **Live Website**: [https://resume-ai-ten-sandy.vercel.app](https://resume-ai-ten-sandy.vercel.app)
- **GitHub Repository**: [https://github.com/rumaizmohammed7-cmd/resume-ai](https://github.com/rumaizmohammed7-cmd/resume-ai)
- **Local Desktop Launcher**: `Start ResumeAI` icon on your Desktop
