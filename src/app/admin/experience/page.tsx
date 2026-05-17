/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import FormField from "@/components/shared/FormField";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import SingleImageUploadField from "@/helpers/SingleImageUpload";
import { useFetcher } from "@/hooks/useFetcher";
import { TExperience } from "@/interface";
import { createExperience, updateExperience } from "@/lib";
import { refreshExperience } from "@/lib/swr";
import { uploadImageToCloudinary } from "@/lib/uploadImageToCloudinary";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ExperienceSection from "./_components/AllExperience";
import PageTitle from "../_components/PageTitle";
const deaultValues: TExperience = {
  position: "",
  company: "",
  location: "",
  startDate: "",
  endDate: "",
  description: "",
  image: "",
  type: "On-site",
};
export default function AdminExperience() {
  const { data: experiences, isLoading } = useFetcher("experience");
  const [resetTrigger, setResetTrigger] = useState(false);
  const [editingExperience, setEditingExperience] =
    useState<TExperience | null>(null);
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
  } = useForm<TExperience>({
    defaultValues: deaultValues,
  });

  console.log("experiences in admin", experiences);
  const onSubmit = async (formData: TExperience) => {
    try {
      setSubmitFormLoading(true);
      const imageValue = formData.image as any;
      const file = imageValue instanceof File ? imageValue : undefined;
      let iconUrl = experiences.find(
        (experience: TExperience) => experience._id === editingId,
      )?.icon;
      let iconPublicId = experiences.find(
        (e: TExperience) => e._id === editingId,
      )?.iconPublicId;
      if (file) {
        const uploaded = await uploadImageToCloudinary({
          file,
          folder: "portfolio1/experiences",
          oldPublicId: experiences.find((e: TExperience) => e._id === editingId)
            ?.iconPublicId,
        });
        if (!uploaded?.url) {
          toast.error("Image upload failed");
          return;
        }
        iconUrl = uploaded.url;
        iconPublicId = uploaded.public_id;
      }
      const payload = {
        position: formData.position,
        company: formData.company,
        location: formData.location,
        startDate: formData.startDate,
        endDate: formData.endDate,
        description: formData.description,
        image: iconUrl,
        type: formData.type,
        iconPublicId,
      };

      const result = editingId
        ? await updateExperience(editingId, payload)
        : await createExperience(payload);

      if (!result.success) {
        toast.error(result.message || "Update failed");
        return;
      }

      toast.success(
        editingId
          ? "Experience updated successfully!"
          : "Experience created successfully!",
      );

      refreshExperience();
      reset(deaultValues);
      setEditingId(null);
      setEditingExperience(null);
      setResetTrigger((prev) => !prev);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setSubmitFormLoading(false);
    }
  };

  const handleEdit = (experience: TExperience) => {
    setEditingId(experience._id || null);
    setEditingExperience(experience);

    reset({
      position: experience.position,
      company: experience.company,
      location: experience.location,
      startDate: experience.startDate,
      endDate: experience.endDate,
      description: experience.description,
      image: experience.image,
      type: experience.type,
    });
  };

  console.log("Checked state:", disabled);
  return (
    <div>
      <PageTitle title="Experience" description="Add your experience" />
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
            <FormField
              name="position"
              label="Position"
              required
              className=" bg-black/10 text-white dark:bg-slate-900 "
              control={control}
              type="combobox"
              options={[
                "Frontend Developer",
                "Backend Developer",
                "Full Stack Developer",
                "Full Stack Software Engineer",
                "UI/UX Designer",
                "Project Manager",
                "Data Scientist",
                "DevOps Engineer",
                "Mobile Developer",
                "QA Engineer",
                "Product Manager",
                "Software Engineer (MERN)",
                "MERN Stack Developer",
              ]}
              register={register}
              errors={errors}
              errorMessage="Position is required"
            />
            <FormField
              name="company"
              label="Company"
              required
              type="text"
              className=" bg-black/10 text-white"
              register={register}
              errors={errors}
              errorMessage="Company is required"
            />
            <FormField
              name="location"
              label="Location"
              required
              type="text"
              className=" bg-black/10 text-white"
              register={register}
              errors={errors}
              errorMessage="Location is required"
            />
            <FormField
              name="type"
              label="Job Type"
              required
              className=" bg-black/10 text-white"
              control={control}
              type="combobox"
              options={["Remote", "On-site", "Hybrid"]}
              register={register}
              errors={errors}
              errorMessage="Position is required"
            />
            <FormField
              name="startDate"
              label="Start Date"
              required
              className=" bg-black/10 text-white"
              control={control}
              type="date"
              register={register}
              errors={errors}
              errorMessage="Start Date is required"
            />
            <div>
              <FormField
                name="endDate"
                label="End Date"
                required
                disabled={disabled}
                control={control}
                type="date"
                register={register}
                errors={errors}
                errorMessage="End Date is required"
              />
              <div className="flex items-center space-x-2 my-2 ">
                <Checkbox
                  onCheckedChange={(checked) => setDisabled(checked === true)}
                  id="current"
                  name="current"
                />
                <Label htmlFor="current" className="text-white">
                  Currently Working Here
                </Label>
              </div>
            </div>
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
          <div className="mt-4">
            <SingleImageUploadField
              setValue={setValue}
              fieldName="image"
              existingImage={editingExperience?.image as string}
              resetTrigger={resetTrigger}
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-5 gradient-border text-white px-10 cursor-pointer h-12 rounded-xl"
          >
            {editingExperience ? (
              "Update Experience"
            ) : (
              <> {submitFormLoading ? "Loading..." : "Add Experience"}</>
            )}
          </Button>
        </form>
      </div>
      <ExperienceSection experiences={experiences} onEdit={handleEdit} />
    </div>
  );
}
