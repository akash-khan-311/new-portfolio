export const uploadResumeToBlob = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/resume/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!data.success) throw new Error("Upload failed");

  return data.url;
};