/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

import FormField from "@/components/shared/FormField";
import { TSkill } from "@/interface";
import SingleImageUploadField from "@/helpers/SingleImageUpload";
import toast from "react-hot-toast";
import { uploadImageToCloudinary } from "@/lib/uploadImageToCloudinary";
import { refreshSkills } from "@/lib/swr";
import { useFetcher } from "@/hooks/useFetcher";
import { createSkill, updateSkill } from "@/lib";

import AllSkills from "./_components/AllSkills";

const deaultValues: TSkill = {
  name: "",
  category: "",
  proficiency: 0,
  icon: "",
  iconPublicId: "",
};
export default function SkillsAdmin() {
  const { data: skills, isLoading } = useFetcher("skill");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingSkill, setEditingSkill] = useState<TSkill | null>(null);
  const [resetTrigger, setResetTrigger] = useState(false);
  const [submitFormLoading, setSubmitFormLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TSkill>({
    defaultValues: deaultValues,
  });
  const onSubmit = async (formData: any) => {
    try {
      setSubmitFormLoading(true);
      const file = formData.icon as File;
      let iconUrl = skills.find((s: TSkill) => s._id === editingId)?.icon;
      let iconPublicId = skills.find(
        (s: TSkill) => s._id === editingId,
      )?.iconPublicId;
      if (file) {
        const uploaded = await uploadImageToCloudinary({
          file,
          folder: "portfolio1/about",
          oldPublicId: skills.find((s: TSkill) => s._id === editingId)
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
        name: formData.name,
        category: formData.category,
        proficiency: formData.proficiency,
        icon: iconUrl,
        iconPublicId,
      };
      const result = editingId
        ? await updateSkill(editingId, payload)
        : await createSkill(payload);

      if (!result.success) {
        toast.error(result.message || "Update failed");
        return;
      }

      toast.success(
        editingId
          ? "Skill updated successfully!"
          : "Skill created successfully!",
      );

      refreshSkills();
      reset(deaultValues);
      setEditingId(null);
      setEditingSkill(null);
      setResetTrigger((prev) => !prev);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setSubmitFormLoading(false);
    }
  };
  const handleEdit = (skill: TSkill) => {
    setEditingId(skill._id || null);
    setEditingSkill(skill);

    reset({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      icon: skill.icon,
      iconPublicId: skill.iconPublicId,
    });
  };
  return (
    <>
      <div className="min-h-screen p-6">
        <div className="">
          {/* FORM */}
          <div className="border border-white/10 rounded-2xl p-6">
            <h1 className="text-3xl font-bold mb-8 text-white">
              {editingId ? "Update Skill" : "Add Skill"}
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                label="Skill Name"
                className=" bg-gray-200  dark:bg-slate-900"
                name="name"
                placeholder="React.js"
                register={register}
                errors={errors}
                required
                errorMessage="Skill name is required"
              />

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  label="Category"
                  name="category"
                  type="combobox"
                  control={control}
                  options={[
                    "frontend",
                    "backend",
                    "database",
                    "tools",
                    "other",
                  ]}
                  register={register}
                  errors={errors}
                  required
                  className=" bg-gray-200  dark:bg-slate-900"
                  errorMessage="Category is required"
                />

                <FormField
                  label="Proficiency"
                  name="proficiency"
                  type="combobox"
                  control={control}
                  options={Array.from({ length: 21 }, (_, i) => String(i * 5))} // 0, 5, 10, ..., 100
                  placeholder="90"
                  register={register}
                  errors={errors}
                  required
                  className=" bg-gray-200  dark:bg-slate-900"
                  errorMessage="Proficiency is required"
                />
              </div>

              <SingleImageUploadField
                setValue={setValue}
                fieldName="icon"
                existingImage={editingSkill?.icon as string}
                resetTrigger={resetTrigger}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="h-12 px-6 rounded-xl bg-violet-600 text-white"
              >
                {isSubmitting
                  ? "Processing..."
                  : editingId
                    ? "Update Skill"
                    : "Add Skill"}
              </button>
            </form>
          </div>
          {/* SKILLS */}
          <AllSkills skills={skills} handleEdit={handleEdit} />
        </div>
      </div>
    </>
  );
}
