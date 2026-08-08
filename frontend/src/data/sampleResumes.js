export const initialSampleProfile = {
  id: "demo-resume-1",
  experienceLevel: "0–2 Years Experience",
  personalInfo: {
    fullName: "Alex Rivera",
    title: "Full Stack Software Engineer",
    email: "alex.rivera@example.com",
    phone: "+91 98765 43210",
    location: "Bangalore, Karnataka, India",
    linkedin: "linkedin.com/in/alexrivera",
    github: "github.com/alexrivera",
    portfolio: "alexrivera.dev",
    summary: "Detail-oriented Software Engineer with experience developing scalable web applications using React, Node.js, and PostgreSQL. Passionate about clean code architecture and performance optimization."
  },
  education: [
    {
      degree: "B.Tech in Computer Science and Engineering",
      institution: "National Institute of Technology",
      location: "Bangalore, India",
      startYear: "2020",
      endYear: "2024",
      cgpa: "8.8 / 10.0",
      coursework: "Data Structures, Algorithms, Web Development, Database Management, Operating Systems"
    }
  ],
  experiences: [
    {
      jobTitle: "Junior Software Developer",
      company: "TechNova Solutions",
      location: "Bangalore, India",
      employmentType: "Full-time",
      startDate: "Jun 2024",
      endDate: "Present",
      currentlyWorking: true,
      responsibilities: [
        "Developed and maintained RESTful APIs in Node.js and TypeScript serving over 50,000 active monthly users.",
        "Collaborated with frontend developers to implement responsive React UI components adhering to modern design tokens.",
        "Optimized SQL query execution times by 35% through indexing and query refactoring."
      ]
    }
  ],
  internships: [
    {
      title: "Frontend Engineering Intern",
      company: "CloudScale Systems",
      location: "Remote",
      startDate: "Jan 2024",
      endDate: "May 2024",
      responsibilities: [
        "Built dynamic data visualization dashboards using React and Chart.js.",
        "Wrote unit and integration tests achieving 85%+ code coverage across key UI modules."
      ],
      technologies: ["React", "TypeScript", "Tailwind CSS", "Jest"]
    }
  ],
  skills: {
    "Programming Languages": ["JavaScript", "TypeScript", "Python", "SQL", "HTML5", "CSS3"],
    "Frameworks & Libraries": ["React", "Next.js", "Node.js", "Express.js", "Tailwind CSS"],
    "Databases": ["PostgreSQL", "MongoDB", "Redis"],
    "Tools & Platforms": ["Git", "GitHub", "Docker", "VS Code", "Postman"],
    "Cloud Services": ["AWS S3", "Vercel"]
  },
  projects: [
    {
      name: "AI Resume Builder (ResumeAI)",
      description: "An intelligent ATS resume builder web app offering step-by-step guidance, dynamic layout ordering, and ATS keyword optimization.",
      technologies: ["React", "Tailwind CSS", "FastAPI", "Python"],
      role: "Lead Developer",
      contributions: [
        "Designed and implemented step-by-step wizard forms and real-time live resume preview engine.",
        "Integrated Natural Language keyword matching to calculate ATS match scores and missing skill alerts."
      ],
      githubUrl: "github.com/alexrivera/resume-ai",
      demoUrl: "resume-ai.dev"
    }
  ],
  certifications: [
    {
      name: "AWS Certified Developer – Associate",
      organization: "Amazon Web Services",
      date: "2024",
      credentialUrl: "aws.amazon.com/verify"
    }
  ],
  achievements: [
    {
      title: "1st Place - HackBangalore 2024",
      description: "Won top prize among 120 teams for building an accessible AI note-taking app."
    }
  ],
  languages: [
    { language: "English", proficiency: "Fluent" },
    { language: "Kannada", proficiency: "Native" },
    { language: "Hindi", proficiency: "Conversational" }
  ],
  targetJob: {
    title: "Full Stack Engineer",
    company: "Acme Tech",
    description: "Looking for a Full Stack Software Engineer proficient in React, Node.js, TypeScript, PostgreSQL, and REST APIs. Experience with Docker and AWS is a plus. Responsibilities include building scalable web applications and optimizing system performance."
  },
  template: "classic",
  atsScore: 88,
  updatedAt: "Today"
};
