"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import FormField from "@/components/shared/FormField";
import { login } from "@/lib";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const result = await login(data);
      console.log("this is login result", result);
      if (!result.success) {
        toast.error(result.message || "Login failed");
        return;
      }

      toast.success("Login successful");

      reset();

      // redirect to admin dashboard
      router.push("/admin");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md border border-white/10 rounded-2xl p-6 bg-[#0b0b0b]">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Admin Login
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* EMAIL */}
          <FormField
            name="email"
            label="Email"
            type="email"
            required
            placeholder="admin@gmail.com"
            register={register}
            errors={errors}
            errorMessage="Email is required"
            className=" bg-black/10 text-white"
          />

          {/* PASSWORD */}
          <FormField
            name="password"
            label="Password"
            type="password"
            required
            placeholder="••••••••"
            register={register}
            errors={errors}
            errorMessage="Password is required"
            className=" bg-black/10 text-white"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 rounded-xl gradient-border cursor-pointer text-white font-semibold hover:bg-violet-700 transition"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
