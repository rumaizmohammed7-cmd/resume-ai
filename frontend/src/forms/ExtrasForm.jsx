import React from 'react';
import { Plus, Trash2, Award, Trophy, Languages as LangIcon } from 'lucide-react';

const PROFICIENCY_OPTIONS = ["Native", "Fluent", "Professional", "Conversational", "Basic"];

export default function ExtrasForm({ data = {}, onChange }) {
  const certifications = data.certifications || [];
  const achievements = data.achievements || [];
  const languages = data.languages || [];

  const updateSubField = (key, value) => {
    onChange({
      ...data,
      [key]: value
    });
  };

  // Certifications handlers
  const handleAddCert = () => {
    updateSubField('certifications', [...certifications, { name: "", organization: "", date: "", credentialUrl: "" }]);
  };
  const handleUpdateCert = (index, field, value) => {
    const updated = [...certifications];
    updated[index] = { ...updated[index], [field]: value };
    updateSubField('certifications', updated);
  };
  const handleRemoveCert = (index) => {
    updateSubField('certifications', certifications.filter((_, i) => i !== index));
  };

  // Achievements handlers
  const handleAddAchievement = () => {
    updateSubField('achievements', [...achievements, { title: "", description: "" }]);
  };
  const handleUpdateAchievement = (index, field, value) => {
    const updated = [...achievements];
    updated[index] = { ...updated[index], [field]: value };
    updateSubField('achievements', updated);
  };
  const handleRemoveAchievement = (index) => {
    updateSubField('achievements', achievements.filter((_, i) => i !== index));
  };

  // Languages handlers
  const handleAddLang = () => {
    updateSubField('languages', [...languages, { language: "", proficiency: "Fluent" }]);
  };
  const handleUpdateLang = (index, field, value) => {
    const updated = [...languages];
    updated[index] = { ...updated[index], [field]: value };
    updateSubField('languages', updated);
  };
  const handleRemoveLang = (index) => {
    updateSubField('languages', languages.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8">
      {/* Certifications */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-brand-600" />
            <h3 className="text-lg font-bold text-slate-900">Certifications</h3>
          </div>

          <button
            type="button"
            onClick={handleAddCert}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-brand-700 bg-brand-50 rounded-lg hover:bg-brand-100 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Certification
          </button>
        </div>

        {certifications.length === 0 ? (
          <p className="text-xs text-slate-400 italic py-2">No certifications added. Click "+ Add Certification" if applicable.</p>
        ) : (
          <div className="space-y-3">
            {certifications.map((cert, index) => (
              <div key={index} className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 relative items-center">
                <input
                  type="text"
                  value={cert.name || ''}
                  onChange={(e) => handleUpdateCert(index, 'name', e.target.value)}
                  placeholder="Certification Name"
                  className="px-3 py-1.5 text-xs border border-slate-300 rounded bg-white"
                />
                <input
                  type="text"
                  value={cert.organization || ''}
                  onChange={(e) => handleUpdateCert(index, 'organization', e.target.value)}
                  placeholder="Issuing Organization"
                  className="px-3 py-1.5 text-xs border border-slate-300 rounded bg-white"
                />
                <input
                  type="text"
                  value={cert.date || ''}
                  onChange={(e) => handleUpdateCert(index, 'date', e.target.value)}
                  placeholder="Year / Date"
                  className="px-3 py-1.5 text-xs border border-slate-300 rounded bg-white"
                />
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={cert.credentialUrl || ''}
                    onChange={(e) => handleUpdateCert(index, 'credentialUrl', e.target.value)}
                    placeholder="Credential URL"
                    className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded bg-white"
                  />
                  <button type="button" onClick={() => handleRemoveCert(index)} className="text-slate-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Achievements */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-bold text-slate-900">Achievements & Leadership</h3>
          </div>

          <button
            type="button"
            onClick={handleAddAchievement}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-brand-700 bg-brand-50 rounded-lg hover:bg-brand-100 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Achievement
          </button>
        </div>

        {achievements.length === 0 ? (
          <p className="text-xs text-slate-400 italic py-2">No achievements added. List hackathons, awards, or honors here.</p>
        ) : (
          <div className="space-y-3">
            {achievements.map((ach, index) => (
              <div key={index} className="flex gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 items-center">
                <input
                  type="text"
                  value={ach.title || ''}
                  onChange={(e) => handleUpdateAchievement(index, 'title', e.target.value)}
                  placeholder="Achievement Title (e.g. 1st Place Hackathon)"
                  className="w-1/3 px-3 py-1.5 text-xs border border-slate-300 rounded bg-white"
                />
                <input
                  type="text"
                  value={ach.description || ''}
                  onChange={(e) => handleUpdateAchievement(index, 'description', e.target.value)}
                  placeholder="Brief description or context"
                  className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded bg-white"
                />
                <button type="button" onClick={() => handleRemoveAchievement(index)} className="text-slate-400 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Languages */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <LangIcon className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-900">Languages</h3>
          </div>

          <button
            type="button"
            onClick={handleAddLang}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-brand-700 bg-brand-50 rounded-lg hover:bg-brand-100 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Language
          </button>
        </div>

        {languages.length === 0 ? (
          <p className="text-xs text-slate-400 italic py-2">No languages specified.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {languages.map((lang, index) => (
              <div key={index} className="flex gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-200 items-center">
                <input
                  type="text"
                  value={lang.language || ''}
                  onChange={(e) => handleUpdateLang(index, 'language', e.target.value)}
                  placeholder="e.g. English, Kannada, Hindi"
                  className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded bg-white"
                />
                <select
                  value={lang.proficiency || 'Fluent'}
                  onChange={(e) => handleUpdateLang(index, 'proficiency', e.target.value)}
                  className="px-2 py-1.5 text-xs border border-slate-300 rounded bg-white"
                >
                  {PROFICIENCY_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <button type="button" onClick={() => handleRemoveLang(index)} className="text-slate-400 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
