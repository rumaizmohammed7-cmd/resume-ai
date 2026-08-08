const API_BASE = "http://localhost:8000/api";

export async function generateSummaryApi(userProfile) {
  try {
    const res = await fetch(`${API_BASE}/ai/generate-summary`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userProfile)
    });
    if (res.ok) {
      const data = await res.json();
      return data.summary;
    }
  } catch (err) {
    console.warn("Backend unavailable, using local intelligent summary generator", err);
  }

  // Local Intelligent Fallback
  const name = userProfile.personalInfo?.fullName || "";
  const title = userProfile.personalInfo?.title || "Software Professional";
  const expLevel = userProfile.experienceLevel || "0–2 Years Experience";
  
  const skillsList = [];
  if (userProfile.skills) {
    Object.values(userProfile.skills).forEach(arr => {
      if (Array.isArray(arr)) skillsList.push(...arr);
    });
  }
  const topSkills = skillsList.slice(0, 5).join(", ") || "software design, problem solving, and modern frameworks";
  const education = userProfile.education?.[0]?.degree || "";

  if (expLevel.includes("Student") || expLevel.includes("Fresher")) {
    return `Motivated and detail-oriented ${title} candidate${education ? ` pursuing ${education}` : ""}. Possesses strong technical foundations in ${topSkills}. Passionate about applying academic training and practical project experience to build innovative, efficient software solutions.`;
  } else if (expLevel.includes("5+")) {
    return `Results-driven and strategic ${title} with extensive industry experience leading software initiatives and cross-functional teams. Specialized in ${topSkills}, scalable architecture, and engineering best practices to drive core business goals.`;
  } else if (expLevel.includes("2–5") || expLevel.includes("2-5")) {
    return `Dedicated ${title} with proven hands-on experience designing, developing, and maintaining high-performance applications. Skilled in ${topSkills}, API integrations, and modern agile workflows.`;
  } else {
    return `Enthusiastic ${title} with early-career experience building modern applications using ${topSkills}. Adept at writing clean, maintainable code and collaborating effectively across teams to deliver features on schedule.`;
  }
}

export async function improveBulletApi(bullet, jobTitle = "") {
  try {
    const res = await fetch(`${API_BASE}/ai/improve-bullet`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bullet, job_title: jobTitle })
    });
    if (res.ok) {
      const data = await res.json();
      return data.improved_bullet;
    }
  } catch (err) {
    console.warn("Backend unavailable, using local bullet improver", err);
  }

  const clean = bullet.trim().replace(/\.$/, "");
  if (!clean) return "";
  
  const firstWord = clean.split(" ")[0].toLowerCase();
  const verbMap = {
    worked: "Developed and maintained",
    built: "Engineered and deployed",
    made: "Designed and implemented",
    created: "Architected and delivered",
    helped: "Collaborated with cross-functional teams to deliver",
    did: "Executed core development tasks including",
    used: "Leveraged",
    handled: "Managed end-to-end workflows for",
    tested: "Validated application stability by conducting",
    fixed: "Diagnosed and resolved critical bugs in"
  };

  if (verbMap[firstWord]) {
    const rest = clean.substring(firstWord.length).trim();
    return `${verbMap[firstWord]} ${rest}.`;
  }

  return `${clean.charAt(0).toUpperCase() + clean.slice(1)}.`;
}

export async function analyzeJobAndAtsApi(jobDescription, userProfile, targetTitle = "") {
  try {
    const res = await fetch(`${API_BASE}/ai/analyze-job-ats`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        job_description: jobDescription,
        target_title: targetTitle,
        user_profile: userProfile
      })
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("Backend unavailable, using local ATS calculation engine", err);
  }

  // Local ATS Fallback
  const jobText = (jobDescription || "").toLowerCase();
  const knownKeywords = [
    "python", "javascript", "typescript", "react", "node.js", "express", "sql", "postgresql",
    "mongodb", "aws", "docker", "kubernetes", "git", "ci/cd", "rest api", "java", "c++", "django",
    "fastapi", "agile", "unit testing", "system design"
  ];

  const extractedReqs = knownKeywords.filter(kw => jobText.includes(kw));

  // Extract user skills
  const userSkillsSet = new Set();
  if (userProfile.skills) {
    Object.values(userProfile.skills).forEach(arr => {
      if (Array.isArray(arr)) arr.forEach(s => userSkillsSet.add(s.toLowerCase().trim()));
    });
  }
  (userProfile.projects || []).forEach(p => {
    (p.technologies || []).forEach(t => userSkillsSet.add(t.toLowerCase().trim()));
  });

  const matched = extractedReqs.filter(k => userSkillsSet.has(k) || Array.from(userSkillsSet).some(us => us.includes(k) || k.includes(us)));
  const missing = extractedReqs.filter(k => !matched.includes(k)).map(k => k.charAt(0).toUpperCase() + k.slice(1));

  const kwMatch = extractedReqs.length ? Math.round((matched.length / extractedReqs.length) * 100) : 85;
  const skillsMatch = Math.min(100, Math.max(50, kwMatch + 5));
  const expRel = (userProfile.experiences?.length || userProfile.internships?.length) ? 88 : 65;
  const eduMatch = userProfile.education?.length ? 95 : 70;
  const formatting = 95;

  const score = Math.round((kwMatch * 0.35) + (skillsMatch * 0.35) + (expRel * 0.15) + (eduMatch * 0.10) + (formatting * 0.05));

  return {
    job_analysis: {
      required_skills: extractedReqs.slice(0, 8).map(s => s.toUpperCase()),
      keywords: extractedReqs,
      extracted_title: targetTitle || "Target Role"
    },
    ats_score: Math.max(40, Math.min(score, 98)),
    breakdown: {
      keyword_match: kwMatch,
      skills_match: skillsMatch,
      experience_relevance: expRel,
      education_match: eduMatch,
      formatting: formatting
    },
    missing_skills: missing,
    matched_keywords: matched.map(m => m.charAt(0).toUpperCase() + m.slice(1)),
    suggestions: [
      ...(missing.length ? [{
        title: "Missing Skills Warning",
        description: `Skills like ${missing.slice(0, 3).join(", ")} were identified in the job description. Only add them to your resume if you genuinely have experience with them.`,
        type: "warning"
      }] : []),
      {
        title: "Optimize Experience Bullets",
        description: "Start each bullet point with high-impact action verbs (e.g. Developed, Engineered, Spearheaded).",
        type: "tip"
      }
    ]
  };
}
