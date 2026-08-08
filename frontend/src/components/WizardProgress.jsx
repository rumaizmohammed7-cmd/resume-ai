import React from 'react';
import { Check } from 'lucide-react';

const STEPS = [
  { id: 1, name: "Personal" },
  { id: 2, name: "Summary" },
  { id: 3, name: "Education" },
  { id: 4, name: "Experience" },
  { id: 5, name: "Skills" },
  { id: 6, name: "Projects" },
  { id: 7, name: "Extras" },
  { id: 8, name: "Target Job" }
];

export default function WizardProgress({ currentStep, onStepClick }) {
  const percentage = Math.round((currentStep / STEPS.length) * 100);

  return (
    <div className="bg-white border-b border-slate-200 sticky top-16 z-40 py-4 px-4 sm:px-6 shadow-xs">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-600">
          <span className="text-brand-600 font-bold">Step {currentStep} of {STEPS.length}</span>
          <span className="text-slate-500">{percentage}% Completed</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2 mb-4 overflow-hidden">
          <div 
            className="bg-brand-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Step Navigation Bar */}
        <div className="hidden md:flex justify-between items-center relative">
          {STEPS.map((step) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            return (
              <button
                key={step.id}
                onClick={() => onStepClick(step.id)}
                className={`flex flex-col items-center group cursor-pointer transition ${
                  isCurrent ? 'text-brand-600 font-bold' : isCompleted ? 'text-slate-700 font-medium' : 'text-slate-400'
                }`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs mb-1 transition ${
                  isCompleted
                    ? 'bg-brand-600 text-white'
                    : isCurrent
                    ? 'bg-brand-100 text-brand-600 ring-2 ring-brand-600 font-bold'
                    : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                }`}>
                  {isCompleted ? <Check className="w-4 h-4" /> : step.id}
                </div>
                <span className="text-xs tracking-tight">{step.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
