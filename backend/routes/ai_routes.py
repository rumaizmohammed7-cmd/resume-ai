from fastapi import APIRouter, HTTPException, Body
from typing import Dict, Any
from services.ai_service import (
    generate_professional_summary,
    improve_bullet_point,
    improve_project_description,
    analyze_job_and_ats
)

router = APIRouter(prefix="/api/ai", tags=["AI Engine"])

@router.post("/generate-summary")
async def generate_summary(payload: Dict[str, Any] = Body(...)):
    """Generate an ATS-tailored professional summary from provided profile facts."""
    try:
        summary = generate_professional_summary(payload)
        return {"summary": summary}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/improve-bullet")
async def improve_bullet(payload: Dict[str, Any] = Body(...)):
    """Polish work experience bullet point with strong action verbs without fabricating metrics."""
    bullet = payload.get("bullet", "")
    job_title = payload.get("job_title", "")
    if not bullet:
        raise HTTPException(status_code=400, detail="Bullet point text is required")
        
    improved = improve_bullet_point(bullet, job_title)
    return {"improved_bullet": improved}

@router.post("/improve-project")
async def improve_project(payload: Dict[str, Any] = Body(...)):
    """Refine project description and tech stack wording."""
    description = payload.get("description", "")
    technologies = payload.get("technologies", [])
    improved = improve_project_description(description, technologies)
    return {"improved_description": improved}

@router.post("/analyze-job-ats")
async def analyze_job_ats(payload: Dict[str, Any] = Body(...)):
    """Analyze job description against user profile and return ATS score & missing skills."""
    job_description = payload.get("job_description", "")
    target_title = payload.get("target_title", "")
    user_profile = payload.get("user_profile", {})
    
    result = analyze_job_and_ats(job_description, user_profile, target_title)
    return result
