import { portfolioData } from "@/data/portfolioData";


export function handlePortfolioQuestions(message: string) {
  const q = message.toLowerCase();

  if (
    q.includes("skill") ||
    q.includes("skills") ||
    q.includes("দক্ষতা") ||
    q.includes("স্কিল")
  ) {
    return `
Akash Ali's Skills:

${portfolioData.skills.map((s) => `- ${s}`).join("\n")}
`;
  }

  return null;
}
