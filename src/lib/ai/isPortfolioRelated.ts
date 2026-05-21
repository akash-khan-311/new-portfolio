export function isPortfolioRelated(text: string) {
  const t = text.toLowerCase();

  return (
    t.includes("akash") ||
    t.includes("resume") ||
    t.includes("cv") ||
    t.includes("project") ||
    t.includes("experience") ||
    t.includes("skill") ||
    t.includes("contact") ||
    t.includes("github") ||
    t.includes("linkedin") ||
    t.includes("whatsapp")
  );
}