export function detectIntent(text: string) {
  const t = text.toLowerCase();

  // CONTACT
  if (t.includes("email")) return "email";
  if (t.includes("phone") || t.includes("number")) return "phone";
  if (t.includes("whatsapp")) return "whatsapp";
  if (t.includes("github")) return "github";
  if (t.includes("linkedin")) return "linkedin";
  if (t.includes("contact")) return "contact";

  // ABOUT
  if (t.includes("about")) return "about";

  //   EXPERIENCE
  if (t.includes("experience")) return "experience";

  // SKILLS
  if (t.includes("skill")) return "skills";

  // PROJECTS
  if (t.includes("project")) return "projects";

  // RESUME
  if (t.includes("resume") || t.includes("cv")) return "resume";

  return null;
}
