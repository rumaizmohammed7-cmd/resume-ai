import React from 'react';
import GoogleStandardTemplate from '../templates/GoogleStandardTemplate';
import ClassicTemplate from '../templates/ClassicTemplate';
import ModernTemplate from '../templates/ModernTemplate';
import ExecutiveTemplate from '../templates/ExecutiveTemplate';

export default function ResumePreview({ data, template = "maang", isCompact = true }) {
  if (!data) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200 text-center text-slate-400">
        No resume data available to preview.
      </div>
    );
  }

  const renderTemplate = () => {
    switch (template) {
      case 'maang':
        return <GoogleStandardTemplate data={data} isCompact={isCompact} />;
      case 'modern':
        return <ModernTemplate data={data} isCompact={isCompact} />;
      case 'executive':
        return <ExecutiveTemplate data={data} isCompact={isCompact} />;
      case 'classic':
      default:
        return <ClassicTemplate data={data} isCompact={isCompact} />;
    }
  };

  return (
    <div className="w-full overflow-x-auto flex justify-center py-2 bg-slate-100/70 rounded-xl border border-slate-200/80">
      <div className="w-full max-w-[820px] transform scale-[0.98] sm:scale-100 origin-top">
        {renderTemplate()}
      </div>
    </div>
  );
}
