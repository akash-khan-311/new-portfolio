/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import FormField from "@/components/shared/FormField";
import SingleImageUploadField from "@/helpers/SingleImageUpload";
import { TAbout } from "@/interface";
import { getAboutData, updateAboutData } from "@/lib";
import { refreshAbout } from "@/lib/swr";
import { uploadImageToCloudinary } from "@/lib/uploadImageToCloudinary";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function AdminAboutPage() {
  //   const { data } = useFetcher("about");
  const [loading, setLoading] = useState(false);
  const [aboutData, setAboutData] = useState<any>(null);
  const [submitFormLoading, setSubmitFormLoading] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TAbout>({
    defaultValues: {
      heading: "",
      title: "",
      description: "",
      image: "",
      imagePublicId: "",
    },
  });

  // =========================
  // Load data into form
  // =========================
  useEffect(() => {
    async function fetchAbout() {
      setLoading(true);
      try {
        const data = await getAboutData();
        const about = data?.data;
        if (!about) {
          console.error("No about data found");
          return;
        }
        setAboutData(about);
        if (about) {
          reset({
            description: about?.description || "",
            heading: about?.heading || "",
            title: about?.title || "",
            image: about?.image || "",
            imagePublicId: about?.imagePublicId || "",
          });
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to load hero data");
        setLoading(false);
        console.error("Failed to load about data", error);
      }
    }

    fetchAbout();
  }, [reset]);

  // =========================
  // Submit
  // =========================
  const submitForm = async (formData: any) => {
    try {
      setSubmitFormLoading(true);

      const file = formData.image as File;

      let imageUrl = aboutData?.image;
      let imagePublicId = aboutData?.imagePublicId;

      // =========================
      // Upload if new image
      // =========================
      if (file) {
        const uploaded = await uploadImageToCloudinary({
          file,
          folder: "portfolio1/about",
          oldPublicId: aboutData?.imagePublicId,
        });

        if (!uploaded?.url) {
          toast.error("Image upload failed");
          return;
        }

        imageUrl = uploaded.url;
        imagePublicId = uploaded.public_id;
      }

      // =========================
      // Payload
      // =========================
      const payload = {
        heading: formData.heading,
        title: formData.title,
        description: formData.description,
        image: imageUrl,
        imagePublicId,
      };

      const result = await updateAboutData(payload);

      if (!result.success) {
        toast.error(result.message || "Update failed");
        return;
      }

      toast.success("About updated!");
      refreshAbout();
      setAboutData(payload);

      // trigger reset for uploader
      setResetTrigger((prev) => !prev);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setSubmitFormLoading(false);
    }
  };

  console.log("About Data:", aboutData);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-5">
      <FormField
        label="Heading"
        name="heading"
        type="text"
        register={register}
        errors={errors}
      />

      <FormField
        label="Title"
        name="title"
        type="text"
        register={register}
        errors={errors}
      />

      <FormField
        label="Description"
        name="description"
        type="textarea"
        register={register}
        errors={errors}
      />

      <SingleImageUploadField
        setValue={setValue}
        existingImage={aboutData?.image}
        resetTrigger={resetTrigger}
        fieldName="image"
      />

      <button
        type="submit"
        className="bg-green-600 px-6 py-2 rounded text-white"
      >
        {submitFormLoading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
