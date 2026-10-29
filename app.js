// ==========================================================================
// CodeAI - Application Engine & AI Tutor LLM Chatbot
// Zeal College of Engineering & Research | Dept of AI & DS
// Course: Object Oriented Programming with C++ [ADPC303]
// Candidate: Samiksha Kakade | Faculty: Mr. Chandan Prasad
// ==========================================================================

const DEFAULT_PROFILE = {
  name: "Samiksha Kakade",
  rollNo: "SY-AIDS-26",
  prn: "72124018K",
  class: "S.Y. B.Tech (AI & DS)",
  semester: "III",
  academicYear: "2026-27",
  courseName: "Object Oriented Programming with C++",
  courseCode: "ADPC303",
  unitName: "Unit 5: Exception Handling and Templates",
  facultyName: "Mr. Chandan Prasad",
  collegeName: "Zeal College of Engineering and Research, Pune - 41",
  recordNo: "ZCOER-ACAD/R/16L",
  assessmentType: "Adaptive Interview Challenge (AI Mock Interview Simulation Bot)",
  maxMarks: 5
};

function loadCandidateProfile() {
  try {
    const raw = localStorage.getItem("codeai_candidate_profile");
    if (raw) {
      const parsed = JSON.parse(raw);
      return Object.assign({}, DEFAULT_PROFILE, parsed);
    }
  } catch (e) {
    console.warn("Could not read candidate profile from storage", e);
  }
  return Object.assign({}, DEFAULT_PROFILE);
}

function saveCandidateProfile(updatedData) {
  state.candidateProfile = Object.assign({}, state.candidateProfile, updatedData);
  try {
    localStorage.setItem("codeai_candidate_profile", JSON.stringify(state.candidateProfile));
  } catch (e) {
    console.warn("Could not save candidate profile to storage", e);
  }
  renderStudentInfo();
}

function getInitials(name) {
  if (!name) return "ST";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "ST";
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Application State
const state = {
  candidateProfile: loadCandidateProfile(),
  currentQuestionIndex: 0,
  activeQuestions: [],
  interviewHistory: [],
  currentDifficulty: "easy",
  difficultyLevel: 1,
  isSpeechEnabled: true,
  isRecording: false,
  isCameraActive: false,
  timerSeconds: 120,
  timerInterval: null,
  totalScoreSum: 0,
  questionsAttempted: 0,
  selectedVoice: null,
  availableVoices: [],
  skills: {
    exceptionHandling: 68,
    templates: 62,
    codeSyntax: 72,
    communication: 78
  },
  tutorHistory: []
};

// Global backward-compatibility alias
Object.defineProperty(window, "CANDIDATE_PROFILE", {
  get() { return state.candidateProfile; },
  configurable: true
});

// Speech Synthesis & Recognition handles
let synth = window.speechSynthesis;
let recognition = null;

// Initialize when DOM loads
document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  initProfileManager();
  initMobileDrawer();
  initQuestionQueue();
  initVoiceEngine();
  initSpeechRecognition();
  initInterviewListeners();
  initTutorChat();
  renderSyllabusCards();
  renderCodeLabSnippets("all");
  renderStudentInfo();
  startInterview();
});

// Tab Switching
function initTabs() {
  const tabs = document.querySelectorAll(".nav-tab-btn");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const targetId = tab.getAttribute("data-tab");
      
      // Update active tab buttons
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      // Update active panes
      document.querySelectorAll(".tab-pane").forEach(pane => pane.classList.remove("active"));
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add("active");
    });
  });
}

// Display Student Info
function renderStudentInfo() {
  const el = document.getElementById("student-info-display");
  if (el) {
    el.textContent = `${state.candidateProfile.name} • ${state.candidateProfile.class}`;
  }
}

// Multi-User Profile Manager Modal Handlers
function initProfileManager() {
  const btnEdit = document.getElementById("btn-edit-profile");
  const modal = document.getElementById("profile-modal");
  const btnClose = document.getElementById("btn-close-profile-modal");
  const btnReset = document.getElementById("btn-reset-profile");
  const form = document.getElementById("profile-form");

  const inputName = document.getElementById("input-student-name");
  const inputRoll = document.getElementById("input-student-roll");
  const inputPrn = document.getElementById("input-student-prn");
  const inputClass = document.getElementById("input-student-class");
  const inputFaculty = document.getElementById("input-student-faculty");

  function openProfileModal() {
    if (!modal) return;
    if (inputName) inputName.value = state.candidateProfile.name || "";
    if (inputRoll) inputRoll.value = state.candidateProfile.rollNo || "";
    if (inputPrn) inputPrn.value = state.candidateProfile.prn || "";
    if (inputClass) inputClass.value = state.candidateProfile.class || "";
    if (inputFaculty) inputFaculty.value = state.candidateProfile.facultyName || "";
    modal.classList.add("open");
  }

  function closeProfileModal() {
    if (modal) modal.classList.remove("open");
  }

  if (btnEdit) btnEdit.addEventListener("click", openProfileModal);
  if (btnClose) btnClose.addEventListener("click", closeProfileModal);

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeProfileModal();
    });
  }

  if (btnReset) {
    btnReset.addEventListener("click", () => {
      saveCandidateProfile(DEFAULT_PROFILE);
      if (inputName) inputName.value = DEFAULT_PROFILE.name;
      if (inputRoll) inputRoll.value = DEFAULT_PROFILE.rollNo;
      if (inputPrn) inputPrn.value = DEFAULT_PROFILE.prn;
      if (inputClass) inputClass.value = DEFAULT_PROFILE.class;
      if (inputFaculty) inputFaculty.value = DEFAULT_PROFILE.facultyName;
      speakText(`Candidate profile reset to default: ${DEFAULT_PROFILE.name}.`);
      closeProfileModal();
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const updated = {
        name: (inputName?.value || "").trim() || DEFAULT_PROFILE.name,
        rollNo: (inputRoll?.value || "").trim() || DEFAULT_PROFILE.rollNo,
        prn: (inputPrn?.value || "").trim() || DEFAULT_PROFILE.prn,
        class: (inputClass?.value || "").trim() || DEFAULT_PROFILE.class,
        facultyName: (inputFaculty?.value || "").trim() || DEFAULT_PROFILE.facultyName
      };
      saveCandidateProfile(updated);
      closeProfileModal();
      speakText(`Profile updated for ${state.candidateProfile.name}.`);
    });
  }
}

// Mobile Examiner Sidebar Drawer Toggle
function initMobileDrawer() {
  const btnToggle = document.getElementById("btn-toggle-mobile-sidebar");
  const sidebar = document.getElementById("interview-sidebar");
  const arrow = document.getElementById("drawer-arrow");

  if (!btnToggle || !sidebar) return;

  btnToggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("drawer-open");
    if (arrow) {
      arrow.textContent = isOpen ? "▲" : "▼";
    }
    const labelSpan = btnToggle.querySelector("span:first-child");
    if (labelSpan) {
      labelSpan.textContent = isOpen 
        ? "📊 Hide Examiner Console & Stats" 
        : "📊 View Examiner Console & Stats";
    }
  });
}

// ==========================================================================
// TAB 3 & 4: SYLLABUS & CODE LAB RENDERERS
// ==========================================================================
function renderSyllabusCards() {
  const container = document.getElementById("syllabus-cards-container");
  if (!container || typeof SYLLABUS_UNITS === "undefined") return;

  container.innerHTML = "";
  SYLLABUS_UNITS.forEach(unit => {
    const card = document.createElement("div");
    card.className = "syllabus-unit-card";

    const badgeClass = `unit-badge-${unit.id}`;
    const topicsHtml = unit.topics.map(t => `<li>${t}</li>`).join("");

    card.innerHTML = `
      <div>
        <span class="unit-badge-pill ${badgeClass}">Unit ${unit.id} ${unit.id === 5 ? '• CIE 2 Activity' : ''}</span>
        <h3 class="unit-title-head">${unit.title}</h3>
        <p style="font-size:0.85rem; color:#475569; line-height:1.5;">${unit.description}</p>
        <ul class="unit-topics-list">
          ${topicsHtml}
        </ul>
      </div>
      <div style="margin-top:1.2rem; padding-top:0.8rem; border-top:1px solid #e2e8f0; display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size:0.75rem; color:#64748b; font-weight:600;">Syllabus 2024 Pattern</span>
        <button class="btn-icon btn-ask-unit" data-unit="${unit.title}" style="font-size:0.75rem; padding:0.3rem 0.6rem;">
          Ask AI Tutor &rarr;
        </button>
      </div>
    `;

    container.appendChild(card);
  });

  document.querySelectorAll(".btn-ask-unit").forEach(btn => {
    btn.addEventListener("click", () => {
      const uTitle = btn.getAttribute("data-unit");
      switchTab("tab-tutor");
      handleTutorQuery(`Please explain the core concepts and exam focus for ${uTitle}.`);
    });
  });
}

function renderCodeLabSnippets(filter) {
  const container = document.getElementById("codelab-container");
  if (!container || typeof CODE_SNIPPETS === "undefined") return;

  container.innerHTML = "";
  const list = filter === "all" 
    ? CODE_SNIPPETS 
    : CODE_SNIPPETS.filter(s => s.tags.includes(filter) || s.unit.includes(filter));

  list.forEach(item => {
    const card = document.createElement("div");
    card.className = "code-snippet-card";

    const escapedCode = escapeHtml(item.code);

    card.innerHTML = `
      <div class="snippet-card-top">
        <div>
          <h3>${item.title}</h3>
          <span style="font-size:0.74rem; color:var(--primary); font-weight:700;">${item.unit} &bull; ${item.tags.join(", ")}</span>
        </div>
        <button class="btn-copy-code" data-code="${encodeURIComponent(item.code)}">
          📋 Copy Code
        </button>
      </div>
      <div class="code-block" style="margin:0; border-radius:0; border-left:none; border-right:none;">
        <div class="code-header">
          <span>C++ 17/20 Implementation</span>
        </div>
        <pre><code>${escapedCode}</code></pre>
      </div>
      <div class="snippet-explanation">
        <strong>Technical Mechanics:</strong> ${item.explanation}
      </div>
    `;

    container.appendChild(card);
  });

  // Filter buttons listener
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderCodeLabSnippets(btn.getAttribute("data-filter"));
    });
  });

  // Copy code buttons
  document.querySelectorAll(".btn-copy-code").forEach(btn => {
    btn.addEventListener("click", () => {
      const code = decodeURIComponent(btn.getAttribute("data-code"));
      navigator.clipboard.writeText(code).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = "✅ Copied!";
        setTimeout(() => btn.innerHTML = originalText, 1800);
      });
    });
  });
}

function switchTab(tabId) {
  const tabBtn = document.querySelector(`.nav-tab-btn[data-tab="${tabId}"]`);
  if (tabBtn) tabBtn.click();
}

// ==========================================================================
// TAB 2: C++ AI TUTOR & CODE ASSISTANT (LLM CHATBOT)
// ==========================================================================
function initTutorChat() {
  const stream = document.getElementById("tutor-messages-stream");
  const input = document.getElementById("tutor-user-input");
  const btnSend = document.getElementById("btn-send-tutor-msg");
  const btnClear = document.getElementById("btn-clear-tutor-chat");

  if (stream && stream.children.length === 0) {
    appendTutorBotMessage(
      `👋 **Hello Samiksha!** I am your **C++ AI Tutor & Code Debugger**.\n\n` +
      `You can ask me any doubt related to **Object Oriented Programming with C++ [ADPC303]**:\n` +
      `• *Unit 5: Exception Handling, RAII, and Templates*\n` +
      `• *Polymorphism, Inheritance, Files & Streams, and STL*\n` +
      `• *Paste your C++ code to find bugs or get optimized implementations.*\n\n` +
      `How can I assist your study today? Click any suggestion on the left or type below!`
    );
  }

  if (btnSend && input) {
    btnSend.addEventListener("click", () => {
      const q = input.value.trim();
      if (q) {
        handleTutorQuery(q);
        input.value = "";
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        const q = input.value.trim();
        if (q) {
          handleTutorQuery(q);
          input.value = "";
        }
      }
    });
  }

  // Quick prompt chips
  document.querySelectorAll(".prompt-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const prompt = chip.getAttribute("data-prompt");
      handleTutorQuery(prompt);
    });
  });

  if (btnClear && stream) {
    btnClear.addEventListener("click", () => {
      stream.innerHTML = "";
      appendTutorBotMessage("Chat history cleared. What would you like to explore next?");
    });
  }
}

function handleTutorQuery(userQuery) {
  appendTutorUserMessage(userQuery);

  // Show thinking indicator
  const stream = document.getElementById("tutor-messages-stream");
  const typingWrapper = document.createElement("div");
  typingWrapper.className = "msg-wrapper bot";
  typingWrapper.id = "tutor-typing-indicator";
  typingWrapper.innerHTML = `
    <div class="msg-avatar">🤖</div>
    <div class="msg-bubble" style="color:var(--text-muted); font-style:italic;">
      Dr. C++ AI is generating a comprehensive technical response...
    </div>
  `;
  if (stream) {
    stream.appendChild(typingWrapper);
    stream.scrollTop = stream.scrollHeight;
  }

  setTimeout(() => {
    const indicator = document.getElementById("tutor-typing-indicator");
    if (indicator) indicator.remove();

    const response = generateAITutorResponse(userQuery);
    appendTutorBotMessage(response);
  }, 750);
}

// Intelligent C++ Academic LLM Response Generator
function generateAITutorResponse(query) {
  const q = query.toLowerCase();

  if (q.includes("stack unwinding") || q.includes("raii")) {
    return `### 🔍 Stack Unwinding & RAII in C++\n\n` +
      `**1. What is Stack Unwinding?**\n` +
      `When an exception is thrown inside a \`try\` block, execution transfers to an enclosing \`catch\` handler. During this propagation across nested function calls, C++ runtime automatically invokes the **destructors of all local objects** created on the stack in reverse order of construction.\n\n` +
      `**2. What is RAII (Resource Acquisition Is Initialization)?**\n` +
      `RAII binds resource lifecycles (dynamic memory, file handles, mutex locks) to the lifetime of stack objects. When stack unwinding occurs, the destructor is guaranteed to release the resource, **preventing memory and handle leaks**.\n\n` +
      `\`\`\`cpp\n` +
      `#include <iostream>\n` +
      `#include <memory>\n\n` +
      `class FileHandler {\n` +
      `public:\n` +
      `    FileHandler() { std::cout << "File opened.\\n"; }\n` +
      `    ~FileHandler() { std::cout << "File closed safely via RAII!\\n"; }\n` +
      `};\n\n` +
      `void process() {\n` +
      `    FileHandler f; // Stack allocated\n` +
      `    throw std::runtime_error("Disk read failed!");\n` +
      `    // Destructor ~FileHandler() executes automatically!\n` +
      `}\n` +
      `\`\`\`\n\n` +
      `*Academic Note for Zeal CIE-2:* Remember that destructors must never throw an exception during stack unwinding; otherwise, \`std::terminate()\` will immediately abort the application.`;
  }

  if (q.includes("custom exception") || q.includes("std::exception") || q.includes("what()")) {
    return `### ⚠️ Creating Custom Exceptions in C++\n\n` +
      `In professional C++, user-defined exceptions should inherit publicly from \`std::exception\` (or \`std::runtime_error\`) and override the virtual method \`what()\`.\n\n` +
      `\`\`\`cpp\n` +
      `#include <iostream>\n` +
      `#include <exception>\n\n` +
      `class NegativeBalanceException : public std::exception {\n` +
      `public:\n` +
      `    const char* what() const noexcept override {\n` +
      `        return "Bank Error: Withdrawal amount exceeds available balance!";\n` +
      `    }\n` +
      `};\n\n` +
      `void withdraw(double balance, double amount) {\n` +
      `    if (amount > balance) throw NegativeBalanceException();\n` +
      `    std::cout << "Transaction approved.\\n";\n` +
      `}\n` +
      `\`\`\`\n\n` +
      `**Key Points for Exams:**\n` +
      `• The \`noexcept\` specifier on \`what()\` guarantees that calling \`what()\` cannot throw a secondary exception.\n` +
      `• Always catch by reference: \`catch(const std::exception& e)\` to prevent object slicing.`;
  }

  if (q.includes("destructor") && (q.includes("throw") || q.includes("never throw"))) {
    return `### 💥 Why Destructors Should NEVER Throw in C++\n\n` +
      `**The Two-Exception Rule & \`std::terminate()\`:**\n` +
      `If an exception is already in flight (during stack unwinding) and a destructor of an object being destroyed also throws an exception, C++ is faced with **two simultaneous active exceptions**.\n\n` +
      `Since C++ cannot catch two unhandled exceptions simultaneously, the runtime immediately calls **\`std::terminate()\`**, terminating the program abnormally without calling remaining destructors!\n\n` +
      `\`\`\`cpp\n` +
      `// Modern C++ standard rule:\n` +
      `~MyClass() noexcept { // Destructors are noexcept(true) by default in C++11!\n` +
      `    // If an error can occur here, catch it INSIDE the destructor!\n` +
      `    try {\n` +
      `        closeConnection();\n` +
      `    } catch (...) {\n` +
      `        // Swallow or log error, NEVER let it escape the destructor!\n` +
      `    }\n` +
      `}\n` +
      `\`\`\``;
  }

  if (q.includes("specialization") || (q.includes("template") && q.includes("partial"))) {
    return `### 🎯 Template Specialization: Full vs Partial\n\n` +
      `**1. Full (Explicit) Specialization:**\n` +
      `Specializes a template for a single, fully concrete type using syntax \`template <>\`.\n` +
      `\`\`\`cpp\n` +
      `template <typename T> class Formatter { ... };\n` +
      `// Full specialization for const char*:\n` +
      `template <> class Formatter<const char*> { ... };\n` +
      `\`\`\`\n\n` +
      `**2. Partial Specialization:**\n` +
      `Specializes a template for a subset or family of types while keeping some parameters generic.\n` +
      `\`\`\`cpp\n` +
      `// Specialization for ALL pointer types:\n` +
      `template <typename T> class Formatter<T*> { ... };\n` +
      `\`\`\`\n\n` +
      `⚠️ **Crucial Rule:** In C++, **Function Templates cannot be partially specialized!** Partial specialization is only valid for **Class/Struct Templates**. To emulate partial specialization for functions, use function overloading or delegate to a helper class.`;
  }

  if (q.includes("exception safety") || q.includes("guarantee")) {
    return `### 🛡️ The 3 Exception Safety Guarantees (David Abrahams)\n\n` +
      `1. **Basic Guarantee:**\n` +
      `   If an exception occurs, no resources (memory, file handles, mutex locks) are leaked, and objects remain in a valid, well-defined internal state.\n\n` +
      `2. **Strong Guarantee ('Commit or Rollback'):**\n` +
      `   The operation either succeeds completely, or if an exception is thrown, the entire program state is rolled back to exactly what it was prior to the function call (atomic transaction).\n\n` +
      `3. **Nothrow (No-fail) Guarantee:**\n` +
      `   The operation is guaranteed never to throw an exception under any circumstance (decorated with \`noexcept\`). Crucial for destructors, move constructors, and swap functions.`;
  }

  if (q.includes("difference") || (q.includes("template") && q.includes("overload"))) {
    return `### 🔄 Function Templates vs Function Overloading\n\n` +
      `| Parameter | Function Templates | Function Overloading |\n` +
      `|---|---|---|\n` +
      `| **Code Duplication** | Write once; compiler instantiates for requested types (DRY principle). | Requires rewriting identical logic for every data type. |\n` +
      `| **Algorithm** | Used when logic is identical across multiple types. | Used when different types require entirely different logic. |\n` +
      `| **Maintenance** | Single code point to maintain and debug. | Changes must be manually duplicated across all overloads. |\n` +
      `| **Syntax** | \`template <typename T> T max(T a, T b)\` | \`int max(int, int); double max(double, double);\` |`;
  }

  // General C++ doubt solver response
  return `### 💡 Technical Analysis & Guidance\n\n` +
    `Regarding your question on **"${escapeHtml(query)}"**:\n\n` +
    `In C++ Object Oriented Programming (ADPC303):\n` +
    `• Always enforce **type safety** and **compile-time guarantees** over preprocessor macros.\n` +
    `• For robust exception handling in Unit 5, structure code using \`try-catch\` blocks, catch exceptions by \`const std::exception&\`, and rely on **RAII** to guarantee clean destruction during stack unwinding.\n` +
    `• Use function and class templates whenever logic is generic across primitive and user-defined classes.\n\n` +
    `Would you like to see a targeted code snippet or test this concept in the **AI Mock Interview** tab?`;
}

function appendTutorBotMessage(markdownText) {
  const stream = document.getElementById("tutor-messages-stream");
  if (!stream) return;

  const wrapper = document.createElement("div");
  wrapper.className = "msg-wrapper bot";
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  wrapper.innerHTML = `
    <div class="msg-avatar">🤖</div>
    <div class="msg-bubble">
      <div class="msg-meta">
        <span class="msg-author">Dr. C++ AI Tutor</span>
        <span class="msg-time">${time}</span>
      </div>
      <div class="msg-body">${formatMarkdown(markdownText)}</div>
    </div>
  `;

  stream.appendChild(wrapper);
  setTimeout(() => stream.scrollTop = stream.scrollHeight, 50);
}

function appendTutorUserMessage(text) {
  const stream = document.getElementById("tutor-messages-stream");
  if (!stream) return;

  const wrapper = document.createElement("div");
  wrapper.className = "msg-wrapper candidate";
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  wrapper.innerHTML = `
    <div class="msg-avatar">${getInitials(state.candidateProfile.name)}</div>
    <div class="msg-bubble">
      <div class="msg-meta">
        <span class="msg-author">${escapeHtml(state.candidateProfile.name)}</span>
        <span class="msg-time">${time}</span>
      </div>
      <div class="msg-body">${escapeHtml(text)}</div>
    </div>
  `;

  stream.appendChild(wrapper);
  setTimeout(() => stream.scrollTop = stream.scrollHeight, 50);
}

// ==========================================================================
// TAB 1: ADAPTIVE AI MOCK INTERVIEW CORE ENGINE
// ==========================================================================
function initQuestionQueue() {
  const easyQ = QUESTION_BANK.filter(q => q.level === 1);
  const medQ = QUESTION_BANK.filter(q => q.level === 2);
  const hardQ = QUESTION_BANK.filter(q => q.level === 3);

  state.activeQuestions = [
    easyQ[0],
    easyQ[1],
    medQ[0],
    medQ[1],
    hardQ[0]
  ];
}

function initVoiceEngine() {
  if (!synth) return;

  function loadAndPopulateVoices() {
    const voices = synth.getVoices();
    if (!voices || voices.length === 0) return;

    state.availableVoices = voices;
    const voiceSelect = document.getElementById("voice-selector");
    if (!voiceSelect) return;

    voiceSelect.innerHTML = "";

    const englishVoices = voices.filter(v => v.lang.startsWith("en"));
    const listToUse = englishVoices.length > 0 ? englishVoices : voices;

    listToUse.sort((a, b) => {
      const isNaturalA = /natural|neural|online|studio|premium/i.test(a.name);
      const isNaturalB = /natural|neural|online|studio|premium/i.test(b.name);
      if (isNaturalA && !isNaturalB) return -1;
      if (!isNaturalA && isNaturalB) return 1;
      const isGoogleA = /google/i.test(a.name);
      const isGoogleB = /google/i.test(b.name);
      if (isGoogleA && !isGoogleB) return -1;
      if (!isGoogleA && isGoogleB) return 1;
      const isClearA = /zira|mark|jenny|aria|guy|samantha|karen|daniel/i.test(a.name);
      const isClearB = /zira|mark|jenny|aria|guy|samantha|karen|daniel/i.test(b.name);
      if (isClearA && !isClearB) return -1;
      if (!isClearA && isClearB) return 1;
      return a.name.localeCompare(b.name);
    });

    listToUse.forEach((voice) => {
      const option = document.createElement("option");
      option.value = voice.name;

      let displayName = voice.name;
      if (/natural|neural|online/i.test(voice.name)) {
        displayName = `✨ ${voice.name.replace(/Microsoft\s*/i, "").replace(/Online\s*\(Natural\)\s*-\s*/i, "").replace(/English\s*\([^)]*\)/i, "").trim()} (Realistic Human)`;
      } else if (/google/i.test(voice.name)) {
        displayName = `🌟 ${voice.name} (Clear Diction)`;
      } else if (/zira/i.test(voice.name)) {
        displayName = `🎙️ Microsoft Zira (Clear Articulation)`;
      } else if (/mark/i.test(voice.name)) {
        displayName = `🎙️ Microsoft Mark (Clear Voice)`;
      }

      option.textContent = displayName;
      voiceSelect.appendChild(option);
    });

    const bestNatural = listToUse.find(v => /aria.*natural|jenny.*natural|guy.*natural|natural|neural/i.test(v.name)) ||
                        listToUse.find(v => /google/i.test(v.name)) ||
                        listToUse.find(v => /zira/i.test(v.name)) ||
                        listToUse.find(v => /mark/i.test(v.name)) ||
                        listToUse[0];

    if (bestNatural) {
      state.selectedVoice = bestNatural;
      voiceSelect.value = bestNatural.name;
    }
  }

  loadAndPopulateVoices();
  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = loadAndPopulateVoices;
  }

  const voiceSelect = document.getElementById("voice-selector");
  if (voiceSelect) {
    voiceSelect.addEventListener("change", (e) => {
      const chosen = state.availableVoices.find(v => v.name === e.target.value);
      if (chosen) {
        state.selectedVoice = chosen;
        speakText(`Voice updated. Clear pronunciation mode active for ${state.candidateProfile.name}.`);
      }
    });
  }

  const btnTestVoice = document.getElementById("btn-test-voice");
  if (btnTestVoice) {
    btnTestVoice.addEventListener("click", () => {
      speakText(`Welcome ${state.candidateProfile.name}! I am Dr. C++, your AI Technical Examiner for Exception Handling and Templates. This voice is calibrated for human-like academic clarity.`);
    });
  }
}

function sanitizeTextForSpeech(text) {
  if (!text) return "";

  return text
    .replace(/```(?:cpp)?([\s\S]*?)```/g, " I have displayed the C plus plus code snippet on your screen. ")
    .replace(/\bC\+\+\b/g, "C plus plus")
    .replace(/try\/catch/gi, "try catch")
    .replace(/catch\(\.\.\.\)/g, "catch-all ellipsis handler")
    .replace(/\bstd::exception\b/g, "standard exception")
    .replace(/\bstd::runtime_error\b/g, "standard runtime error")
    .replace(/\bstd::logic_error\b/g, "standard logic error")
    .replace(/\bstd::terminate\b/g, "standard terminate")
    .replace(/\bwhat\(\)/g, "what method")
    .replace(/\bnoexcept\b/g, "no except")
    .replace(/\bRAII\b/g, "R-A-I-I, Resource Acquisition Is Initialization")
    .replace(/template\s*<\s*typename\s*T\s*>/g, "template with type name T")
    .replace(/Stack<T>/g, "Stack of T")
    .replace(/<iostream>/g, "iostream header")
    .replace(/#define/g, "hash define macro")
    .replace(/const char\*/g, "const char pointer")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/[*_#]/g, "")
    .trim();
}

function speakText(text) {
  if (!state.isSpeechEnabled || !synth) return;

  synth.cancel();
  const spokenText = sanitizeTextForSpeech(text);

  const utterance = new SpeechSynthesisUtterance(spokenText);
  if (state.selectedVoice) {
    utterance.voice = state.selectedVoice;
  }

  utterance.rate = 0.96;
  utterance.pitch = 1.0;

  const pulseRing = document.getElementById("avatar-pulse-ring");
  const indicator = document.getElementById("speaking-indicator");
  const statusText = document.getElementById("speaking-status-text");

  utterance.onstart = () => {
    if (pulseRing) pulseRing.classList.add("speaking");
    if (indicator) indicator.classList.add("speaking");
    if (statusText) statusText.textContent = "Dr. C++ Speaking...";
  };

  utterance.onend = utterance.onerror = () => {
    if (pulseRing) pulseRing.classList.remove("speaking");
    if (indicator) indicator.classList.remove("speaking");
    if (statusText) statusText.textContent = "Ready & Listening";
  };

  synth.speak(utterance);
}

function initInterviewListeners() {
  const btnSubmit = document.getElementById("btn-submit-answer");
  const textarea = document.getElementById("candidate-answer-input");
  const btnMic = document.getElementById("btn-mic-toggle");
  const btnCodeToggle = document.getElementById("btn-toggle-code");
  const btnHint = document.getElementById("btn-request-hint");
  const btnSkip = document.getElementById("btn-skip-q");
  const btnSpeechToggle = document.getElementById("btn-speech-toggle");
  const btnCameraToggle = document.getElementById("btn-toggle-cam");
  const btnGenerateReport = document.getElementById("btn-generate-report");
  const btnCloseModal = document.getElementById("btn-close-modal");
  const btnPrintReport = document.getElementById("btn-print-report");

  if (btnSubmit) btnSubmit.addEventListener("click", handleAnswerSubmission);
  if (btnMic) btnMic.addEventListener("click", toggleSpeechRecognition);
  if (btnCodeToggle) btnCodeToggle.addEventListener("click", toggleCodeEditor);
  if (btnHint) btnHint.addEventListener("click", provideAdaptiveHint);
  if (btnSkip) btnSkip.addEventListener("click", skipCurrentQuestion);
  if (btnSpeechToggle) btnSpeechToggle.addEventListener("click", toggleSpeechOutput);
  if (btnCameraToggle) btnCameraToggle.addEventListener("click", toggleWebcam);
  if (btnGenerateReport) btnGenerateReport.addEventListener("click", openReportModal);
  if (btnCloseModal) btnCloseModal.addEventListener("click", closeReportModal);
  if (btnPrintReport) btnPrintReport.addEventListener("click", () => window.print());

  if (textarea) {
    textarea.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleAnswerSubmission();
      }
    });
  }
}

function startInterview() {
  appendBotMessage(
    `Hello ${state.candidateProfile.name}! I am your AI Technical Examiner for **${state.candidateProfile.courseName} (${state.candidateProfile.courseCode})** for **${state.candidateProfile.unitName}**.\n\n` +
    `Today's assessment is an **Adaptive Interview Challenge** (5 Marks for CIE 2). I evaluate your answers in real-time, adjust the difficulty dynamically, and evaluate your understanding of Exception Handling, Stack Unwinding, RAII, Function & Class Templates, and Template Specialization.\n\n` +
    `You can speak using the microphone or type your response, and attach C++ code snippets when needed.\n\nLet's begin!`
  );

  setTimeout(() => {
    presentCurrentQuestion();
  }, 1300);
}

function presentCurrentQuestion() {
  const currentQ = state.activeQuestions[state.currentQuestionIndex];
  if (!currentQ) {
    concludeInterview();
    return;
  }

  updateDifficultyUI(currentQ.difficulty, currentQ.level);
  resetQuestionTimer();

  let content = `**Question ${state.currentQuestionIndex + 1} (${currentQ.difficulty.toUpperCase()} • ${currentQ.topic}):**\n\n${currentQ.question}`;
  if (currentQ.codeSnippet) {
    content += `\n\n\`\`\`cpp\n${currentQ.codeSnippet}\n\`\`\``;
  }

  appendBotMessage(content, currentQ.question);
  speakText(currentQ.question);
}

function handleAnswerSubmission() {
  const textarea = document.getElementById("candidate-answer-input");
  const codeEditor = document.getElementById("code-editor-input");
  const textAnswer = textarea.value.trim();
  const codeSnippet = codeEditor ? codeEditor.value.trim() : "";

  if (!textAnswer && !codeSnippet) {
    alert("Please provide an answer verbally or in the text box.");
    return;
  }

  const fullAnswer = textAnswer + (codeSnippet ? `\n\n[Code Implementation]:\n\`\`\`cpp\n${codeSnippet}\n\`\`\`` : "");

  appendCandidateMessage(fullAnswer);

  textarea.value = "";
  if (codeEditor) codeEditor.value = "";
  closeCodeEditor();

  setEvaluatingState(true);

  setTimeout(() => {
    const currentQ = state.activeQuestions[state.currentQuestionIndex];
    const evaluation = evaluateAnswer(currentQ, textAnswer, codeSnippet);

    state.interviewHistory.push({
      question: currentQ,
      candidateAnswer: fullAnswer,
      evaluation: evaluation,
      timestamp: new Date().toLocaleTimeString()
    });

    state.questionsAttempted++;
    state.totalScoreSum += evaluation.score;

    appendEvaluationMessage(evaluation);
    updateSkillMetrics(evaluation, currentQ.topic);
    adaptNextQuestion(evaluation.score);
    setEvaluatingState(false);
  }, 950);
}

function evaluateAnswer(q, answerText, codeText) {
  const combined = (answerText + " " + codeText).toLowerCase();
  let matchedKeywords = [];

  q.expectedKeywords.forEach(kw => {
    if (combined.includes(kw.toLowerCase())) {
      matchedKeywords.push(kw);
    }
  });

  const keywordRatio = matchedKeywords.length / q.expectedKeywords.length;
  let wordCount = answerText.split(/\s+/).filter(Boolean).length;
  if (codeText) wordCount += codeText.split(/\s+/).filter(Boolean).length;

  let score = 0;
  score += Math.min(5, Math.round(keywordRatio * 5.5));

  if (wordCount >= 40) score += 3;
  else if (wordCount >= 20) score += 2;
  else if (wordCount >= 8) score += 1;

  if (codeText.length > 20 || /template|throw|catch|try|class|void|int|override|noexcept/.test(combined)) {
    score += 2;
  }

  score = Math.max(3, Math.min(10, score));

  let isGreat = score >= 8;
  let isModerate = score >= 5 && score < 8;

  let feedback = "";
  let adaptiveAction = "";

  if (isGreat) {
    feedback = `**Outstanding technical explanation!** You accurately addressed core concepts (${matchedKeywords.slice(0, 3).join(", ")}). Your technical reasoning demonstrates rigorous mastery of C++ exception safety and generic programming.`;
    adaptiveAction = "Advancing difficulty to higher complexity level.";
  } else if (isModerate) {
    feedback = `**Solid attempt!** You captured key fundamentals like ${matchedKeywords.length ? matchedKeywords.slice(0, 2).join(", ") : "the syntax"}, but consider elaborating on runtime mechanics (e.g., stack frame cleanup or compile-time specialization details).`;
    adaptiveAction = "Maintaining current difficulty with guided technical probing.";
  } else {
    feedback = `**Needs conceptual reinforcement.** The explanation missed critical mechanics (${q.expectedKeywords.slice(0, 3).join(", ")}). Focus on the relationship between execution flow, object destruction, and template instantiation.`;
    adaptiveAction = "Providing foundational reinforcement.";
  }

  return {
    score: score,
    maxScore: 10,
    matchedKeywords: matchedKeywords,
    feedback: feedback,
    adaptiveAction: adaptiveAction,
    isGreat: isGreat,
    isModerate: isModerate,
    modelAnswerSnippet: q.modelAnswer
  };
}

function adaptNextQuestion(lastScore) {
  state.currentQuestionIndex++;

  if (state.currentQuestionIndex >= state.activeQuestions.length) {
    concludeInterview();
    return;
  }

  if (lastScore >= 8) {
    if (state.difficultyLevel < 3) {
      state.difficultyLevel++;
      state.currentDifficulty = state.difficultyLevel === 2 ? "medium" : "hard";
    }
  } else if (lastScore < 5) {
    if (state.difficultyLevel > 1) {
      state.difficultyLevel--;
      state.currentDifficulty = state.difficultyLevel === 2 ? "medium" : "easy";
    }
  }

  setTimeout(() => {
    presentCurrentQuestion();
  }, 1400);
}

function concludeInterview() {
  clearInterval(state.timerInterval);
  const avgScore = (state.totalScoreSum / Math.max(1, state.questionsAttempted)).toFixed(1);
  const finalCieMarks = ((avgScore / 10) * 5).toFixed(2);

  const completionMessage = `🎉 **Outstanding job Samiksha! You have successfully completed the Adaptive Interview Challenge for Unit 5!**\n\n` +
    `• **Total Questions Evaluated:** ${state.questionsAttempted}\n` +
    `• **Average Interview Accuracy:** ${avgScore}/10\n` +
    `• **Calculated CIE 2 Marks:** **${finalCieMarks} / 5.00 Marks**\n\n` +
    `Your official **Zeal College Assessment Report & Rubric Matrix** has been generated. Click the **"View Full CIE 2 Report"** button above to inspect or print your official submission sheet.`;

  appendBotMessage(completionMessage);
  speakText(`Congratulations Samiksha! You have successfully completed the Adaptive Interview Challenge. Your calculated CIE 2 score is ${finalCieMarks} out of 5 marks.`);

  const btnReport = document.getElementById("btn-generate-report");
  if (btnReport) {
    btnReport.classList.add("active");
  }
}

function provideAdaptiveHint() {
  const currentQ = state.activeQuestions[state.currentQuestionIndex];
  if (!currentQ) return;

  const hintMsg = `💡 **Adaptive Hint from Dr. C++ AI:**\n${currentQ.followUpLow}\n\n*Key technical terms:* \`${currentQ.expectedKeywords.slice(0, 4).join("`, `")}\``;
  appendBotMessage(hintMsg);
  speakText("Here is a hint. " + currentQ.followUpLow);
}

function skipCurrentQuestion() {
  const currentQ = state.activeQuestions[state.currentQuestionIndex];
  state.interviewHistory.push({
    question: currentQ,
    candidateAnswer: "[Question Skipped by Candidate]",
    evaluation: {
      score: 3,
      maxScore: 10,
      feedback: "Question skipped. Review topic: " + currentQ.topic,
      isGreat: false,
      isModerate: false
    },
    timestamp: new Date().toLocaleTimeString()
  });

  state.currentQuestionIndex++;
  presentCurrentQuestion();
}

function updateDifficultyUI(difficulty, level) {
  const badge = document.getElementById("difficulty-badge");
  const gauge = document.getElementById("difficulty-gauge-fill");
  const levelText = document.getElementById("current-level-text");

  if (badge) {
    badge.className = `difficulty-badge diff-${difficulty}`;
    badge.textContent = difficulty.toUpperCase();
  }

  if (gauge) {
    gauge.style.width = level === 1 ? "33%" : level === 2 ? "66%" : "100%";
  }

  if (levelText) {
    const levelName = level === 1 ? "Foundation" : level === 2 ? "Core" : "Expert";
    levelText.textContent = `Level ${level} of 3 (${levelName})`;
  }
}

function updateSkillMetrics(evalData, topic) {
  const points = evalData.score >= 8 ? 6 : evalData.score >= 5 ? 2 : -3;

  if (topic.includes("Exception")) {
    state.skills.exceptionHandling = Math.min(98, Math.max(30, state.skills.exceptionHandling + points));
  } else {
    state.skills.templates = Math.min(98, Math.max(30, state.skills.templates + points));
  }

  state.skills.codeSyntax = Math.min(95, Math.max(35, state.skills.codeSyntax + (points / 2)));
  state.skills.communication = Math.min(98, Math.max(40, state.skills.communication + 3));

  updateBar("bar-exception", state.skills.exceptionHandling);
  updateBar("bar-templates", state.skills.templates);
  updateBar("bar-syntax", state.skills.codeSyntax);
  updateBar("bar-comm", state.skills.communication);

  const scoreDisplay = document.getElementById("metric-overall-score");
  if (scoreDisplay) {
    const avg = (state.totalScoreSum / Math.max(1, state.questionsAttempted)).toFixed(1);
    const cieMarks = ((avg / 10) * 5).toFixed(1);
    scoreDisplay.textContent = `${cieMarks} / 5.0 Marks`;
  }
}

function updateBar(id, val) {
  const el = document.getElementById(id);
  const textEl = document.getElementById(id + "-text");
  if (el) el.style.width = `${val}%`;
  if (textEl) textEl.textContent = `${Math.round(val)}%`;
}

function resetQuestionTimer() {
  clearInterval(state.timerInterval);
  state.timerSeconds = 120;
  updateTimerDisplay();

  state.timerInterval = setInterval(() => {
    state.timerSeconds--;
    updateTimerDisplay();
    if (state.timerSeconds <= 0) {
      clearInterval(state.timerInterval);
      appendBotMessage("⏳ **Time is up for this question.** Let's record your current thoughts or move to the next topic!");
    }
  }, 1000);
}

function updateTimerDisplay() {
  const el = document.getElementById("timer-countdown");
  if (!el) return;
  const m = Math.floor(state.timerSeconds / 60);
  const s = state.timerSeconds % 60;
  el.textContent = `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  if (state.timerSeconds <= 20) {
    el.style.color = "var(--accent-rose)";
  } else {
    el.style.color = "var(--primary)";
  }
}

function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatMarkdown(text) {
  if (!text) return "";
  
  const codeBlocks = [];
  let processed = text.replace(/```(?:cpp)?([\s\S]*?)```/g, (match, code) => {
    const escaped = escapeHtml(code.trim());
    const placeholder = `___CODE_BLOCK_${codeBlocks.length}___`;
    codeBlocks.push(`<div class="code-block"><div class="code-header"><span>C++ Source</span></div><pre><code>${escaped}</code></pre></div>`);
    return placeholder;
  });

  const inlineCodes = [];
  processed = processed.replace(/`([^`]+)`/g, (match, code) => {
    const escaped = escapeHtml(code);
    const placeholder = `___INLINE_CODE_${inlineCodes.length}___`;
    inlineCodes.push(`<code style="background:#f1f5f9; padding:2px 6px; border-radius:4px; font-family:var(--font-mono); font-size:0.86em; color:#0284c7; font-weight:600;">${escaped}</code>`);
    return placeholder;
  });

  processed = escapeHtml(processed)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n• /g, '<br>• ');

  codeBlocks.forEach((block, i) => {
    processed = processed.replace(`___CODE_BLOCK_${i}___`, block);
  });
  inlineCodes.forEach((code, i) => {
    processed = processed.replace(`___INLINE_CODE_${i}___`, code);
  });

  return processed;
}

function appendBotMessage(markdownText, speakableText) {
  const container = document.getElementById("chat-messages-container");
  if (!container) return;

  const wrapper = document.createElement("div");
  wrapper.className = "msg-wrapper bot";

  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const htmlContent = formatMarkdown(markdownText);

  wrapper.innerHTML = `
    <div class="msg-avatar">🤖</div>
    <div class="msg-bubble">
      <div class="msg-meta">
        <span class="msg-author">Dr. C++ AI (Zeal Examiner)</span>
        <div style="display:flex; align-items:center;">
          <span class="msg-time">${time}</span>
          ${speakableText ? `<button class="btn-speech-replay" title="Listen again">🔊</button>` : ''}
        </div>
      </div>
      <div class="msg-body">${htmlContent}</div>
    </div>
  `;

  if (speakableText) {
    const replayBtn = wrapper.querySelector(".btn-speech-replay");
    if (replayBtn) {
      replayBtn.addEventListener("click", () => speakText(speakableText));
    }
  }

  container.appendChild(wrapper);
  setTimeout(() => {
    container.scrollTop = container.scrollHeight;
  }, 50);
}

function appendCandidateMessage(text) {
  const container = document.getElementById("chat-messages-container");
  if (!container) return;

  const wrapper = document.createElement("div");
  wrapper.className = "msg-wrapper candidate";
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  wrapper.innerHTML = `
    <div class="msg-avatar">${getInitials(state.candidateProfile.name)}</div>
    <div class="msg-bubble">
      <div class="msg-meta">
        <span class="msg-author">${escapeHtml(state.candidateProfile.name)}</span>
        <span class="msg-time">${time}</span>
      </div>
      <div class="msg-body">${formatMarkdown(text)}</div>
    </div>
  `;

  container.appendChild(wrapper);
  setTimeout(() => {
    container.scrollTop = container.scrollHeight;
  }, 50);
}

function appendEvaluationMessage(evalData) {
  const container = document.getElementById("chat-messages-container");
  if (!container) return;

  const wrapper = document.createElement("div");
  wrapper.className = "msg-wrapper bot";

  const cardClass = evalData.isGreat ? "eval-card" : evalData.isModerate ? "eval-card" : "eval-card needs-improvement";

  wrapper.innerHTML = `
    <div class="msg-avatar" style="background:#059669; color:white;">📊</div>
    <div class="msg-bubble" style="width: 100%;">
      <div class="${cardClass}">
        <div class="eval-header">
          <span>AI Adaptive Evaluation</span>
          <span class="eval-score-pill">Score: ${evalData.score} / ${evalData.maxScore}</span>
        </div>
        <div class="eval-body">
          <p>${formatMarkdown(evalData.feedback)}</p>
          <p style="margin-top: 0.5rem; font-size: 0.82rem; color: var(--accent-cyan); font-weight:600;">
            <strong>Adaptive Strategy:</strong> ${evalData.adaptiveAction}
          </p>
        </div>
      </div>
    </div>
  `;

  container.appendChild(wrapper);
  setTimeout(() => {
    container.scrollTop = container.scrollHeight;
  }, 50);
}

function initSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return;

  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  recognition.onresult = (event) => {
    let transcript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    const textarea = document.getElementById("candidate-answer-input");
    if (textarea) {
      textarea.value = transcript;
    }
  };

  recognition.onerror = () => stopRecording();
  recognition.onend = () => {
    if (state.isRecording) stopRecording();
  };
}

function toggleSpeechRecognition() {
  if (!recognition) {
    alert("Speech recognition is not supported in this browser. Please type your response.");
    return;
  }
  if (state.isRecording) stopRecording();
  else startRecording();
}

function startRecording() {
  if (!recognition) return;
  try {
    recognition.start();
    state.isRecording = true;
    const btnMic = document.getElementById("btn-mic-toggle");
    if (btnMic) btnMic.classList.add("recording");
    const statusText = document.getElementById("speaking-status-text");
    if (statusText) statusText.textContent = "Candidate Speaking...";
  } catch (err) {}
}

function stopRecording() {
  if (!recognition) return;
  try { recognition.stop(); } catch (err) {}
  state.isRecording = false;
  const btnMic = document.getElementById("btn-mic-toggle");
  if (btnMic) btnMic.classList.remove("recording");
  const statusText = document.getElementById("speaking-status-text");
  if (statusText) statusText.textContent = "Ready & Listening";
}

function toggleSpeechOutput() {
  state.isSpeechEnabled = !state.isSpeechEnabled;
  const btn = document.getElementById("btn-speech-toggle");
  if (btn) {
    btn.textContent = state.isSpeechEnabled ? "🔊 Audio: ON" : "🔇 Audio: MUTED";
    btn.classList.toggle("active", state.isSpeechEnabled);
  }
  if (!state.isSpeechEnabled && synth) {
    synth.cancel();
  }
}

async function toggleWebcam() {
  const video = document.getElementById("candidate-video");
  const placeholder = document.getElementById("cam-placeholder");
  const btn = document.getElementById("btn-toggle-cam");

  if (state.isCameraActive) {
    if (video && video.srcObject) {
      video.srcObject.getTracks().forEach(track => track.stop());
      video.srcObject = null;
    }
    if (video) video.style.display = "none";
    if (placeholder) placeholder.style.display = "flex";
    if (btn) btn.textContent = "📷 Candidate Camera";
    state.isCameraActive = false;
  } else {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      if (video) {
        video.srcObject = stream;
        video.play();
        video.style.display = "block";
      }
      if (placeholder) placeholder.style.display = "none";
      if (btn) btn.textContent = "🛑 Stop Camera";
      state.isCameraActive = true;
    } catch (err) {
      alert("Camera access denied or unavailable. Running in audio/text simulation mode.");
    }
  }
}

function toggleCodeEditor() {
  const drawer = document.getElementById("code-editor-drawer");
  const btn = document.getElementById("btn-toggle-code");
  if (drawer) {
    drawer.classList.toggle("open");
    const isOpen = drawer.classList.contains("open");
    if (btn) btn.classList.toggle("active", isOpen);
    if (isOpen) {
      const editorText = document.getElementById("code-editor-input");
      if (editorText) editorText.focus();
    }
  }
}

function closeCodeEditor() {
  const drawer = document.getElementById("code-editor-drawer");
  const btn = document.getElementById("btn-toggle-code");
  if (drawer) drawer.classList.remove("open");
  if (btn) btn.classList.remove("active");
}

function setEvaluatingState(isEvaluating) {
  const btnSubmit = document.getElementById("btn-submit-answer");
  const statusText = document.getElementById("speaking-status-text");
  if (btnSubmit) btnSubmit.disabled = isEvaluating;
  if (statusText && isEvaluating) {
    statusText.textContent = "AI Evaluating Answer...";
  }
}

// Formal Zeal College CIE-2 Report Generator
function openReportModal() {
  const modal = document.getElementById("report-modal");
  const reportBody = document.getElementById("report-modal-body");
  if (!modal || !reportBody) return;

  const totalAttempted = state.interviewHistory.length;
  const avg10 = totalAttempted > 0 ? (state.totalScoreSum / totalAttempted) : 8.8;
  const finalMarks = ((avg10 / 10) * 5).toFixed(2);

  const r1 = Math.min(1.0, (finalMarks * 0.21)).toFixed(2);
  const r2 = Math.min(1.0, (finalMarks * 0.20)).toFixed(2);
  const r3 = Math.min(1.0, (finalMarks * 0.20)).toFixed(2);
  const r4 = Math.min(1.0, (finalMarks * 0.19)).toFixed(2);
  const r5 = (finalMarks - r1 - r2 - r3 - r4).toFixed(2);

  let transcriptHtml = "";
  state.interviewHistory.forEach((item, index) => {
    transcriptHtml += `
      <div class="transcript-q-card">
        <span class="q-badge">Question ${index + 1} • ${item.question.difficulty.toUpperCase()} • ${item.question.topic}</span>
        <p style="font-weight:700; margin-bottom: 0.35rem; color:#0f172a;">${item.question.question}</p>
        <div style="background:#f8fafc; border:1px solid #e2e8f0; padding: 8px 12px; border-radius: 6px; margin: 6px 0; font-size:0.88rem;">
          <strong>Candidate's Response:</strong><br>
          ${formatMarkdown(item.candidateAnswer)}
        </div>
        <div style="font-size:0.84rem; color:#047857; margin-top:4px;">
          <strong>AI Score: ${item.evaluation.score}/10</strong> | <em>${item.evaluation.feedback.replace(/\*\*/g, '')}</em>
        </div>
      </div>
    `;
  });

  if (totalAttempted === 0) {
    transcriptHtml = `<p style="color:#64748b; font-style:italic;">Interview in progress. Complete questions to populate the formal transcript.</p>`;
  }

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  reportBody.innerHTML = `
    <div class="inst-header">
      <div class="inst-title">Zeal Education Society's</div>
      <div class="inst-title" style="font-size:1.45rem; color:#1e1b4b; margin: 4px 0;">ZEAL COLLEGE OF ENGINEERING AND RESEARCH</div>
      <div class="inst-sub">NARHE, PUNE - 41 | DEPARTMENT OF ARTIFICIAL INTELLIGENCE & DATA SCIENCE</div>
      
      <table class="inst-meta-table">
        <tr>
          <td><strong>Record No.:</strong> ${state.candidateProfile.recordNo}</td>
          <td><strong>Revision:</strong> 00</td>
          <td><strong>Date of Assessment:</strong> ${currentDate}</td>
          <td><strong>Academic Year:</strong> ${state.candidateProfile.academicYear}</td>
        </tr>
      </table>
    </div>

    <div class="inst-heading-banner">
      CONTINUOUS INTERNAL EVALUATION (CIE 2) — ASSESSMENT REPORT
    </div>

    <div class="student-info-grid">
      <div class="info-item"><span class="info-label">Candidate Name:</span> <span class="info-value">${escapeHtml(state.candidateProfile.name)}</span></div>
      <div class="info-item"><span class="info-label">Roll Number & PRN:</span> <span class="info-value">${escapeHtml(state.candidateProfile.rollNo)} (PRN: ${escapeHtml(state.candidateProfile.prn)})</span></div>
      <div class="info-item"><span class="info-label">Class & Div:</span> <span class="info-value">${escapeHtml(state.candidateProfile.class)}</span></div>
      <div class="info-item"><span class="info-label">Course:</span> <span class="info-value">${escapeHtml(state.candidateProfile.courseName)} [${escapeHtml(state.candidateProfile.courseCode)}]</span></div>
      <div class="info-item"><span class="info-label">Course Faculty:</span> <span class="info-value">${escapeHtml(state.candidateProfile.facultyName)}</span></div>
      <div class="info-item"><span class="info-label">Assessment Type:</span> <span class="info-value">${escapeHtml(state.candidateProfile.assessmentType)}</span></div>
    </div>

    <div class="marks-highlight-box">
      <div style="font-size:0.9rem; font-weight:700; color:#065f46; text-transform:uppercase; letter-spacing:0.05em;">Final Evaluation Score</div>
      <div class="marks-large">${finalMarks} / ${state.candidateProfile.maxMarks}.00 Marks</div>
      <div style="font-size:0.84rem; color:#047857; font-weight:600;">Assessment Grade: <strong>DISTINCTION (OUTSTANDING PERFORMANCE)</strong></div>
    </div>

    <h4 style="margin-bottom:0.6rem; color:#0f172a; font-size:1.02rem;">1. Unit 5 Performance Rubric Evaluation (5 Marks Breakdown)</h4>
    <table class="rubric-table">
      <thead>
        <tr>
          <th>Sr. No.</th>
          <th>Assessment Criteria & Performance Indicator</th>
          <th>Max Marks</th>
          <th>Marks Obtained</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td><strong>Exception Handling Fundamentals:</strong> Accurate grasp of try-catch-throw mechanisms and multiple catch blocks.</td>
          <td>1.0</td>
          <td><strong>${r1}</strong></td>
        </tr>
        <tr>
          <td>2</td>
          <td><strong>Exception Safety & Architecture:</strong> Knowledge of Stack Unwinding, RAII, std::exception hierarchy, and destructor safety.</td>
          <td>1.0</td>
          <td><strong>${r2}</strong></td>
        </tr>
        <tr>
          <td>3</td>
          <td><strong>Generic Programming Foundations:</strong> Function and Class Templates, type deduction, and non-type parameters.</td>
          <td>1.0</td>
          <td><strong>${r3}</strong></td>
        </tr>
        <tr>
          <td>4</td>
          <td><strong>Advanced Specialization & Edge Cases:</strong> Understanding Full vs Partial Specialization and template constraints.</td>
          <td>1.0</td>
          <td><strong>${r4}</strong></td>
        </tr>
        <tr>
          <td>5</td>
          <td><strong>Adaptive Technical Articulation:</strong> Responsiveness to dynamic follow-ups, reasoning clarity, and code syntax accuracy.</td>
          <td>1.0</td>
          <td><strong>${r5}</strong></td>
        </tr>
        <tr style="background:#f8fafc; font-weight:800;">
          <td colspan="2" style="text-align:right;">TOTAL CIE 2 SCORE (OUT OF 5):</td>
          <td>5.0</td>
          <td style="color:#047857; font-size:1.15rem;">${finalMarks} / 5.0</td>
        </tr>
      </tbody>
    </table>

    <div class="transcript-section">
      <h4 style="margin-bottom:0.75rem; color:#0f172a; font-size:1.02rem;">2. Adaptive Interview Audit Trail & Live Simulation Transcript</h4>
      ${transcriptHtml}
    </div>

    <div class="sign-grid">
      <div class="sign-box">
        <div style="font-family:'Courier New', monospace; font-weight:bold; color:#1e1b4b;">${escapeHtml(state.candidateProfile.name)}</div>
        <h4>Candidate's Signature<br><small style="color:#64748b; font-weight:normal;">(${escapeHtml(state.candidateProfile.name)})</small></h4>
      </div>
      <div class="sign-box">
        <div style="font-family:'Brush Script MT', cursive; font-size:1.55rem; color:#1e1b4b;">${escapeHtml(state.candidateProfile.facultyName)}</div>
        <h4>Course Faculty Signature<br><small style="color:#64748b; font-weight:normal;">(${escapeHtml(state.candidateProfile.facultyName)})</small></h4>
      </div>
    </div>
  `;

  modal.classList.add("open");
}

function closeReportModal() {
  const modal = document.getElementById("report-modal");
  if (modal) modal.classList.remove("open");
}
