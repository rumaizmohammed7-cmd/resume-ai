import React from 'react';
import { Plus, Trash2, GraduationCap } from 'lucide-react';

export default function EducationForm({ education = [], onChange }) {
  const handleAdd = () => {
    const newItem = {
      degree: "",
      specialization: "",
      institution: "",
      location: "",
      startYear: "",
      endYear: "",
      cgpa: "",
      coursework: ""
    };
    onChange([...education, newItem]);
  };

  const handleUpdate = (index, field, value) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleRemove = (index) => {
    onChange(education.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Education</h2>
          <p className="text-xs text-slate-500 mt-1">Add academic qualifications, degrees, and relevant coursework.</p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1 px-3.5 py-2 text-xs font-bold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-slate-200 rounded-xl text-slate-400 text-sm">
          No education entries added yet. Click "+ Add Education" to begin.
        </div>
      ) : (
        <div className="space-y-6">
          {education.map((item, index) => (
            <div key={index} className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4 relative">
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-brand-600" />
                  Education #{index + 1}
                </span>

                {education.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="text-slate-400 hover:text-red-600 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Degree *</label>
                  <input
                    type="text"
                    value={item.degree || ''}
                    onChange={(e) => handleUpdate(index, 'degree', e.target.value)}
                    placeholder="e.g. B.Tech in Computer Science"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Specialization / Major</label>
                  <input
                    type="text"
                    value={item.specialization || ''}
                    onChange={(e) => handleUpdate(index, 'specialization', e.target.value)}
                    placeholder="e.g. Artificial Intelligence"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">College / University *</label>
                  <input
                    type="text"
                    value={item.institution || ''}
                    onChange={(e) => handleUpdate(index, 'institution', e.target.value)}
                    placeholder="e.g. XYZ University"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Location</label>
                  <input
                    type="text"
                    value={item.location || ''}
                    onChange={(e) => handleUpdate(index, 'location', e.target.value)}
                    placeholder="e.g. Bangalore, India"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Start Year</label>
                  <input
                    type="text"
                    value={item.startYear || ''}
                    onChange={(e) => handleUpdate(index, 'startYear', e.target.value)}
                    placeholder="2020"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Graduation Year</label>
                  <input
                    type="text"
                    value={item.endYear || ''}
                    onChange={(e) => handleUpdate(index, 'endYear', e.target.value)}
                    placeholder="2024"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">CGPA / Percentage</label>
                  <input
                    type="text"
                    value={item.cgpa || ''}
                    onChange={(e) => handleUpdate(index, 'cgpa', e.target.value)}
                    placeholder="e.g. CGPA: 8.5/10 or 85%"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Relevant Coursework</label>
                  <input
                    type="text"
                    value={item.coursework || ''}
                    onChange={(e) => handleUpdate(index, 'coursework', e.target.value)}
                    placeholder="e.g. Data Structures, Web Development, Databases"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
