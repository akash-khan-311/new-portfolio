export const tools = {
  openResume: () => {
    return {
      type: "link",
      url: "https://yourdomain.com/resume.pdf",
    };
  },

  openProjects: () => {
    return {
      type: "navigate",
      section: "projects",
    };
  },

  contactAkash: () => {
    return {
      email: "akash@example.com",
    };
  },
};