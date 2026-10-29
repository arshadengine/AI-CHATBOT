# CodeAI — Adaptive C++ Learning Space & AI Mock Interview Studio
### Course: Object Oriented Programming with C++ [ADPC303]
### Continuous Internal Evaluation 2 (CIE 2) — Unit 5: Exception Handling and Templates
**Institution:** Zeal Education Society’s Zeal College of Engineering and Research, Narhe, Pune - 41  
**Department:** Artificial Intelligence and Data Science (AI & DS)  
**Academic Year:** 2026-27 | **Semester:** III | **Class:** S.Y. B.Tech  
**Student Name:** Samiksha Kakade  
**Course Faculty:** Mr. Chandan Prasad  
**Record No.:** ZCOER-ACAD/R/16L | **Revision:** 00  

---

## 🌟 What is CodeAI?
Inspired by platforms like CodeBuddy, **CodeAI** is a comprehensive, production-grade learning hub and autonomous technical evaluation studio specifically aligned with the **Zeal College / SPPU syllabus for C++ OOP [ADPC303]**.

It features:
1. **🎓 AI Mock Interview Studio (Unit 5 CIE 2 Primary Activity):**
   - Natural, human-like voice synthesis with pronunciation normalizer for C++ technical terms.
   - Dynamic 5-bar oscillating waveform visualizer and studio AI examiner avatar.
   - Live candidate camera stream.
   - Adaptive difficulty engine (Level 1 Foundation &rarr; Level 2 Core &rarr; Level 3 Expert).
   - Real-time CIE 2 rubric evaluation and scoring matrix.
   - One-click Printable Official Zeal College CIE-2 Report generation.
2. **💬 C++ AI Tutor & Code Debugger (LLM Chatbot):**
   - Autonomous technical doubt solver.
   - Quick concept starters for Stack Unwinding, RAII, Custom Exceptions, Template Specialization, and Safety Guarantees.
   - Paste any C++ code to analyze syntax and runtime logic errors.
3. **📚 6-Unit Syllabus Explorer:**
   - Units 1 to 6 interactive cards covering OOP Fundamentals, Inheritance, Polymorphism, Files & Streams, Exception Handling & Templates, and the Standard Template Library (STL).
4. **💻 C++ Code Lab & Snippets:**
   - Filterable, copy-ready C++ 17/20 source examples with step-by-step technical explanations.

---

## 🚀 How to Deploy on Render (Same as Reference)

CodeAI is configured for **1-click zero-dependency deployment on Render**:

### Step 1: Push to GitHub
Commit and push the `chatbot` folder to your GitHub repository:
```bash
git add .
git commit -m "Deploy CodeAI to Render"
git push origin main
```

### Step 2: Create Web Service on Render
1. Go to [dashboard.render.com](https://dashboard.render.com) and click **"New +" &rarr; "Web Service"**.
2. Connect your GitHub repository.
3. Fill in the deployment settings:
   - **Name:** `codeai-samiksha-kakade` (or your chosen subdomain)
   - **Environment:** `Node`
   - **Build Command:** `echo 'Build complete'` (or leave blank)
   - **Start Command:** `node server.js`
   - **Instance Type:** `Free`
4. Click **"Deploy Web Service"**!
5. In ~30 seconds, Render will provide your live URL (e.g., `https://codeai-samiksha.onrender.com`).

---

## 🏃 Local Run Options

### 1-Click Windows Launch:
Double-click **`run.bat`** inside the `chatbot` folder. It will detect Node.js or Python and launch `http://localhost:3000` automatically.

### Manual Terminal Run:
```bash
# Using Node.js (Production Server)
node server.js

# Or using Python
python -m http.server 8080
```
Open **`http://localhost:3000`** in your browser.
