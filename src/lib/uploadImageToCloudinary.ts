export const uploadImageToCloudinary = async ({
  file,
  folder,
  oldPublicId,
}: {
  file: File | null;
  folder: string;
  oldPublicId?: string;
}) => {
  try {

    if (!file) {
      return {
        success: false,
        url: "",
        public_id: "",
      };
    }

    const formData = new FormData();

    formData.append("file", file);

    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
    );

    formData.append("folder", folder);

    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload?resource_type=auto`,
      {
        method: "POST",
        body: formData,
      }
    );

    const uploadData = await uploadRes.json();

    if (!uploadRes.ok) {
      throw new Error(
        uploadData?.error?.message || "Upload failed"
      );
    }

    const newFile = {
      url: uploadData.secure_url,
      public_id: uploadData.public_id,
    };

    // delete old image after successful upload
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
        console.error("Delete old image failed:", err);
      });
    }

    return {
      success: true,
      url: newFile.url,
      public_id: newFile.public_id,
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