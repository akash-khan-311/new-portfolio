"use client";

import { TExperience } from "@/interface";
import { formattedDate } from "@/lib/formattedDate";
import Image from "next/image";

type ExperienceStatus = "Published" | "Draft" | "Archived";
type EmploymentType =
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Freelance"
  | "Internship";

export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  type: EmploymentType;
  status: ExperienceStatus;
  summary: string;
  skills: string[];
  highlights: string[];
};

type Props = {
  experiences: TExperience[];
  onEdit: (experience: TExperience) => void;
};

const typeStyles: Record<EmploymentType, string> = {
  "Full-time": "bg-cyan-500/10 text-cyan-300 border-cyan-400/20",
  "Part-time": "bg-violet-500/10 text-violet-300 border-violet-400/20",
  Contract: "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-400/20",
  Freelance: "bg-sky-500/10 text-sky-300 border-sky-400/20",
  Internship: "bg-orange-500/10 text-orange-300 border-orange-400/20",
};

function EditIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
}

export default function ExperienceSection({ experiences, onEdit }: Props) {
  return (
    <section className="">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-0 top-10 h-56 w-56 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 p-6 md:p-8">
        {/* cards */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {experiences?.map((item) => (
            <div
              key={item._id}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-b from-white/6 to-white/3 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:shadow-[0_20px_50px_-20px_rgba(6,182,212,0.25)]"
            >
              <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-cyan-400/5 blur-2xl transition group-hover:bg-cyan-400/10" />

              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex  items-center justify-center rounded-2xl ">
                    <Image
                      src={item.image as string}
                      alt={item.company}
                      width={100}
                      height={100}
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white md:text-xl">
                      {item.position}
                    </h3>
                    <p className="text-sm text-slate-300">
                      {item.company} • {item.location}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {formattedDate(item.startDate)} -{" "}
                      {formattedDate(item.endDate)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                <span
                  className={`rounded-full gradient-border px-3 py-1 text-xs font-medium ${typeStyles[item.type as EmploymentType] ?? "border-slate-400/30 bg-slate-500/10 text-slate-300"}`}
                >
                  {item.type}
                </span>

                {item.endDate === "Present" && (
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                    Currently Active
                  </span>
                )}
              </div>

              <p className="mb-5 text-sm leading-6 text-slate-300">
                {item.description}
              </p>

              <div className=" gap-3 border-t border-white/10 pt-4">
                <div className="flex justify-between items-center gap-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/15"
                  >
                    <EditIcon />
                    Edit
                  </button>

                  <button className="inline-flex items-center gap-2 rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-2 text-sm font-medium text-rose-300 transition hover:bg-rose-500/15">
                    <TrashIcon />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
