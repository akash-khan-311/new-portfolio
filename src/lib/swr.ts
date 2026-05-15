import { mutate } from "swr";

export const refreshHero = () => mutate("/api/hero");
export const refreshAbout = () => mutate("/api/about");
export const refreshProjects = () => mutate("/api/projects");
export const refreshExperience = () => mutate("/api/experience");
export const refreshSkills = () => mutate("/api/skills");
export const refreshSocial = () => mutate("/api/social");
