# CodeAI — Adaptive C++ Learning Space & AI Technical Interview Studio
### Course: Object Oriented Programming with C++
### Unit 5: Exception Handling and Templates

---

## 🌟 What is CodeAI?
Inspired by modern interactive learning spaces, **CodeAI** is a comprehensive, production-grade learning hub and autonomous technical evaluation studio for **Object Oriented Programming with C++**.

It features:
1. **🎓 Adaptive AI Mock Interview Studio (Unit 5 Technical Evaluation):**
   - Natural, human-like voice synthesis with pronunciation normalizer for C++ technical terms.
   - Dynamic 5-bar oscillating waveform visualizer and studio AI examiner avatar.
   - Live candidate camera stream.
   - Adaptive difficulty engine (Level 1 Foundation &rarr; Level 2 Core &rarr; Level 3 Expert).
   - Real-time rubric evaluation and skill score matrix.
   - One-click Printable Performance Assessment Report generation.
2. **💬 C++ AI Tutor & Code Debugger (LLM Chatbot):**
   - Autonomous technical doubt solver.
   - Quick concept starters for Stack Unwinding, RAII, Custom Exceptions, Template Specialization, and Safety Guarantees.
   - Paste any C++ code to analyze syntax and runtime logic errors.
3. **📚 6-Unit Syllabus Explorer:**
   - Units 1 to 6 interactive cards covering OOP Fundamentals, Inheritance, Polymorphism, Files & Streams, Exception Handling & Templates, and the Standard Template Library (STL).
4. **💻 C++ Code Lab & Snippets:**
   - Filterable, copy-ready C++ 17/20 source examples with step-by-step technical explanations.
5. **👤 Universal Candidate Profile Manager:**
   - Configurable for any student or instructor with real-time `localStorage` persistence and 1-click default reset.

---

## 🚀 How to Deploy on Render

CodeAI is configured for **1-click zero-dependency deployment on Render**:

### Step 1: Push to GitHub
Commit and push the codebase to your GitHub repository:
```bash
git add .
git commit -m "Deploy CodeAI to Render"
git push origin main
```

### Step 2: Create Web Service on Render
1. Go to [dashboard.render.com](https://dashboard.render.com) and click **"New +" &rarr; "Web Service"**.
2. Connect your GitHub repository (`arshadengine/AI-CHATBOT`).
3. Fill in the deployment settings:
   - **Name:** `codeai-cpp-studio` (or your chosen subdomain)
   - **Environment:** `Node`
   - **Build Command:** *(leave blank)*
   - **Start Command:** `node server.js`
   - **Instance Type:** `Free`
4. Click **"Deploy Web Service"**!
5. In ~30 seconds, Render will provide your live URL (e.g., `https://codeai-cpp-studio.onrender.com`).

---

## 🏃 Running Locally

```bash
# Using Node.js
node server.js

# Or on Windows using batch runner:
run.bat
```
Visit `http://localhost:3000` in your browser.
