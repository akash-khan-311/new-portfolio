"use client";
import FormField from "@/components/shared/FormField";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import SingleImageUploadField from "@/helpers/SingleImageUpload";
import { TExperience } from "@/interface";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
const deaultValues: TExperience = {
  position: "",
  company: "",
  location: "",
  startDate: "",
  endDate: "",
  description: "",
  image: "",
};
export default function AdminExperience() {
  const [resetTrigger, setResetTrigger] = useState(false);
  const [editingExperience, setEditingExperience] =
    useState<TExperience | null>(null);
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

  console.log("Checked state:", disabled);
  return (
    <div>
      <h1 className="text-5xl font-semibold text-white">Add Your Experience</h1>

      <div>
        <form action="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
            <FormField
              name="position"
              label="Position"
              required
              className="bg-gray-200 dark:bg-slate-900 "
              control={control}
              type="combobox"
              options={[
                "Frontend Developer",
                "Backend Developer",
                "Full Stack Developer",
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
              className="bg-gray-200 dark:bg-slate-900 "
              register={register}
              errors={errors}
              errorMessage="Company is required"
            />
            <FormField
              name="location"
              label="Location"
              required
              className="bg-gray-200 dark:bg-slate-900 "
              register={register}
              errors={errors}
              errorMessage="Location is required"
            />
            <FormField
              name="type"
              label="Job Type"
              required
              className="bg-gray-200 dark:bg-slate-900 "
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
                <Label htmlFor="current">Currently Working Here</Label>
              </div>
            </div>
          </div>
          <FormField
            name="description"
            label="Description"
            required
            control={control}
            className="bg-gray-200 dark:bg-slate-900"
            type="textarea"
            register={register}
            errors={errors}
            errorMessage="Description is required"
          />
          <div>
            <SingleImageUploadField
              setValue={setValue}
              fieldName="icon"
              existingImage={editingExperience?.image as string}
              resetTrigger={resetTrigger}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
