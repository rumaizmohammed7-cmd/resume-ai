import React from 'react';

export default function PersonalInfoForm({ data = {}, onChange }) {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Personal Information</h2>
        <p className="text-xs text-slate-500 mt-1">Enter your basic contact and social information. Social links are optional.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Full Name *</label>
          <input
            type="text"
            required
            value={data.fullName || ''}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="e.g. Alex Rivera"
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Professional Title *</label>
          <input
            type="text"
            required
            value={data.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="e.g. Software Engineer"
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Email *</label>
          <input
            type="email"
            required
            value={data.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="alex.rivera@example.com"
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Phone *</label>
          <input
            type="tel"
            required
            value={data.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+91 98765 43210"
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Location *</label>
          <input
            type="text"
            required
            value={data.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="e.g. Bangalore, Karnataka, India"
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">LinkedIn <span className="text-slate-400 font-normal lowercase">(optional)</span></label>
          <input
            type="text"
            value={data.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="linkedin.com/in/alexrivera"
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">GitHub <span className="text-slate-400 font-normal lowercase">(optional)</span></label>
          <input
            type="text"
            value={data.github || ''}
            onChange={(e) => handleChange('github', e.target.value)}
            placeholder="github.com/alexrivera"
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Portfolio / Website <span className="text-slate-400 font-normal lowercase">(optional)</span></label>
          <input
            type="text"
            value={data.portfolio || ''}
            onChange={(e) => handleChange('portfolio', e.target.value)}
            placeholder="alexrivera.dev"
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
          />
        </div>
      </div>
    </div>
  );
}
