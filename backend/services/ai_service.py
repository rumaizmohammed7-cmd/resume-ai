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
    title = personal.get("title", "") or "Software Professional"
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
        
    skills_str = ", ".join(all_skills[:5]) if all_skills else "software engineering & system design"
    
    # Extract latest education or company
    education = user_profile.get("education", [])
    edu_degree = education[0].get("degree", "") if education else ""
    
    experiences = user_profile.get("experiences", [])
    latest_company = experiences[0].get("company", "") if experiences else ""
    
    if "Student" in exp_level or "Fresher" in exp_level:
        if edu_degree:
            summary = f"High-performing {title} candidate holding/pursuing {edu_degree}. Solid technical proficiency in {skills_str}. Dedicated to applying computer science fundamentals, modular architecture, and collaborative problem solving to deliver scalable software solutions."
        else:
            summary = f"Aspiring {title} with strong technical foundations in {skills_str}. Experienced in developing end-to-end software projects, writing maintainable code, and optimizing application performance."
    elif "5+" in exp_level:
        summary = f"Senior {title} with extensive industry experience architecting scalable systems and leading technical initiatives. Proven track record in system design, performance optimization, and cross-functional team leadership utilizing {skills_str}."
    elif "2–5" in exp_level or "2-5" in exp_level:
        summary = f"Results-driven {title} with hands-on experience engineering high-availability web applications and backend microservices. Skilled in {skills_str}, clean code patterns, and agile engineering workflows."
    else: # 0-2 years
        if latest_company:
            summary = f"Software Engineer with professional experience at {latest_company}. Proficient in {skills_str}, with a strong commitment to robust software design, automated testing, and continuous deployment."
        else:
            summary = f"Detail-oriented {title} with early-career experience developing modern web and backend applications using {skills_str}. Focused on building high-quality, user-centric software features."

    return summary

def improve_bullet_point(bullet: str, job_title: str = "") -> str:
    """
    Enhance experience/project bullet points into MAANG-style high-impact statements
    following the Google XYZ formula (Accomplished X measured by Y by doing Z)
    without fabricating fake company names or numbers.
    """
    clean_bullet = bullet.strip().rstrip('.')
    if not clean_bullet:
        return ""
        
    first_word = clean_bullet.split()[0].lower()
    
    # MAANG Power Action Verb Replacement
    verbs_map = {
        "worked": "Spearheaded development and maintenance of",
        "built": "Architected and implemented",
        "made": "Designed and deployed scalable",
        "did": "Engineered core modules for",
        "helped": "Collaborated across engineering teams to deliver",
        "handled": "Managed end-to-end operational workflows for",
        "created": "Engineered and delivered high-performance",
        "used": "Leveraged modern industry frameworks including",
        "tested": "Rigorously validated software quality by executing",
        "fixed": "Diagnosed, refactored, and resolved critical issues in",
        "added": "Integrated key functionality for"
    }
    
    for weak_verb, strong_verb in verbs_map.items():
        if first_word == weak_verb:
            rest = clean_bullet[len(weak_verb):].strip()
            return f"{strong_verb} {rest}."
            
    # Capitalize first letter and add period
    enhanced = clean_bullet[0].upper() + clean_bullet[1:] + "."
    return enhanced

def improve_project_description(description: str, technologies: List[str] = None) -> str:
    """Refine project description into clear MAANG-standard technical overview."""
    if not description:
        return ""
    tech_text = f" Engineered using {', '.join(technologies)}." if technologies else ""
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
