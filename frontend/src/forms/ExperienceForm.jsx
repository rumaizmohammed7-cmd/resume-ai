import React, { useState } from 'react';
import { Plus, Trash2, Sparkles, Briefcase, RefreshCw, CheckCircle2, UserCheck } from 'lucide-react';
import { improveBulletApi } from '../services/api';

const EMPLOYMENT_TYPES = ["Full-time", "Part-time", "Internship", "Contract", "Freelance"];

export default function ExperienceForm({ experiences = [], isStudent = false, onChange, onSkipStep }) {
  const [improvingIdx, setImprovingIdx] = useState(null);

  const handleAdd = () => {
    const newItem = {
      jobTitle: "",
      company: "",
      location: "",
      employmentType: isStudent ? "Internship" : "Full-time",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      responsibilities: [""]
    };
    onChange([...experiences, newItem]);
  };

  const handleClearAll = () => {
    onChange([]);
    if (onSkipStep) onSkipStep();
  };

  const handleUpdateField = (index, field, value) => {
    const updated = [...experiences];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleBulletChange = (expIndex, bulletIndex, value) => {
    const updated = [...experiences];
    const respList = [...(updated[expIndex].responsibilities || [])];
    respList[bulletIndex] = value;
    updated[expIndex].responsibilities = respList;
    onChange(updated);
  };

  const handleAddBullet = (expIndex) => {
    const updated = [...experiences];
    updated[expIndex].responsibilities = [...(updated[expIndex].responsibilities || []), ""];
    onChange(updated);
  };

  const handleRemoveBullet = (expIndex, bulletIndex) => {
    const updated = [...experiences];
    const respList = updated[expIndex].responsibilities.filter((_, i) => i !== bulletIndex);
    updated[expIndex].responsibilities = respList.length ? respList : [""];
    onChange(updated);
  };

  const handleImproveBullet = async (expIndex, bulletIndex) => {
    const bullet = experiences[expIndex]?.responsibilities?.[bulletIndex];
    if (!bullet) return;

    setImprovingIdx(`${expIndex}-${bulletIndex}`);
    try {
      const polished = await improveBulletApi(bullet, experiences[expIndex]?.jobTitle);
      handleBulletChange(expIndex, bulletIndex, polished);
    } catch (e) {
      console.error(e);
    } finally {
      setImprovingIdx(null);
    }
  };

  const handleRemoveExperience = (index) => {
    onChange(experiences.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              {isStudent ? "Internships & Experience" : "Work Experience"}
            </h2>
            <span className="px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 rounded-full border border-emerald-200">
              Optional for Freshers
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            If you are a student or fresher with no full-time job experience, you can skip this section completely.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleClearAll}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
          >
            <UserCheck className="w-3.5 h-3.5 text-slate-600" />
            <span>Skip (No Experience)</span>
          </button>

          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Experience
          </button>
        </div>
      </div>

      {experiences.length === 0 ? (
        <div className="bg-slate-50 p-6 rounded-xl border border-dashed border-slate-200 text-center space-y-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <p className="text-xs font-semibold text-slate-800">
            No work experience added. (Perfect for Freshers & Students)
          </p>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Your resume layout will automatically prioritize Education, Technical Skills, Projects, and Certifications.
          </p>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-bold text-brand-700 bg-brand-50 border border-brand-200 rounded-lg hover:bg-brand-100 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            + Add Internship / Role
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {experiences.map((exp, expIdx) => (
            <div key={expIdx} className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-brand-600" />
                  Experience #{expIdx + 1}
                </span>

                <button
                  type="button"
                  onClick={() => handleRemoveExperience(expIdx)}
                  className="text-slate-400 hover:text-red-600 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Job Title *</label>
                  <input
                    type="text"
                    value={exp.jobTitle || ''}
                    onChange={(e) => handleUpdateField(expIdx, 'jobTitle', e.target.value)}
                    placeholder="e.g. Software Engineer / Intern"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Company *</label>
                  <input
                    type="text"
                    value={exp.company || ''}
                    onChange={(e) => handleUpdateField(expIdx, 'company', e.target.value)}
                    placeholder="e.g. TechNova Inc."
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Location</label>
                  <input
                    type="text"
                    value={exp.location || ''}
                    onChange={(e) => handleUpdateField(expIdx, 'location', e.target.value)}
                    placeholder="e.g. Bangalore, India"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Employment Type</label>
                  <select
                    value={exp.employmentType || 'Full-time'}
                    onChange={(e) => handleUpdateField(expIdx, 'employmentType', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-brand-500 outline-none"
                  >
                    {EMPLOYMENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Start Date</label>
                  <input
                    type="text"
                    value={exp.startDate || ''}
                    onChange={(e) => handleUpdateField(expIdx, 'startDate', e.target.value)}
                    placeholder="e.g. Jun 2022"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">End Date</label>
                  <input
                    type="text"
                    disabled={exp.currentlyWorking}
                    value={exp.currentlyWorking ? "Present" : (exp.endDate || '')}
                    onChange={(e) => handleUpdateField(expIdx, 'endDate', e.target.value)}
                    placeholder="e.g. May 2024"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-brand-500 outline-none disabled:bg-slate-100 disabled:text-slate-500"
                  />
                </div>

                <div className="sm:col-span-2 flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id={`current-${expIdx}`}
                    checked={exp.currentlyWorking || false}
                    onChange={(e) => handleUpdateField(expIdx, 'currentlyWorking', e.target.checked)}
                    className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500 border-slate-300"
                  />
                  <label htmlFor={`current-${expIdx}`} className="text-xs font-medium text-slate-700">
                    Currently working in this role
                  </label>
                </div>
              </div>

              {/* Bullet Points */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Responsibilities & Achievements
                </label>

                {(exp.responsibilities || []).map((bullet, bulletIdx) => (
                  <div key={bulletIdx} className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={bullet}
                      onChange={(e) => handleBulletChange(expIdx, bulletIdx, e.target.value)}
                      placeholder="e.g. Developed and maintained backend services"
                      className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-brand-500 outline-none"
                    />

                    <button
                      type="button"
                      onClick={() => handleImproveBullet(expIdx, bulletIdx)}
                      disabled={improvingIdx === `${expIdx}-${bulletIdx}`}
                      title="Improve action verbs with AI"
                      className="inline-flex items-center gap-1 px-2.5 py-2 text-xs font-semibold text-brand-700 bg-brand-50 border border-brand-200 rounded-lg hover:bg-brand-100 transition shrink-0 disabled:opacity-50"
                    >
                      {improvingIdx === `${expIdx}-${bulletIdx}` ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-brand-600" />
                      ) : (
                        <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                      )}
                      <span>AI Polish</span>
                    </button>

                    {exp.responsibilities.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveBullet(expIdx, bulletIdx)}
                        className="text-slate-400 hover:text-red-600 transition p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => handleAddBullet(expIdx)}
                  className="text-xs font-semibold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1 mt-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  + Add Bullet Point
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
