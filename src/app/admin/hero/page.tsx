/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import FormField from "@/components/shared/FormField";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { THero } from "@/interface";
import { refreshHero } from "@/lib/swr";
import { getHeroData, updateHeroData } from "@/lib";
import PageTitle from "../_components/PageTitle";

export default function HeroAdmin() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<THero>({
    defaultValues: {
      heading: "",
      gradientTitle: "",
      description: "",
    },
  });

  const [submitFormLoading, setSubmitFormLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    async function fetchHero() {
      setLoading(true);
      try {
        const data = await getHeroData();
        const hero = data?.data;

        if (!hero) return;

        setHeroData(hero);

        reset({
          heading: hero?.heading || "",
          gradientTitle: hero?.gradientTitle || "",
          description: hero?.description || "",
        });
      } catch (error) {
        console.error("Failed to load hero data", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHero();
  }, [reset]);

  const onSubmit = async (formData: THero) => {
    try {
      setSubmitFormLoading(true);
      const result = await updateHeroData(formData);
      if (result.success) {
        toast.success("Hero section updated!");
        refreshHero();
      } else {
        toast.error("Failed to update hero section");
      }
    } catch (error) {
      console.error("Error updating hero data:", error);
      toast.error("An error occurred while updating hero section");
    } finally {
      setSubmitFormLoading(false);
    }
  };
  return (
    <div>
      <PageTitle
        title="Hero Section"
        description="Manage your portfolio's hero content"
      />
      <form className="space-y-6 mt-10" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <FormField
            className=" bg-black/10 text-white"
            label="Heading"
            name="heading"
            type="text"
            placeholder="I'm Akash, a Full Stack Developer"
            register={register}
            errors={errors}
            required
            errorMessage="Heading is required"
          />
          <FormField
            className=" bg-black/10 text-white"
            label="Gradient Title"
            name="gradientTitle"
            type="text"
            placeholder="Full Stack Developer"
            register={register}
            errors={errors}
            required
            errorMessage="Gradient title is required"
          />
          <FormField
            className=" bg-black/10 text-white"
            label="Description"
            name="description"
            type="textarea"
            placeholder="I'm a passionate full stack developer with experience in building modern web applications."
            register={register}
            errors={errors}
            required
            errorMessage="Description is required"
          />
        </div>
        <div>
          <Button
            className="gradient-border cursor-pointer"
            type="submit"
            disabled={loading || isSubmitting}
          >
            {submitFormLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
