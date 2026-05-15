import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { TSkill } from "@/interface";

type Props = {
  skills: TSkill[];
  handleEdit: (skill: TSkill) => void;
};

export default function AllSkills({ skills, handleEdit }: Props) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">All Skills</h2>

      <div className="space-y-4 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills?.map((skill: TSkill) => (
          <motion.div
            key={skill._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: skills.indexOf(skill) * 0.1 }}
            className="glass p-6 border border-white/10 rounded-2xl"
          >
            <div className="flex justify-between items-start mb-4">
              <Image
                src={skill?.icon as string}
                alt={skill.name}
                width={100}
                height={100}
              />
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(skill)}
                  className="p-2 hover:bg-white/10 rounded-lg"
                >
                  <Edit size={16} />
                </button>
                <button className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-1">{skill.name}</h3>
            <p className="text-sm text-gray-400 mb-3">{skill.category}</p>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-purple-500 to-pink-500"
                style={{ width: `${skill.proficiency}%` }}
              />
            </div>
            <p className="text-right text-sm mt-2">{skill.proficiency}%</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
