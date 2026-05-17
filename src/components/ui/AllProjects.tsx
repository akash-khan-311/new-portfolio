import { TProject } from "@/interface";
import React from "react";
import ProjectCard from "./ProjectCard";

export default function AllProjects({ projects }: { projects: TProject[] }) {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto">
        <div className="p-4">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
            {projects?.map((project: TProject, index: number) => (
              <div
                id={`sticky-card-${index + 1}`}
                key={index}
                className="sticky-card w-full mx-auto  sticky"
              >
                <div className="box-border flex items-center justify-center rounded shadow-[0_0_30px_0_rgba(0,0,0,0.3)] transition-all duration-500">
                  <ProjectCard project={project} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
