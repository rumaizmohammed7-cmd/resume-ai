import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from 'docx';

export async function exportToPdf(elementId, filename = "Resume.pdf") {
  const element = document.getElementById(elementId);
  if (!element) {
    alert("Resume element not found for PDF export.");
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff"
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(filename);
  } catch (err) {
    console.error("PDF generation error, falling back to window print:", err);
    window.print();
  }
}

export async function exportToDocx(resumeData, filename = "Resume.docx") {
  const { personalInfo, experiences, education, projects, skills, certifications, achievements } = resumeData;
  const sections = [];

  // Header & Personal Info
  sections.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: personalInfo?.fullName || "Full Name", bold: true, size: 36 }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: personalInfo?.title || "Professional Title", bold: true, size: 24, color: "2563EB" }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: [personalInfo?.email, personalInfo?.phone, personalInfo?.location, personalInfo?.linkedin]
            .filter(Boolean)
            .join(" | "),
          size: 20,
          color: "4B5563"
        }),
      ],
    }),
    new Paragraph({ text: "", spaceAfter: 200 })
  );

  // Summary
  if (personalInfo?.summary) {
    sections.push(
      new Paragraph({
        text: "PROFESSIONAL SUMMARY",
        heading: HeadingLevel.HEADING_2,
        spaceBefore: 150,
        spaceAfter: 100
      }),
      new Paragraph({
        children: [new TextRun({ text: personalInfo.summary, size: 22 })],
        spaceAfter: 200
      })
    );
  }

  // Skills
  if (skills && Object.keys(skills).length > 0) {
    const skillRuns = [];
    Object.entries(skills).forEach(([cat, list]) => {
      if (Array.isArray(list) && list.length > 0) {
        skillRuns.push(
          new TextRun({ text: `${cat}: `, bold: true, size: 22 }),
          new TextRun({ text: `${list.join(", ")}\n`, size: 22 })
        );
      }
    });
    if (skillRuns.length > 0) {
      sections.push(
        new Paragraph({
          text: "TECHNICAL SKILLS",
          heading: HeadingLevel.HEADING_2,
          spaceBefore: 150,
          spaceAfter: 100
        }),
        new Paragraph({ children: skillRuns, spaceAfter: 200 })
      );
    }
  }

  // Experience
  if (experiences && experiences.length > 0) {
    sections.push(
      new Paragraph({
        text: "WORK EXPERIENCE",
        heading: HeadingLevel.HEADING_2,
        spaceBefore: 150,
        spaceAfter: 100
      })
    );

    experiences.forEach(exp => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: exp.jobTitle || "", bold: true, size: 24 }),
            new TextRun({ text: ` — ${exp.company || ""}`, size: 22 }),
            new TextRun({ text: ` (${exp.startDate || ""} - ${exp.currentlyWorking ? "Present" : exp.endDate || ""})`, italics: true, size: 20 })
          ]
        })
      );
      (exp.responsibilities || []).forEach(resp => {
        if (resp) {
          sections.push(
            new Paragraph({
              bullet: { level: 0 },
              children: [new TextRun({ text: resp, size: 20 })]
            })
          );
        }
      });
      sections.push(new Paragraph({ text: "", spaceAfter: 100 }));
    });
  }

  // Projects
  if (projects && projects.length > 0) {
    sections.push(
      new Paragraph({
        text: "KEY PROJECTS",
        heading: HeadingLevel.HEADING_2,
        spaceBefore: 150,
        spaceAfter: 100
      })
    );

    projects.forEach(proj => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: proj.name || "", bold: true, size: 22 }),
            new TextRun({ text: proj.technologies ? ` (${proj.technologies.join(", ")})` : "", italics: true, size: 20 })
          ]
        }),
        new Paragraph({
          children: [new TextRun({ text: proj.description || "", size: 20 })]
        })
      );
      (proj.contributions || []).forEach(c => {
        if (c) {
          sections.push(
            new Paragraph({
              bullet: { level: 0 },
              children: [new TextRun({ text: c, size: 20 })]
            })
          );
        }
      });
      sections.push(new Paragraph({ text: "", spaceAfter: 100 }));
    });
  }

  // Education
  if (education && education.length > 0) {
    sections.push(
      new Paragraph({
        text: "EDUCATION",
        heading: HeadingLevel.HEADING_2,
        spaceBefore: 150,
        spaceAfter: 100
      })
    );

    education.forEach(edu => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: edu.degree || "", bold: true, size: 22 }),
            new TextRun({ text: edu.specialization ? ` in ${edu.specialization}` : "", size: 22 }),
            new TextRun({ text: ` | ${edu.institution || ""}`, size: 22 }),
            new TextRun({ text: ` (${edu.startYear || ""} - ${edu.endYear || ""})`, italics: true, size: 20 })
          ]
        })
      );
      if (edu.cgpa) {
        sections.push(
          new Paragraph({
            children: [new TextRun({ text: `CGPA/Grade: ${edu.cgpa}`, size: 20 })]
          })
        );
      }
    });
  }

  const doc = new Document({
    sections: [{ children: sections }]
  });

  const blob = await Packer.toBlob(doc);
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}
