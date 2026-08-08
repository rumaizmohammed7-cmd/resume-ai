import re
from typing import List, Dict, Any

TECHNICAL_KEYWORDS = [
    # Programming Languages
    "python", "javascript", "typescript", "java", "c++", "c#", "go", "golang", "ruby", "php", "swift", "kotlin", "rust", "sql", "r", "html", "css",
    # Frameworks & Libraries
    "react", "react.js", "next.js", "vue", "angular", "node.js", "express", "django", "flask", "fastapi", "spring boot", "dot net", ".net", "laravel", "tailwind", "bootstrap",
    # Databases
    "mysql", "postgresql", "postgres", "mongodb", "sqlite", "redis", "dynamodb", "oracle", "elasticsearch", "cassandra",
    # Cloud & DevOps
    "aws", "azure", "gcp", "google cloud", "docker", "kubernetes", "k8s", "ci/cd", "jenkins", "github actions", "terraform", "ansible", "linux", "bash", "nginx",
    # AI/ML & Data
    "machine learning", "deep learning", "nlp", "tensorflow", "pytorch", "pandas", "numpy", "scikit-learn", "data analysis", "artificial intelligence", "openai", "prompt engineering",
    # Methodologies & Tools
    "git", "github", "gitlab", "jira", "agile", "scrum", "rest api", "graphql", "microservices", "unit testing", "system design", "tdd"
]

ACTION_VERBS = [
    "developed", "designed", "implemented", "architected", "optimized", "engineered",
    "spearheaded", "accelerated", "integrated", "automated", "built", "refactored",
    "deployed", "managed", "led", "enhanced", "orchestrated", "reduced", "scaled"
]

def extract_keywords(text: str) -> List[str]:
    """Extract known technical and domain keywords from arbitrary text."""
    if not text:
        return []
    text_lower = text.lower()
    found = []
    for kw in TECHNICAL_KEYWORDS:
        # Match whole word or phrase
        pattern = r'\b' + re.escape(kw) + r'\b'
        if re.search(pattern, text_lower):
            found.append(kw)
    return sorted(list(set(found)))

def get_all_user_skills(user_profile: Dict[str, Any]) -> List[str]:
    """Gather all explicit user skills + skills mentioned in projects/experience."""
    skills = set()
    
    # Explicit skills dictionary
    explicit_skills = user_profile.get("skills", {})
    if isinstance(explicit_skills, dict):
        for category, item_list in explicit_skills.items():
            if isinstance(item_list, list):
                for item in item_list:
                    if item and isinstance(item, str):
                        skills.add(item.strip().lower())
    elif isinstance(explicit_skills, list):
        for item in explicit_skills:
            if item and isinstance(item, str):
                skills.add(item.strip().lower())
                
    # Extract from experience descriptions & bullet points
    experiences = user_profile.get("experiences", [])
    for exp in experiences:
        resp = exp.get("responsibilities", [])
        if isinstance(resp, list):
            text = " ".join(resp)
        else:
            text = str(resp)
        for kw in extract_keywords(text):
            skills.add(kw)
            
    # Extract from projects
    projects = user_profile.get("projects", [])
    for proj in projects:
        tech = proj.get("technologies", [])
        if isinstance(tech, list):
            for t in tech:
                skills.add(str(t).strip().lower())
        desc = str(proj.get("description", "")) + " " + " ".join(proj.get("contributions", []))
        for kw in extract_keywords(desc):
            skills.add(kw)
            
    return list(skills)

def analyze_job_description(job_description: str, target_title: str = "") -> Dict[str, Any]:
    """Extract required skills, technologies, and metadata from job description."""
    if not job_description:
        return {
            "required_skills": [],
            "keywords": [],
            "extracted_title": target_title or "Target Role",
            "technologies": []
        }
        
    keywords = extract_keywords(job_description)
    
    # Categorize extracted keywords
    tech_skills = [k for k in keywords if k in ["python", "javascript", "typescript", "java", "c++", "sql", "html", "css", "r", "go", "rust", "php"]]
    frameworks_tools = [k for k in keywords if k not in tech_skills]
    
    return {
        "required_skills": keywords[:10],
        "keywords": keywords,
        "extracted_title": target_title or "Target Role",
        "technologies": keywords
    }

def calculate_ats_score(job_description: str, user_profile: Dict[str, Any]) -> Dict[str, Any]:
    """Compute detailed ATS match metrics, overall score, missing skills, and suggestions."""
    job_keywords = extract_keywords(job_description)
    user_skills = get_all_user_skills(user_profile)
    
    if not job_keywords:
        # Base fallback scoring if no target job is provided
        has_summary = bool(user_profile.get("personalInfo", {}).get("summary") or user_profile.get("summary"))
        has_edu = len(user_profile.get("education", [])) > 0
        has_exp = len(user_profile.get("experiences", [])) > 0 or len(user_profile.get("internships", [])) > 0
        has_skills = len(user_skills) > 0
        has_proj = len(user_profile.get("projects", [])) > 0
        
        base_score = 50 + (10 if has_summary else 0) + (10 if has_edu else 0) + (10 if has_exp else 0) + (10 if has_skills else 0) + (10 if has_proj else 0)
        return {
            "overall_score": min(base_score, 100),
            "breakdown": {
                "keyword_match": 80,
                "skills_match": 85 if has_skills else 50,
                "experience_relevance": 80 if has_exp else 60,
                "education_match": 90 if has_edu else 70,
                "formatting": 95
            },
            "missing_skills": [],
            "matched_keywords": user_skills[:5],
            "suggestions": [
                {
                    "title": "Add Target Job Description",
                    "description": "Paste a target job description to receive custom keyword matching and precision ATS recommendations.",
                    "type": "info"
                }
            ]
        }
        
    # Calculate Keyword Match %
    matched_keywords = [k for k in job_keywords if any(k in s or s in k for s in user_skills)]
    keyword_match_pct = round((len(matched_keywords) / max(len(job_keywords), 1)) * 100)
    
    # Calculate Skills Match %
    user_skill_set = set(user_skills)
    skill_matches = [k for k in job_keywords if k in user_skill_set]
    skills_match_pct = round((len(skill_matches) / max(len(job_keywords), 1)) * 100)
    
    # Calculate Experience & Education Relevance
    has_exp = len(user_profile.get("experiences", [])) > 0 or len(user_profile.get("internships", [])) > 0
    exp_relevance = 85 if has_exp else 65
    
    has_edu = len(user_profile.get("education", [])) > 0
    edu_match = 95 if has_edu else 70
    
    formatting_score = 95  # ResumeAI strictly output clean single-column ATS layouts
    
    overall_score = round(
        (keyword_match_pct * 0.35) +
        (skills_match_pct * 0.35) +
        (exp_relevance * 0.15) +
        (edu_match * 0.10) +
        (formatting_score * 0.05)
    )
    # Clamp between 0 and 100
    overall_score = max(30, min(overall_score, 100))
    
    # Identify missing skills explicitly
    missing_skills = [k.title() for k in job_keywords if k not in user_skill_set]
    
    # Generate intelligent suggestions
    suggestions = []
    
    if len(missing_skills) > 0:
        suggestions.append({
            "title": "Address Missing Skill Keywords",
            "description": f"The job description highlights skills like {', '.join(missing_skills[:3])}. Ensure you only list them if you genuinely have hands-on experience.",
            "type": "warning"
        })
        
    summary = user_profile.get("personalInfo", {}).get("summary") or user_profile.get("summary", "")
    if summary and not any(kw in summary.lower() for kw in job_keywords[:3]):
        suggestions.append({
            "title": "Improve Professional Summary",
            "description": f"Incorporate target role terms (e.g. {job_keywords[0] if job_keywords else 'key role responsibilities'}) into your professional summary naturally.",
            "type": "suggestion"
        })
        
    if not has_exp:
        suggestions.append({
            "title": "Emphasize Projects & Leadership",
            "description": "Highlight technical projects, hackathons, or open-source contributions with measurable deliverables.",
            "type": "tip"
        })
    else:
        suggestions.append({
            "title": "Use Strong Action Verbs",
            "description": "Ensure work experience bullet points begin with active, high-impact verbs (e.g., Developed, Engineered, Accelerated).",
            "type": "tip"
        })
        
    return {
        "overall_score": overall_score,
        "breakdown": {
            "keyword_match": keyword_match_pct,
            "skills_match": skills_match_pct,
            "experience_relevance": exp_relevance,
            "education_match": edu_match,
            "formatting": formatting_score
        },
        "missing_skills": missing_skills,
        "matched_keywords": [k.title() for k in matched_keywords],
        "suggestions": suggestions
    }
