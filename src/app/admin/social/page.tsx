"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Plus, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getSocialLinks, updateSocialLinks } from "@/lib";
import { refreshSocial } from "@/lib/swr";
import toast from "react-hot-toast";
import PageTitle from "../_components/PageTitle";

type SocialForm = {
  socials: {
    name: string;
    url: string;
  }[];
};

export default function SocialAdmin() {
  const [loading, setLoading] = useState(false);
  const { register, control, handleSubmit } = useForm<SocialForm>({
    defaultValues: {
      socials: [],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "socials",
  });

  // =========================
  // LOAD DATA FROM DB
  // =========================
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const data = await getSocialLinks();
      const socials = data?.data?.socials || [];
      if (data) {
        replace(socials);
      }

      setLoading(false);
    };

    fetchData();
  }, [replace]);

  const onSubmit = async (data: SocialForm) => {
    console.log("FINAL PAYLOAD:", data);

    try {
      setLoading(true);
      const result = await updateSocialLinks(data.socials);
      console.log(result);
      if (result.success) {
        toast.success("Social links updated!");
        refreshSocial();
      }
    } catch (error) {
      toast.error("Failed to update social links.");
      console.error("Error updating social links:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageTitle title="Social Links" description="Update your social links" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-10">
        {/* DYNAMIC LIST */}
        <div className="space-y-4">
          {loading ? (
            <>
              {" "}
              <div className="glass p-6 rounded-xl border border-white/10 animate-pulse">
                {/* Header */}
                <div className="flex justify-between mb-4">
                  <div className="h-4 w-24 bg-white/10 rounded" />
                  <div className="h-6 w-6 bg-white/10 rounded" />
                </div>

                {/* Inputs */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="h-10 w-full bg-white/10 rounded-lg" />
                  <div className="h-10 w-full bg-white/10 rounded-lg" />
                </div>
              </div>
            </>
          ) : (
            fields?.map((field, index) => (
              <div
                key={field.id}
                className="glass p-6 rounded-xl border border-white/10"
              >
                <div className="flex justify-between mb-3">
                  <h2 className="font-semibold text-white">
                    Social #{index + 1}
                  </h2>

                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    {...register(`socials.${index}.name`)}
                    placeholder="Platform Name"
                    className="w-full p-3 bg-white/5 border text-white rounded-lg"
                  />

                  <input
                    {...register(`socials.${index}.url`)}
                    placeholder="Platform URL"
                    className="w-full p-3 bg-white/5 border text-white rounded-lg"
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {/* BUTTONS */}
        <div className="flex justify-between gap-4">
          <Button
            type="button"
            className="gradient-border px-10 py-2 cursor-pointer text-white"
            onClick={() => append({ name: "", url: "" })}
          >
            <Plus size={18} /> Add New
          </Button>

          <Button
            className="gradient-border px-10 py-2 cursor-pointer text-white"
            type="submit"
          >
            <Save size={18} /> Save All
          </Button>
        </div>
      </form>
    </div>
  );
}
