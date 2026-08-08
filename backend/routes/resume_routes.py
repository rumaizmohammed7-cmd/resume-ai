from fastapi import APIRouter, HTTPException, Body
from typing import Dict, Any, List
import uuid
from datetime import datetime

router = APIRouter(prefix="/api/resumes", tags=["Resume Management"])

# In-memory storage store for MVP (can connect to Supabase / PostgreSQL)
RESUME_DB: Dict[str, Dict[str, Any]] = {}

@router.get("/")
async def list_resumes():
    """Retrieve all saved resumes."""
    return list(RESUME_DB.values())

@router.get("/{resume_id}")
async def get_resume(resume_id: str):
    """Get resume by ID."""
    if resume_id not in RESUME_DB:
        raise HTTPException(status_code=404, detail="Resume not found")
    return RESUME_DB[resume_id]

@router.post("/")
async def save_resume(payload: Dict[str, Any] = Body(...)):
    """Create or update a resume entry."""
    resume_id = payload.get("id") or str(uuid.uuid4())
    title = payload.get("title") or payload.get("personalInfo", {}).get("title") or "Untitled Resume"
    target_job = payload.get("targetJobTitle") or "Software Engineer"
    ats_score = payload.get("atsScore", 85)
    
    resume_record = {
        "id": resume_id,
        "title": title,
        "targetJobTitle": target_job,
        "atsScore": ats_score,
        "updatedAt": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "template": payload.get("template", "classic"),
        "data": payload
    }
    
    RESUME_DB[resume_id] = resume_record
    return resume_record

@router.post("/{resume_id}/duplicate")
async def duplicate_resume(resume_id: str):
    """Duplicate an existing resume."""
    if resume_id not in RESUME_DB:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    original = RESUME_DB[resume_id]
    new_id = str(uuid.uuid4())
    new_record = dict(original)
    new_record["id"] = new_id
    new_record["title"] = f"{original['title']} (Copy)"
    new_record["updatedAt"] = datetime.now().strftime("%Y-%m-%d %H:%M")
    
    RESUME_DB[new_id] = new_record
    return new_record

@router.delete("/{resume_id}")
async def delete_resume(resume_id: str):
    """Delete a resume entry."""
    if resume_id in RESUME_DB:
        del RESUME_DB[resume_id]
        return {"status": "success", "message": "Resume deleted"}
    raise HTTPException(status_code=404, detail="Resume not found")
