import React, { useState } from 'react';
import { Plus, Trash2, Sparkles, FolderGit2, RefreshCw } from 'lucide-react';
import { improveBulletApi } from '../services/api';

export default function ProjectsForm({ projects = [], onChange }) {
  const [improvingIdx, setImprovingIdx] = useState(null);

  const handleAdd = () => {
    const newItem = {
      name: "",
      description: "",
      technologies: [],
      role: "",
      contributions: [""],
      githubUrl: "",
      demoUrl: ""
    };
    onChange([...projects, newItem]);
  };

  const handleUpdateField = (index, field, value) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleTechChange = (index, techString) => {
    const arr = techString.split(',').map(s => s.trim()).filter(Boolean);
    handleUpdateField(index, 'technologies', arr);
  };

  const handleContributionChange = (projIndex, cIndex, value) => {
    const updated = [...projects];
    const contribList = [...(updated[projIndex].contributions || [])];
    contribList[cIndex] = value;
    updated[projIndex].contributions = contribList;
    onChange(updated);
  };

  const handleAddContribution = (projIndex) => {
    const updated = [...projects];
    updated[projIndex].contributions = [...(updated[projIndex].contributions || []), ""];
    onChange(updated);
  };

  const handleRemoveContribution = (projIndex, cIndex) => {
    const updated = [...projects];
    const contribList = updated[projIndex].contributions.filter((_, i) => i !== cIndex);
    updated[projIndex].contributions = contribList.length ? contribList : [""];
    onChange(updated);
  };

  const handleImproveContribution = async (projIndex, cIndex) => {
    const text = projects[projIndex]?.contributions?.[cIndex];
    if (!text) return;
    setImprovingIdx(`${projIndex}-${cIndex}`);
    try {
      const polished = await improveBulletApi(text, projects[projIndex]?.name);
      handleContributionChange(projIndex, cIndex, polished);
    } catch (e) {
      console.error(e);
    } finally {
      setImprovingIdx(null);
    }
  };

  const handleRemoveProject = (index) => {
    onChange(projects.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Projects</h2>
          <p className="text-xs text-slate-500 mt-1">Showcase key technical projects, hackathons, or open-source software.</p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1 px-3.5 py-2 text-xs font-bold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-slate-200 rounded-xl text-slate-400 text-sm">
          No projects added yet. Click "+ Add Project" to showcase your work.
        </div>
      ) : (
        <div className="space-y-6">
          {projects.map((proj, projIdx) => (
            <div key={projIdx} className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <FolderGit2 className="w-4 h-4 text-brand-600" />
                  Project #{projIdx + 1}
                </span>

                {projects.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveProject(projIdx)}
                    className="text-slate-400 hover:text-red-600 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Project Name *</label>
                  <input
                    type="text"
                    value={proj.name || ''}
                    onChange={(e) => handleUpdateField(projIdx, 'name', e.target.value)}
                    placeholder="e.g. AI Resume Builder"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Your Role</label>
                  <input
                    type="text"
                    value={proj.role || ''}
                    onChange={(e) => handleUpdateField(projIdx, 'role', e.target.value)}
                    placeholder="e.g. Lead Frontend Developer"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Technologies Used (comma separated)</label>
                  <input
                    type="text"
                    value={(proj.technologies || []).join(', ')}
                    onChange={(e) => handleTechChange(projIdx, e.target.value)}
                    placeholder="React, TypeScript, Node.js, PostgreSQL"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Brief Description</label>
                  <textarea
                    rows={2}
                    value={proj.description || ''}
                    onChange={(e) => handleUpdateField(projIdx, 'description', e.target.value)}
                    placeholder="Brief high-level overview of the project purpose and architecture..."
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">GitHub URL <span className="text-slate-400 font-normal lowercase">(optional)</span></label>
                  <input
                    type="text"
                    value={proj.githubUrl || ''}
                    onChange={(e) => handleUpdateField(projIdx, 'githubUrl', e.target.value)}
                    placeholder="github.com/username/repo"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Live Demo URL <span className="text-slate-400 font-normal lowercase">(optional)</span></label>
                  <input
                    type="text"
                    value={proj.demoUrl || ''}
                    onChange={(e) => handleUpdateField(projIdx, 'demoUrl', e.target.value)}
                    placeholder="myproject.dev"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>
              </div>

              {/* Key Contributions */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Key Contributions & Features
                </label>

                {(proj.contributions || []).map((c, cIdx) => (
                  <div key={cIdx} className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={c}
                      onChange={(e) => handleContributionChange(projIdx, cIdx, e.target.value)}
                      placeholder="e.g. Implemented OAuth2 authentication flow with JWT tokens"
                      className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-brand-500 outline-none"
                    />

                    <button
                      type="button"
                      onClick={() => handleImproveContribution(projIdx, cIdx)}
                      disabled={improvingIdx === `${projIdx}-${cIdx}`}
                      title="Improve action verbs with AI"
                      className="inline-flex items-center gap-1 px-2.5 py-2 text-xs font-semibold text-brand-700 bg-brand-50 border border-brand-200 rounded-lg hover:bg-brand-100 transition shrink-0 disabled:opacity-50"
                    >
                      {improvingIdx === `${projIdx}-${cIdx}` ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-brand-600" />
                      ) : (
                        <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                      )}
                      <span>AI Polish</span>
                    </button>

                    {proj.contributions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveContribution(projIdx, cIdx)}
                        className="text-slate-400 hover:text-red-600 transition p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => handleAddContribution(projIdx)}
                  className="text-xs font-semibold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1 mt-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  + Add Key Contribution
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
