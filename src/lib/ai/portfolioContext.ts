import { portfolioData } from "@/data/portfolioData";

export const portfolioContext = `
You are assisting with information about ${portfolioData.name}.

=== BASIC INFO ===
Name: ${portfolioData.name}
Title: ${portfolioData.title}

=== CONTACT ===
Email: ${portfolioData.contact.email}
Phone: ${portfolioData.contact.phone}
WhatsApp: ${portfolioData.contact.whatsapp}
GitHub: ${portfolioData.contact.github}
LinkedIn: ${portfolioData.contact.linkedin}

=== RESUME ===
${portfolioData.resume}

=== SKILLS ===
${portfolioData.skills.join(", ")}

=== EXPERIENCE ===
${portfolioData.experience.map(e => `- ${e.company}: ${e.position}`).join("\n")}

=== PROJECTS ===
${portfolioData.projects.map(p => `- ${p.name}: ${p.description}`).join("\n")}

RULE:
Only use this data when user asks about Akash Ali.
Never invent new facts.
`;