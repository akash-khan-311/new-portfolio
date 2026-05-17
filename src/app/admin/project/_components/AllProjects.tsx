import Image from "next/image";
import { Edit, ExternalLink, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { TProject } from "@/interface";
import { FaGithub } from "react-icons/fa6";

type Props = {
  projects: TProject[];
  onEdit: (project: TProject) => void;
  onDelete?: (id: string) => void;
};

function AllProjects({ projects, onEdit, onDelete }: Props) {
  return (
    <section className="mt-16 border-t border-white/10 pt-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-0 top-10 h-56 w-56 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 p-6 md:p-8">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects?.map((project: TProject, index: number) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-b from-white/6 to-white/3 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:shadow-[0_20px_50px_-20px_rgba(6,182,212,0.25)]"
            >
              <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-cyan-400/5 blur-2xl transition group-hover:bg-cyan-400/10" />
              {/* IMAGE */}
              <div className="relative overflow-hidden">
                <Image
                  src={project.image as string}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full  object-cover "
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {project.title}
                    </h3>

                    <p className="text-gray-400 text-sm mt-2 line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* TECHNOLOGIES */}
                <div className="flex flex-wrap gap-2 mt-5">
                  {project.technologies?.map((tech: string, i: number) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-sm bg-violet-500/15 text-violet-300 border border-violet-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* LINKS */}
                <div className="flex items-center gap-3 mt-6">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/15 text-green-400 border border-green-500/20 hover:bg-green-500/20 transition"
                    >
                      <ExternalLink size={16} />
                      Live
                    </a>
                  )}

                  {project.codeLink && (
                    <a
                      href={project.codeLink}
                      target="_blank"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition"
                    >
                      <FaGithub size={16} />
                      Code
                    </a>
                  )}
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-3 mt-6">
                  <button
                    onClick={() => onEdit(project)}
                    className="flex-1 h-11 rounded-xl bg-violet-600 hover:bg-violet-700 text-white transition flex items-center justify-center gap-2"
                  >
                    <Edit size={18} />
                    Edit
                  </button>

                  <button
                    onClick={() => project._id && onDelete?.(project._id)}
                    className="w-11 h-11 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/20 transition flex items-center justify-center"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AllProjects;
