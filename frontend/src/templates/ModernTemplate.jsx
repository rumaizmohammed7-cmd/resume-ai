import React from 'react';
import { getSectionOrder } from './ClassicTemplate';

export default function ModernTemplate({ data, isCompact = true }) {
  if (!data) return null;
  const { personalInfo = {}, education = [], experiences = [], internships = [], skills = {}, projects = [], certifications = [], achievements = [], languages = [], experienceLevel } = data;
  const sectionOrder = getSectionOrder(experienceLevel);

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
      <h2 className="text-[11px] font-bold text-blue-700 tracking-widest uppercase border-b-2 border-blue-600 pb-0.5 mb-1">
        {experienceLevel?.includes("Student") ? "Professional Objective" : "Professional Summary"}
      </h2>
      <p className={`${bodyTextSize} text-slate-700 font-normal`}>{personalInfo.summary}</p>
    </div>
  );

  const renderEducation = () => validEducation.length > 0 && (
    <div key="education" className={sectionMargin}>
      <h2 className="text-[11px] font-bold text-blue-700 tracking-widest uppercase border-b-2 border-blue-600 pb-0.5 mb-1">Education</h2>
      <div className="space-y-1.5">
        {validEducation.map((edu, idx) => (
          <div key={idx} className={bodyTextSize}>
            <div className="flex justify-between font-semibold text-slate-900">
              <span>{edu.degree} {edu.specialization ? `in ${edu.specialization}` : ''}</span>
              <span className="text-slate-500 text-[11px]">{edu.startYear} – {edu.endYear}</span>
            </div>
            <div className="flex justify-between text-slate-600 text-[11px]">
              <span>{edu.institution}{edu.location ? `, ${edu.location}` : ''}</span>
              {edu.cgpa && <span className="font-medium text-slate-800">Grade: {edu.cgpa}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSkills = () => Object.keys(skills).length > 0 && (
    <div key="skills" className={sectionMargin}>
      <h2 className="text-[11px] font-bold text-blue-700 tracking-widest uppercase border-b-2 border-blue-600 pb-0.5 mb-1">Skills & Technologies</h2>
      <div className={`space-y-0.5 ${bodyTextSize}`}>
        {Object.entries(skills).map(([cat, list], idx) => {
          if (!Array.isArray(list) || list.length === 0) return null;
          return (
            <div key={idx} className="flex">
              <span className="font-semibold text-slate-900 w-40 shrink-0 text-[11px]">{cat}:</span>
              <span className="text-slate-700 text-[11px]">{list.join(", ")}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderExperience = () => validExperiences.length > 0 && (
    <div key="experience" className={sectionMargin}>
      <h2 className="text-[11px] font-bold text-blue-700 tracking-widest uppercase border-b-2 border-blue-600 pb-0.5 mb-1">Professional Experience</h2>
      <div className="space-y-2">
        {validExperiences.map((exp, idx) => (
          <div key={idx} className={bodyTextSize}>
            <div className="flex justify-between items-baseline">
              <span className="font-bold text-slate-900">{exp.jobTitle} <span className="font-medium text-slate-600">@ {exp.company}</span></span>
              <span className="text-[11px] text-slate-500">{exp.startDate} – {exp.currentlyWorking ? "Present" : exp.endDate}</span>
            </div>
            {Array.isArray(exp.responsibilities) && (
              <ul className="list-disc ml-3.5 space-y-0.5 text-slate-700 mt-0.5">
                {exp.responsibilities.map((r, i) => r ? <li key={i}>{r}</li> : null)}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderInternships = () => validInternships.length > 0 && (
    <div key="internships" className={sectionMargin}>
      <h2 className="text-[11px] font-bold text-blue-700 tracking-widest uppercase border-b-2 border-blue-600 pb-0.5 mb-1">Internships</h2>
      <div className="space-y-2">
        {validInternships.map((item, idx) => (
          <div key={idx} className={bodyTextSize}>
            <div className="flex justify-between items-baseline">
              <span className="font-bold text-slate-900">{item.title} <span className="font-medium text-slate-600">@ {item.company}</span></span>
              <span className="text-[11px] text-slate-500">{item.startDate} – {item.endDate}</span>
            </div>
            {Array.isArray(item.responsibilities) && (
              <ul className="list-disc ml-3.5 space-y-0.5 text-slate-700 mt-0.5">
                {item.responsibilities.map((r, i) => r ? <li key={i}>{r}</li> : null)}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderProjects = () => validProjects.length > 0 && (
    <div key="projects" className={sectionMargin}>
      <h2 className="text-[11px] font-bold text-blue-700 tracking-widest uppercase border-b-2 border-blue-600 pb-0.5 mb-1">Key Projects</h2>
      <div className="space-y-2">
        {validProjects.map((proj, idx) => (
          <div key={idx} className={bodyTextSize}>
            <div className="flex justify-between">
              <span className="font-bold text-slate-900">{proj.name}</span>
              {(proj.githubUrl || proj.demoUrl) && <span className="text-[11px] text-blue-600">{[proj.githubUrl, proj.demoUrl].filter(Boolean).join(" • ")}</span>}
            </div>
            {proj.description && <p className="text-slate-700">{proj.description}</p>}
            {Array.isArray(proj.contributions) && (
              <ul className="list-disc ml-3.5 space-y-0.5 text-slate-700 mt-0.5">
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
      <h2 className="text-[11px] font-bold text-blue-700 tracking-widest uppercase border-b-2 border-blue-600 pb-0.5 mb-1">Certifications</h2>
      <ul className={`list-disc ml-3.5 space-y-0.5 ${bodyTextSize} text-slate-700`}>
        {validCertifications.map((c, i) => <li key={i}><span className="font-semibold">{c.name}</span> — {c.organization} ({c.date})</li>)}
      </ul>
    </div>
  );

  const renderAchievements = () => validAchievements.length > 0 && (
    <div key="achievements" className={sectionMargin}>
      <h2 className="text-[11px] font-bold text-blue-700 tracking-widest uppercase border-b-2 border-blue-600 pb-0.5 mb-1">Achievements</h2>
      <ul className={`list-disc ml-3.5 space-y-0.5 ${bodyTextSize} text-slate-700`}>
        {validAchievements.map((a, i) => <li key={i}><span className="font-semibold">{a.title}</span>: {a.description}</li>)}
      </ul>
    </div>
  );

  const renderLanguages = () => languages.length > 0 && (
    <div key="languages" className={sectionMargin}>
      <h2 className="text-[11px] font-bold text-blue-700 tracking-widest uppercase border-b-2 border-blue-600 pb-0.5 mb-1">Languages</h2>
      <p className={`${bodyTextSize} text-slate-700`}>{languages.map(l => `${l.language} (${l.proficiency})`).join(" • ")}</p>
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
      <div className="border-b-2 border-slate-900 pb-2 mb-3">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">{personalInfo.fullName || "YOUR NAME"}</h1>
        <p className="text-xs font-semibold text-blue-700 tracking-wide uppercase mt-0.5">{personalInfo.title}</p>
        <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-slate-600 mt-1 font-medium">
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
        </div>
      </div>

      {sectionOrder.map(secKey => sectionMap[secKey] ? sectionMap[secKey]() : null)}
    </div>
  );
}
