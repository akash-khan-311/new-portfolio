export interface TSkill {
  _id?: string;
  name: string;
  category: string;
  proficiency: number;
  icon?: string | File | null;
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
  iconPublicId?: string;
  type: "Remote" | "On-site" | "Hybrid";
};

export type TProject = {
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
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
};

export type TInfo = {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  createdAt?: string;
  updatedAt?: string;
};

export type TResume = {
  _id?: string;
  resume?: FileList;
  title: string;
  resumeUrl: string;
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type TAdmin = {
  _id?: string;
  email: string;
  password: string;
  createdAt?: string;
  role?: string;
  updatedAt?: string;
};
