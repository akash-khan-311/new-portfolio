import {
  TAbout,
  TExperience,
  THero,
  TProject,
  TResume,
  TSkill,
} from "@/interface";
import { fetchWithAuth } from "./Auth/fetchWithAuth";

// Hero API
export const getHeroData = async () => {
  const res = await fetch(`/api/hero`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch hero data");
  }
  const data = await res.json();
  return data;
};

export const updateHeroData = async (payload: THero) => {
  try {
    const res = await fetchWithAuth("/api/hero", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Failed to update hero data");
    }

    const data = await res.json();
    return {
      success: true,
      message: "Hero Data Updated Successfully",
      data: data,
    };
  } catch (error) {
    console.error("Error updating hero data:", error);

    const message =
      error instanceof Error
        ? error.message
        : String(error) || "Something went wrong";
    return {
      success: false,
      message: message,
      data: null,
    };
  }
};

// About API
export const getAboutData = async () => {
  const res = await fetch(`/api/about`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch about data");
  }
  const data = await res.json();
  return data;
};

export const updateAboutData = async (payload: TAbout) => {
  try {
    const res = await fetchWithAuth("/api/about", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Failed to update about data");
    }

    const data = await res.json();
    return {
      success: true,
      message: "About Data Updated Successfully",
      data: data,
    };
  } catch (error) {
    console.error("Error updating about data:", error);

    const message =
      error instanceof Error
        ? error.message
        : String(error) || "Something went wrong";
    return {
      success: false,
      message: message,
      data: null,
    };
  }
};

// Social API
export const getSocialLinks = async () => {
  const res = await fetch(`/api/social`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch social links");
  }
  const data = await res.json();
  return data;
};

export const updateSocialLinks = async (
  socials: { name: string; url: string }[],
) => {
  try {
    const res = await fetchWithAuth("/api/social", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(socials),
    });

    if (!res.ok) {
      throw new Error("Failed to update social data");
    }

    const data = await res.json();
    return {
      success: true,
      message: "social Data Updated Successfully",
      data: data,
    };
  } catch (error) {
    console.error("Error updating social links:", error);

    const message =
      error instanceof Error
        ? error.message
        : String(error) || "Something went wrong";
    return {
      success: false,
      message: message,
      data: null,
    };
  }
};

// Skills API

export const createSkill = async (payload: TSkill) => {
  try {
    const res = await fetchWithAuth("/api/skill", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Failed to update skill data");
    }

    const data = await res.json();
    return {
      success: true,
      message: "skill Data Updated Successfully",
      data: data,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Failed to create skill",
    };
  }
};
export const getAllSkills = async () => {
  try {
    const res = await fetch(`/api/skill`);
    if (!res.ok) {
      throw new Error("Failed to fetch skills");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching skills:", error);
    throw new Error("Failed to fetch skills");
  }
};

export const updateSkill = async (id: string, payload: TSkill) => {
  try {
    const res = await fetchWithAuth("/api/skill", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Failed to update skill data");
    }

    const data = await res.json();
    return {
      success: true,
      message: "skill Data Updated Successfully",
      data: data,
    };
  } catch (error) {
    console.error("Error updating skill:", error);

    const message =
      error instanceof Error
        ? error.message
        : String(error) || "Something went wrong";
    return {
      success: false,
      message: message,
      data: null,
    };
  }
};

export const deleteSkill = async (id: string) => {
  try {
    const res = await fetchWithAuth(`/api/skill/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to Delete skill data");
    }

    const data = await res.json();
    return {
      success: true,
      message: "skill Data Deleted Successfully",
      data: data,
    };
  } catch (error) {
    console.error("Error deleting skill:", error);
    throw new Error("Failed to delete skill");
  }
};

// Experience API
export const createExperience = async (payload: TExperience) => {
  try {
    const res = await fetchWithAuth("/api/experience", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Failed to create experience data");
    }

    const data = await res.json();
    return {
      success: true,
      message: "experience Data Created Successfully",
      data: data,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Failed to create experience",
    };
  }
};

export const updateExperience = async (id: string, payload: TExperience) => {
  try {
    const res = await fetchWithAuth(`/api/experience/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Failed to update experience data");
    }

    const data = await res.json();
    return {
      success: true,
      message: "Hero Data Updated Successfully",
      data: data,
    };
  } catch (error) {
    console.error("Error updating experience:", error);

    const message =
      error instanceof Error
        ? error.message
        : String(error) || "Something went wrong";
    return {
      success: false,
      message: message,
      data: null,
    };
  }
};

export const deleteExperience = async (id: string) => {
  try {
    const res = await fetchWithAuth(`/api/experience${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to Delete experience data");
    }

    const data = await res.json();
    return {
      success: true,
      message: "experience Data Deleted Successfully",
      data: data,
    };
  } catch (error) {
    console.error("Error deleting experience:", error);
    throw new Error("Failed to delete experience");
  }
};
// Project API
export const createProject = async (payload: TProject) => {
  try {
    const res = await fetchWithAuth("/api/project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Failed to create project",
    };
  }
};

export const updateProject = async (id: string, payload: TProject) => {
  try {
    const res = await fetchWithAuth(`/api/project/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      throw new Error("Failed to update project");
    }
    const data = await res.json();
    return {
      success: true,
      message: "Project updated successfully",
      data: data,
    };
  } catch (error) {
    console.error("Error updating project:", error);

    const message =
      error instanceof Error
        ? error.message
        : String(error) || "Something went wrong";
    return {
      success: false,
      message: message,
      data: null,
    };
  }
};

export const deleteProject = async (id: string) => {
  try {
    const res = await fetchWithAuth(`/api/project/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to delete project");
    }
    const data = await res.json();
    return {
      success: true,
      message: "Project deleted successfully",
      data: data,
    };
  } catch (error) {
    console.error("Error deleting project:", error);
    throw new Error("Failed to delete project");
  }
};

export const createResume = async (payload: TResume) => {
  const res = await fetchWithAuth("/api/resume", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return res.json();
};

export const publishResume = async (id: string) => {
  const res = await fetchWithAuth(`/api/resume/${id}`, {
    method: "PATCH",
  });

  return res.json();
};

export const getPublishedResume = async () => {
  try {
    const res = await fetchWithAuth(`/api/resume/published`);
    if (!res.ok) {
      throw new Error("Failed to fetch skills");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching skills:", error);
    throw new Error("Failed to fetch skills");
  }
};

export const deleteResume = async (id: string) => {
  const res = await fetchWithAuth(`/api/resume/${id}`, {
    method: "DELETE",
  });

  return res.json();
};

// Auth Api
type TLogin = { email: string; password: string };
export const login = async (payload: TLogin) => {
  try {
    const res = await fetchWithAuth("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      credentials: "include",
    });

    return res.json();
  } catch (error) {
    console.error("Error login:", error);

    const message =
      error instanceof Error
        ? error.message
        : String(error) || "Something went wrong";
    return {
      success: false,
      message: message,
      data: null,
    };
  }
};
