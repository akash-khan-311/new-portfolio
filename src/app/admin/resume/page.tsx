"use client";

import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import FormField from "@/components/shared/FormField";
import { Button } from "@/components/ui/button";

import { useFetcher } from "@/hooks/useFetcher";

import { createResume, deleteResume, publishResume } from "@/lib";

import { TResume } from "@/interface";
import { refreshResume } from "@/lib/swr";
import { uploadResumeToBlob } from "@/lib/uploadResumeBlog";
import Link from "next/link";
import PageTitle from "../_components/PageTitle";

export default function ResumeAdmin() {
  const { data: resumes = [] } = useFetcher("resume");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TResume>({
    defaultValues: {
      title: "",
      resumeUrl: "",
      isPublished: false,
    },
  });

  const onSubmit = async (formData: TResume) => {
    try {
      const file = formData.resume?.[0];

      if (!file) {
        toast.error("Resume file required");
        return;
      }

      const url = await uploadResumeToBlob(file);

      const payload: TResume = {
        title: formData.title,
        resumeUrl: url,
        isPublished: false,
      };

      const result = await createResume(payload);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success("Resume uploaded");
      refreshResume();
      reset({
        title: "",
        resumeUrl: "",
        isPublished: false,
      });
    } catch (error) {
      console.error(error);
      toast.error("Upload failed");
    }
  };

  const handlePublishedResume = async (id: string) => {
    try {
      const result = await publishResume(id);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success("Resume published");
      refreshResume();
    } catch (error) {
      console.error(error);
      toast.error("Failed to publish resume");
    }
  };

  return (
    <div className="space-y-10">
      {/* Upload Form */}
      <PageTitle title="Upload Resume" description="Upload your resume" />
      <div className="border p-5 rounded-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            name="title"
            label="Resume Title"
            required
            type="text"
            register={register}
            errors={errors}
            className=" bg-black/10 text-white"
            errorMessage="Title is required"
          />
          <FormField
            name="resume"
            label="Upload Resume PDF"
            required
            type="file"
            className=" bg-black/10 text-white"
            register={register}
            errors={errors}
            errorMessage="Resume file is required"
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className=" text-white px-10 py-2 gradient-border rounded-2xl cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Uploading..." : "Upload Resume"}
          </Button>
        </form>
      </div>

      {/* Resume List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {resumes?.map((resume: TResume) => (
          <div
            key={resume._id}
            className="border border-white/10 rounded-2xl overflow-hidden"
          >
            {/* Preview */}

            {/* Content */}
            <div className="p-5">
              <div>
                <h2 className="text-4xl font-bold border-b pb-3 text-white capitalize">
                  {resume.title}
                </h2>
                <div className="my-3">
                  <input
                    checked={resume.isPublished}
                    onChange={() => handlePublishedResume(resume._id as string)}
                    type="checkbox"
                    className="peer sr-only opacity-0"
                    id={resume._id as string}
                  />
                  <label
                    htmlFor={resume._id as string}
                    className="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-gray-400 px-0.5 outline-gray-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300 peer-checked:bg-green-500 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-green-500"
                  ></label>
                </div>
              </div>

              <p className="mt-3 border p-3 text-white rounded-full text-center">
                {resume.isPublished ? "Published" : "Not Published"}
              </p>

              <div className="flex justify-between gap-3 mt-5">
                <Link
                  href={resume.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 gradient-border text-white rounded-lg"
                >
                  View
                </Link>

                <button
                  onClick={() => deleteResume(resume._id as string)}
                  className="px-4 cursor-pointer py-2 bg-red-600 text-white rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
