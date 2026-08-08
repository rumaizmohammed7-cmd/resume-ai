import React from 'react';

export function getSectionOrder(expLevel) {
  if (!expLevel || expLevel.includes("Student") || expLevel.includes("Fresher")) {
    return ["summary", "education", "skills", "projects", "internships", "experience", "certifications", "achievements", "languages"];
  }
  if (expLevel.includes("0–2") || expLevel.includes("0-2")) {
    return ["summary", "skills", "experience", "internships", "projects", "education", "certifications", "achievements", "languages"];
  }
  if (expLevel.includes("2–5") || expLevel.includes("2-5")) {
    return ["summary", "skills", "experience", "projects", "education", "certifications", "achievements", "languages"];
  }
  return ["summary", "skills", "experience", "projects", "education", "certifications", "achievements", "languages"];
}

export default function ClassicTemplate({ data, isCompact = true }) {
  if (!data) return null;
  const { personalInfo = {}, education = [], experiences = [], internships = [], skills = {}, projects = [], certifications = [], achievements = [], languages = [], experienceLevel } = data;
  const sectionOrder = getSectionOrder(experienceLevel);

  // Filter out empty items
  const validExperiences = experiences.filter(e => e.jobTitle || e.company);
  const validInternships = internships.filter(i => i.title || i.company);
  const validProjects = projects.filter(p => p.name);
  const validEducation = education.filter(e => e.degree || e.institution);
  const validCertifications = certifications.filter(c => c.name);
  const validAchievements = achievements.filter(a => a.title);

  const containerPadding = isCompact ? "p-6 md:p-8" : "p-8 md:p-10";
  const sectionMargin = isCompact ? "mb-2.5" : "mb-4";
  const bodyTextSize = isCompact ? "text-[12px] leading-snug" : "text-[13px] leading-relaxed";

  const renderSummary = () => personalInfo.summary && (
    <div key="summary" className={sectionMargin}>
      <h2 className="text-[11px] font-bold text-slate-900 tracking-wider uppercase border-b border-slate-300 pb-0.5 mb-1">
        {experienceLevel?.includes("Student") ? "Professional Objective" : "Professional Summary"}
      </h2>
      <p className={`${bodyTextSize} text-slate-800`}>{personalInfo.summary}</p>
    </div>
  );

  const renderEducation = () => validEducation.length > 0 && (
    <div key="education" className={sectionMargin}>
      <h2 className="text-[11px] font-bold text-slate-900 tracking-wider uppercase border-b border-slate-300 pb-0.5 mb-1">Education</h2>
      <div className="space-y-1.5">
        {validEducation.map((edu, idx) => (
          <div key={idx} className={bodyTextSize}>
            <div className="flex justify-between font-semibold text-slate-900">
              <span>{edu.degree} {edu.specialization ? `in ${edu.specialization}` : ''}</span>
              <span className="text-slate-600 font-normal text-[11px]">{edu.startYear} – {edu.endYear}</span>
            </div>
            <div className="flex justify-between text-slate-700 text-[11px]">
              <span>{edu.institution}{edu.location ? `, ${edu.location}` : ''}</span>
              {edu.cgpa && <span className="font-medium text-slate-800">Grade: {edu.cgpa}</span>}
            </div>
            {edu.coursework && (
              <p className="text-[11px] text-slate-600 mt-0.5"><span className="font-medium">Coursework:</span> {edu.coursework}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderSkills = () => Object.keys(skills).length > 0 && (
    <div key="skills" className={sectionMargin}>
      <h2 className="text-[11px] font-bold text-slate-900 tracking-wider uppercase border-b border-slate-300 pb-0.5 mb-1">
        {experienceLevel?.includes("5+") ? "Core Competencies & Technical Skills" : "Technical Skills"}
      </h2>
      <div className={`space-y-0.5 ${bodyTextSize}`}>
        {Object.entries(skills).map(([cat, list], idx) => {
          if (!Array.isArray(list) || list.length === 0) return null;
          return (
            <div key={idx} className="flex">
              <span className="font-semibold text-slate-900 w-40 shrink-0 text-[11px]">{cat}:</span>
              <span className="text-slate-800 text-[11px]">{list.join(", ")}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderExperience = () => validExperiences.length > 0 && (
    <div key="experience" className={sectionMargin}>
      <h2 className="text-[11px] font-bold text-slate-900 tracking-wider uppercase border-b border-slate-300 pb-0.5 mb-1">
        {experienceLevel?.includes("5+") ? "Professional Experience" : "Work Experience"}
      </h2>
      <div className="space-y-2">
        {validExperiences.map((exp, idx) => (
          <div key={idx} className={bodyTextSize}>
            <div className="flex justify-between font-semibold text-slate-900">
              <span>{exp.jobTitle} <span className="font-normal text-slate-700">| {exp.company}</span></span>
              <span className="text-slate-600 font-normal text-[11px]">{exp.startDate} – {exp.currentlyWorking ? "Present" : exp.endDate}</span>
            </div>
            {exp.location && <div className="text-[11px] text-slate-500 italic mb-0.5">{exp.location}</div>}
            {Array.isArray(exp.responsibilities) && exp.responsibilities.length > 0 && (
              <ul className="list-disc list-outside ml-3.5 space-y-0.5 text-slate-800 mt-0.5">
                {exp.responsibilities.map((resp, i) => resp ? <li key={i}>{resp}</li> : null)}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderInternships = () => validInternships.length > 0 && (
    <div key="internships" className={sectionMargin}>
      <h2 className="text-[11px] font-bold text-slate-900 tracking-wider uppercase border-b border-slate-300 pb-0.5 mb-1">Internships</h2>
      <div className="space-y-2">
        {validInternships.map((item, idx) => (
          <div key={idx} className={bodyTextSize}>
            <div className="flex justify-between font-semibold text-slate-900">
              <span>{item.title} <span className="font-normal text-slate-700">| {item.company}</span></span>
              <span className="text-slate-600 font-normal text-[11px]">{item.startDate} – {item.endDate}</span>
            </div>
            {Array.isArray(item.responsibilities) && (
              <ul className="list-disc list-outside ml-3.5 space-y-0.5 text-slate-800 mt-0.5">
                {item.responsibilities.map((resp, i) => resp ? <li key={i}>{resp}</li> : null)}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderProjects = () => validProjects.length > 0 && (
    <div key="projects" className={sectionMargin}>
      <h2 className="text-[11px] font-bold text-slate-900 tracking-wider uppercase border-b border-slate-300 pb-0.5 mb-1">
        {experienceLevel?.includes("5+") ? "Key Projects & Contributions" : "Key Projects"}
      </h2>
      <div className="space-y-2">
        {validProjects.map((proj, idx) => (
          <div key={idx} className={bodyTextSize}>
            <div className="flex justify-between font-semibold text-slate-900">
              <span>{proj.name} {proj.role ? <span className="font-normal text-slate-600">({proj.role})</span> : ''}</span>
              {(proj.githubUrl || proj.demoUrl) && (
                <span className="text-[11px] text-blue-700 font-normal">
                  {[proj.githubUrl, proj.demoUrl].filter(Boolean).join(" | ")}
                </span>
              )}
            </div>
            {proj.technologies && proj.technologies.length > 0 && (
              <div className="text-[11px] text-slate-600"><span className="font-medium">Tech:</span> {proj.technologies.join(", ")}</div>
            )}
            {proj.description && <p className="text-slate-800">{proj.description}</p>}
            {Array.isArray(proj.contributions) && proj.contributions.length > 0 && (
              <ul className="list-disc list-outside ml-3.5 space-y-0.5 text-slate-800">
                {proj.contributions.map((c, i) => c ? <li key={i}>{c}</li> : null)}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderCertifications = () => validCertifications.length > 0 && (
    <div key="certifications" className={sectionMargin}>
      <h2 className="text-[11px] font-bold text-slate-900 tracking-wider uppercase border-b border-slate-300 pb-0.5 mb-1">Certifications</h2>
      <ul className={`list-disc list-outside ml-3.5 space-y-0.5 ${bodyTextSize} text-slate-800`}>
        {validCertifications.map((cert, idx) => (
          <li key={idx}>
            <span className="font-semibold">{cert.name}</span> — {cert.organization} {cert.date ? `(${cert.date})` : ''}
          </li>
        ))}
      </ul>
    </div>
  );

  const renderAchievements = () => validAchievements.length > 0 && (
    <div key="achievements" className={sectionMargin}>
      <h2 className="text-[11px] font-bold text-slate-900 tracking-wider uppercase border-b border-slate-300 pb-0.5 mb-1">Achievements & Honors</h2>
      <ul className={`list-disc list-outside ml-3.5 space-y-0.5 ${bodyTextSize} text-slate-800`}>
        {validAchievements.map((item, idx) => (
          <li key={idx}>
            <span className="font-semibold">{item.title}</span>{item.description ? `: ${item.description}` : ''}
          </li>
        ))}
      </ul>
    </div>
  );

  const renderLanguages = () => languages.length > 0 && (
    <div key="languages" className={sectionMargin}>
      <h2 className="text-[11px] font-bold text-slate-900 tracking-wider uppercase border-b border-slate-300 pb-0.5 mb-1">Languages</h2>
      <p className={`${bodyTextSize} text-slate-800`}>
        {languages.map(l => `${l.language}${l.proficiency ? ` (${l.proficiency})` : ''}`).join(" • ")}
      </p>
    </div>
  );

  const sectionMap = {
    summary: renderSummary,
    education: renderEducation,
    skills: renderSkills,
    experience: renderExperience,
    internships: renderInternships,
    projects: renderProjects,
    certifications: renderCertifications,
    achievements: renderAchievements,
    languages: renderLanguages
  };

  return (
    <div id="printable-resume" className={`bg-white ${containerPadding} text-slate-900 font-sans shadow-md border border-slate-200 rounded-sm w-full max-w-[800px] mx-auto text-left`}>
      {/* Compact Single-Page Header */}
      <div className="text-center border-b border-slate-300 pb-2 mb-3">
        <h1 className="text-xl font-bold tracking-tight text-slate-900 uppercase">{personalInfo.fullName || "YOUR NAME"}</h1>
        {personalInfo.title && <p className="text-xs font-semibold text-slate-700 tracking-wide mt-0.5">{personalInfo.title}</p>}
        
        <div className="flex flex-wrap justify-center items-center gap-x-2.5 gap-y-0.5 text-[11px] text-slate-600 mt-1">
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.email && <span>• {personalInfo.email}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
          {personalInfo.github && <span>• {personalInfo.github}</span>}
          {personalInfo.portfolio && <span>• {personalInfo.portfolio}</span>}
        </div>
      </div>

      {/* Dynamic Sections */}
      {sectionOrder.map(secKey => sectionMap[secKey] ? sectionMap[secKey]() : null)}
    </div>
  );
}
