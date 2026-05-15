export interface TSkill {
  _id?: string;
  name: string;
  category: string;
  proficiency: number;
  icon?: string;
  iconPublicId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type TAbout = {
  heading: string;
  title: string;
  description: string;
  image: string | FileList;
  imagePublicId: string;
};

export type TExperience = {
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  image?: string;
  type: "Remote" | "On-site" | "Hybrid";
};

export type TProject = {
  title: string;
  description: string;
  image?: string | FileList;
  imagePublicId?: string;
  codeLink: string;
  liveLink: string;
  technologies: string[];
};

export type THero = {
  heading: string;
  gradientTitle: string;
  description: string;
};

export type TSocial = {
  name: string;
  url: string;
  icon: string;
};
