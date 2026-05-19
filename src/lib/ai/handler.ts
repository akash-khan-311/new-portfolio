import { portfolioData } from "@/data/portfolioData";

export function handlePortfolioIntent(intent: string) {
  switch (intent) {
    case "email":
      return "Here is Akash Ali's email: " + portfolioData.contact.email;

    case "phone":
      return (
        "Here is Akash Ali's phone number: " + portfolioData.contact.whatsapp
      ); // or add if you want

    case "whatsapp":
      return "Here is Akash Ali's WhatsApp: " + portfolioData.contact.whatsapp;

    case "github":
      return "Here is Akash Ali's GitHub URL: " + portfolioData.contact.github;

    case " linkedin":
      return (
        "Here is Akash Ali's LinkedIn URL: " + portfolioData.contact.linkedin
      );

    case "resume":
      return "Here is Akash Ali's Resume URL: " + portfolioData.resume;
    case "skills":
      return (
        "### Here is Akash Ali's Skills:\n" +
        portfolioData.skills.map((s) => `- **${s}** `).join("\n")
      );

    case "experience":
      return portfolioData.experience
        .map((e) => `- **${e.company}:** ${e.position}`)
        .join("\n");

    case "projects":
      return portfolioData.projects
        .map((p) => `- **${p.name}:** ${p.description}`)
        .join("\n");

    case "contact":
      return `
### Contact Information

- **Email:** ${portfolioData.contact.email}
- **GitHub:** ${portfolioData.contact.github}
- **LinkedIn:** ${portfolioData.contact.linkedin}
- **Phone:** ${portfolioData.contact.phone}
- **WhatsApp:** ${portfolioData.contact.whatsapp}
`;

    default:
      return null;
  }
}
