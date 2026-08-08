const RESUMES_KEY = "resume_ai_saved_resumes";
const CURRENT_RESUME_KEY = "resume_ai_current_draft";

export const getSavedResumes = () => {
  try {
    const data = localStorage.getItem(RESUMES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to read resumes", e);
    return [];
  }
};

export const saveResumeToStorage = (resume) => {
  try {
    const list = getSavedResumes();
    const existingIndex = list.findIndex(r => r.id === resume.id);
    const updated = {
      ...resume,
      updatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    
    if (existingIndex >= 0) {
      list[existingIndex] = updated;
    } else {
      list.unshift(updated);
    }
    
    localStorage.setItem(RESUMES_KEY, JSON.stringify(list));
    return updated;
  } catch (e) {
    console.error("Failed to save resume", e);
    return resume;
  }
};

export const deleteResumeFromStorage = (id) => {
  try {
    const list = getSavedResumes().filter(r => r.id !== id);
    localStorage.setItem(RESUMES_KEY, JSON.stringify(list));
  } catch (e) {
    console.error("Failed to delete resume", e);
  }
};

export const saveDraft = (draft) => {
  try {
    localStorage.setItem(CURRENT_RESUME_KEY, JSON.stringify(draft));
  } catch (e) {
    console.error("Failed to save draft", e);
  }
};

export const getDraft = () => {
  try {
    const data = localStorage.getItem(CURRENT_RESUME_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
};
