@echo off
title Starting ResumeAI...
echo ==================================================
echo              Starting ResumeAI App
echo ==================================================
echo.

:: 1. Start FastAPI Backend Server
echo Starting Backend API on port 8000...
start "ResumeAI Backend API" cmd /k "cd /d "C:\Users\mohammed rumaiz\.gemini\antigravity\scratch\resume-ai\backend" && "C:\Users\mohammed rumaiz\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe" -m uvicorn main:app --reload"

:: 2. Start React Frontend Dev Server
echo Starting Frontend App on port 3000...
start "ResumeAI Frontend App" cmd /k "cd /d "C:\Users\mohammed rumaiz\.gemini\antigravity\scratch\resume-ai\frontend" && set "PATH=C:\Users\mohammed rumaiz\AppData\Local\OpenAI\Codex\runtimes\cua_node\f1bf3cd3a5929acd\bin;%PATH%" && npm.cmd run dev"

:: 3. Wait 3 seconds and open Browser
timeout /t 3 /nobreak >nul
start http://localhost:3000

echo.
echo ResumeAI is now running at http://localhost:3000
