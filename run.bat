@echo off
title CodeAI - Adaptive C++ Learning Space & AI Mock Interview Studio
echo =========================================================================
echo Zeal Education Society's Zeal College of Engineering and Research, Pune
echo Department of Artificial Intelligence and Data Science
echo CIE-2 Unit 5: Exception Handling and Templates
echo Candidate: Samiksha Kakade ^| Faculty: Mr. Chandan Prasad
echo =========================================================================
echo.
echo Launching CodeAI Studio...
echo.

where node >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Node.js detected. Starting production server on port 3000...
    start http://localhost:3000
    node server.js
    goto end
)

where python >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Python detected. Starting local server on port 8080...
    start http://localhost:8080
    python -m http.server 8080
    goto end
)

echo Opening web application directly in default browser...
start index.html

:end
pause
