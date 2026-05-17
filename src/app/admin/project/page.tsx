/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import FormField from "@/components/shared/FormField";
import { Button } from "@/components/ui/button";
import SingleImageUploadField from "@/helpers/SingleImageUpload";
import { useFetcher } from "@/hooks/useFetcher";
import { TProject } from "@/interface";
import { createProject, updateProject } from "@/lib";

import { refreshExperience } from "@/lib/swr";
import { uploadImageToCloudinary } from "@/lib/uploadImageToCloudinary";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AllProjects from "./_components/AllProjects";
import PageTitle from "../_components/PageTitle";
const deaultValues: TProject = {
  title: "",
  image: "",
  imagePublicId: "",
  codeLink: "",
  liveLink: "",
  description: "",
  technologies: [],
};
export default function AdminProject() {
  const { data: projects, isLoading } = useFetcher("project");
  const [resetTrigger, setResetTrigger] = useState(false);
  const [editingProject, setEditingProject] = useState<TProject | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [submitFormLoading, setSubmitFormLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TProject>({
    defaultValues: deaultValues,
  });

  const onSubmit = async (formData: TProject) => {
    try {
      setSubmitFormLoading(true);
      const imageValue = formData.image as any;
      const file = imageValue instanceof File ? imageValue : undefined;
      let imageUrl = projects.find(
        (project: TProject) => project._id === editingId,
      )?.image;
      let imagePublicId = projects.find(
        (p: TProject) => p._id === editingId,
      )?.imagePublicId;
      if (file) {
        const uploaded = await uploadImageToCloudinary({
          file,
          folder: "portfolio1/projects",
          oldPublicId: projects.find((p: TProject) => p._id === editingId)
            ?.imagePublicId,
        });
        if (!uploaded?.url) {
          toast.error("Image upload failed");
          return;
        }
        imageUrl = uploaded.url;
        imagePublicId = uploaded.public_id;
      }
      const payload = {
        title: formData.title,
        image: imageUrl,
        imagePublicId,
        codeLink: formData.codeLink,
        liveLink: formData.liveLink,
        description: formData.description,
        technologies: formData.technologies,
      };

      const result = editingId
        ? await updateProject(editingId, payload)
        : await createProject(payload);

      if (!result.success) {
        toast.error(result.message || "Update failed");
        return;
      }
      console.log("Payload to submit:", payload);

      toast.success(
        editingId
          ? "Project updated successfully!"
          : "Project created successfully!",
      );

      refreshExperience();
      reset(deaultValues);
      setEditingId(null);
      setEditingProject(null);
      setResetTrigger((prev) => !prev);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setSubmitFormLoading(false);
    }
  };

  const handleEdit = (project: TProject) => {
    setEditingId(project._id || null);
    setEditingProject(project);

    reset({
      title: project.title,
      image: project.image,
      imagePublicId: project.imagePublicId,
      codeLink: project.codeLink,
      liveLink: project.liveLink,
      description: project.description,
      technologies: project.technologies,
    });
  };

  console.log("Checked state:", disabled);
  return (
    <div>
      <PageTitle title="Add Your Project" description="Add Your Project" />
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
            <FormField
              name="title"
              label="Project Title"
              required
              className=" bg-black/10 text-white"
              control={control}
              type="text"
              register={register}
              errors={errors}
              errorMessage="Position is required"
            />
            <FormField
              name="codeLink"
              label="Code Link"
              required
              className=" bg-black/10 text-white"
              register={register}
              errors={errors}
              errorMessage="Code Link is required"
            />
            <FormField
              name="liveLink"
              label="Live Link"
              required
              className=" bg-black/10 text-white"
              register={register}
              errors={errors}
              errorMessage="Live Link is required"
            />
            <FormField
              name="technologies"
              label="Technologies"
              required
              className=" bg-black/10 text-white"
              control={control}
              type="tag"
              placeholder="Write each technology and press enter"
              register={register}
              errors={errors}
              errorMessage="Technologies are required"
            />
          </div>
          <FormField
            name="description"
            label="Description"
            required
            control={control}
            className=" bg-black/10 text-white"
            type="textarea"
            register={register}
            errors={errors}
            errorMessage="Description is required"
          />
          <div>
            <SingleImageUploadField
              setValue={setValue}
              fieldName="image"
              existingImage={editingProject?.image as string}
              resetTrigger={resetTrigger}
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-5 gradient-border text-white px-10 cursor-pointer h-12 rounded-xl"
          >
            {editingProject ? (
              "Update Project"
            ) : (
              <> {submitFormLoading ? "Loading..." : "Add Project"}</>
            )}
          </Button>
        </form>
      </div>
      <AllProjects projects={projects} onEdit={handleEdit} />
    </div>
  );
}
