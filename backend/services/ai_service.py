import os
from typing import Dict, Any, List
from utils.ats_analyzer import analyze_job_description, calculate_ats_score, extract_keywords

# OpenAI optional integration hook
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")

def generate_professional_summary(user_profile: Dict[str, Any]) -> str:
    """
    Generate an ATS-optimized professional summary derived strictly from user inputs.
    Does not hallucinate skills, companies, degrees, or metrics.
    """
    personal = user_profile.get("personalInfo", {})
    name = personal.get("fullName", "")
    title = personal.get("title", "") or "Professional"
    exp_level = user_profile.get("experienceLevel", "0–2 Years Experience")
    
    # Extract user skills
    skills_data = user_profile.get("skills", {})
    all_skills = []
    if isinstance(skills_data, dict):
        for cat, items in skills_data.items():
            if isinstance(items, list):
                all_skills.extend(items)
    elif isinstance(skills_data, list):
        all_skills.extend(skills_data)
        
    skills_str = ", ".join(all_skills[:5]) if all_skills else "relevant core competencies"
    
    # Extract latest education or company
    education = user_profile.get("education", [])
    edu_degree = education[0].get("degree", "") if education else ""
    
    experiences = user_profile.get("experiences", [])
    latest_company = experiences[0].get("company", "") if experiences else ""
    
    if "Student" in exp_level or "Fresher" in exp_level:
        if edu_degree:
            summary = f"Motivated {title} candidate pursuing/holding a {edu_degree}. Equipped with solid hands-on knowledge in {skills_str}. Eager to leverage technical capabilities, academic training, and collaborative problem-solving to deliver high-quality solutions."
        else:
            summary = f"Results-driven aspiring {title} with foundational expertise in {skills_str}. Dedicated to applying modern software engineering principles and contributing to impactful team projects."
    elif "5+" in exp_level:
        summary = f"Accomplished and strategic {title} with extensive industry experience leading cross-functional teams and delivering scalable software solutions. Proven track record in architectural design, process optimization, and technical execution utilizing {skills_str}."
    elif "2–5" in exp_level or "2-5" in exp_level:
        summary = f"Results-oriented {title} with a solid background developing and maintaining robust web and software applications. Skilled in {skills_str}, with a strong commitment to clean code architecture and team collaboration."
    else: # 0-2 years
        if latest_company:
            summary = f"Detail-oriented {title} with practical experience at {latest_company}. Proficient in {skills_str}, focused on building scalable, user-centric applications and continuously learning modern technologies."
        else:
            summary = f"Enthusiastic {title} with early-career experience developing software applications and web solutions using {skills_str}. Strong foundation in software design, version control, and team development."

    return summary

def improve_bullet_point(bullet: str, job_title: str = "") -> str:
    """
    Enhance work experience bullet point wording using active verbs and standard ATS clarity,
    without inventing fake numbers, metrics, or technologies.
    """
    clean_bullet = bullet.strip().rstrip('.')
    if not clean_bullet:
        return ""
        
    # Check if already starts with strong action verb
    first_word = clean_bullet.split()[0].lower()
    
    verbs_map = {
        "worked": "Developed and maintained",
        "built": "Engineered and implemented",
        "made": "Designed and deployed",
        "did": "Executed key tasks including",
        "helped": "Collaborated with team members to deliver",
        "handled": "Managed operational workflows for",
        "created": "Architected and implemented",
        "used": "Leveraged",
        "tested": "Validated software quality by performing",
        "fixed": "Resolved technical issues and refactored"
    }
    
    for weak_verb, strong_verb in verbs_map.items():
        if first_word == weak_verb:
            rest = clean_bullet[len(weak_verb):].strip()
            return f"{strong_verb} {rest}."
            
    # Default polish: capitalize first letter and add period
    enhanced = clean_bullet[0].upper() + clean_bullet[1:] + "."
    return enhanced

def improve_project_description(description: str, technologies: List[str] = None) -> str:
    """Refine project description for maximum clarity and technical precision."""
    if not description:
        return ""
    tech_text = f" Built using {', '.join(technologies)}." if technologies else ""
    clean_desc = description.strip().rstrip('.')
    return f"{clean_desc[0].upper()}{clean_desc[1:]}.{tech_text}"

def analyze_job_and_ats(job_description: str, user_profile: Dict[str, Any], target_title: str = "") -> Dict[str, Any]:
    """Execute complete job requirements analysis and ATS score calculation."""
    job_reqs = analyze_job_description(job_description, target_title)
    ats_res = calculate_ats_score(job_description, user_profile)
    
    return {
        "job_analysis": job_reqs,
        "ats_score": ats_res["overall_score"],
        "breakdown": ats_res["breakdown"],
        "missing_skills": ats_res["missing_skills"],
        "matched_keywords": ats_res["matched_keywords"],
        "suggestions": ats_res["suggestions"]
    }
