import React, { useState } from 'react';
import { Plus, X, Tag } from 'lucide-react';

const CATEGORIES = [
  "Programming Languages",
  "Frameworks & Libraries",
  "Databases",
  "Tools & Software",
  "Cloud & DevOps",
  "Other Skills"
];

export default function SkillTagInput({ skills = {}, onChange }) {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [inputValue, setInputValue] = useState("");

  const currentCategorySkills = skills[activeCategory] || [];

  const handleAddSkill = (e) => {
    if (e) e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    if (currentCategorySkills.includes(trimmed)) {
      setInputValue("");
      return;
    }

    const updated = {
      ...skills,
      [activeCategory]: [...currentCategorySkills, trimmed]
    };
    onChange(updated);
    setInputValue("");
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updated = {
      ...skills,
      [activeCategory]: currentCategorySkills.filter(s => s !== skillToRemove)
    };
    onChange(updated);
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-3">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
              activeCategory === cat
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat} {skills[cat]?.length ? `(${skills[cat].length})` : ''}
          </button>
        ))}
      </div>

      {/* Input box */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          Add skills to <span className="text-brand-600 font-bold">{activeCategory}</span>
        </label>
        <form onSubmit={handleAddSkill} className="flex gap-2">
          <div className="relative flex-1">
            <Tag className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Type a skill (e.g. Python, React) and press Enter`}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </form>
      </div>

      {/* Skill Tags Display */}
      <div>
        <p className="text-xs text-slate-500 font-medium mb-3">
          Click tag to remove skill.
        </p>

        {currentCategorySkills.length === 0 ? (
          <div className="text-sm text-slate-400 italic py-4 text-center border border-dashed border-slate-200 rounded-lg">
            No skills added under {activeCategory} yet.
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {currentCategorySkills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200 group transition hover:bg-red-50 hover:text-red-700 hover:border-red-200 cursor-pointer"
                onClick={() => handleRemoveSkill(skill)}
              >
                {skill}
                <X className="w-3.5 h-3.5 text-brand-400 group-hover:text-red-500" />
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
