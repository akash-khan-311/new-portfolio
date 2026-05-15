import { TAbout, THero, TSkill } from "@/interface";

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
    const res = await fetch(`/api/hero`, {
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
    const res = await fetch(`/api/about`, {
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
    const res = await fetch(`/api/social`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ socials }),
    });

    if (!res.ok) {
      throw new Error("Failed to update social links");
    }

    const result = await res.json();
    return {
      success: true,
      message: "Social Links Updated Successfully",
      data: result,
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
    const res = await fetch("/api/skill", {
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
    const res = await fetch(`/api/skill/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      throw new Error("Failed to update skill");
    }
    const data = await res.json();
    return {
      success: true,
      message: "Skill updated successfully",
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
    const res = await fetch(`/api/skill/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to delete skill");
    }
    const data = await res.json();
    return {
      success: true,
      message: "Skill deleted successfully",
      data: data,
    };
  } catch (error) {
    console.error("Error deleting skill:", error);
    throw new Error("Failed to delete skill");
  }
};
