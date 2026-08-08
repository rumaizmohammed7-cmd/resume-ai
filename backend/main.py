from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import ai_routes, resume_routes

app = FastAPI(
    title="ResumeAI API",
    description="AI-powered ATS Resume Builder Backend",
    version="1.0.0"
)

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ai_routes.router)
app.include_router(resume_routes.router)

@app.get("/")
async def root():
    return {
        "status": "online",
        "app": "ResumeAI Backend",
        "features": ["ATS Analysis", "AI Summarizer", "Bullet Optimizer", "Resume Management"]
    }

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
