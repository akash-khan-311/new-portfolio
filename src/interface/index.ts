export type TSkill = {
  name: string;
  icon?: string | FileList;
  iconPublicId?: string;
};

export type TAbout = {
  heading: string;
  title: string;
  description: string;
  image: string | FileList;
  imagePublicId: string;
};

export interface IExperience {
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  current: boolean;
}

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
