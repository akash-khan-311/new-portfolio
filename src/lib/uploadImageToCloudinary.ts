export const uploadImageToCloudinary = async ({
  file,
  folder,
  oldPublicId,
}: {
  file: File;
  folder: string;
  oldPublicId?: string;
}) => {
  try {
    // =========================
    // 1. UPLOAD NEW IMAGE FIRST
    // =========================

    const formData = new FormData();

    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
    );

    formData.append("folder", folder);

    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const uploadData = await uploadRes.json();

    if (!uploadRes.ok) {
      throw new Error(uploadData?.error?.message || "Image upload failed");
    }

    const newImage = {
      url: uploadData.secure_url,
      public_id: uploadData.public_id,
    };

    // =========================
    // 2. DELETE OLD IMAGE (AFTER SUCCESS)
    // =========================

    if (oldPublicId) {
      fetch("/api/delete-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          public_id: oldPublicId,
        }),
      }).catch((err) => {
        console.warn("Old image delete failed:", err);
      });
    }

    // =========================
    // 3. RETURN NEW IMAGE
    // =========================

    return {
      success: true,
      url: newImage.url,
      public_id: newImage.public_id,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    return {
      success: false,
      url: "",
      public_id: "",
    };
  }
};