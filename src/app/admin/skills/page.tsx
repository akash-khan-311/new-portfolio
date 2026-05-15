"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit } from "lucide-react";

export default function SkillsAdmin() {
  const [skills, setSkills] = useState([
    { id: 1, name: "React.js", level: 90, icon: "⚛️", category: "Frontend" },
    { id: 2, name: "Node.js", level: 85, icon: "🟢", category: "Backend" },
    { id: 3, name: "MongoDB", level: 80, icon: "🍃", category: "Database" },
  ]);
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold gradient-text">Manage Skills</h1>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
          <Plus size={20} /> Add Skill
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="text-4xl">{skill.icon}</div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-white/10 rounded-lg"><Edit size={16} /></button>
                <button className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg"><Trash2 size={16} /></button>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-1">{skill.name}</h3>
            <p className="text-sm text-gray-400 mb-3">{skill.category}</p>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: `${skill.level}%` }} />
            </div>
            <p className="text-right text-sm mt-2">{skill.level}%</p>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="glass p-8 w-full max-w-md"
            >
              <h2 className="text-2xl font-bold mb-6">Add New Skill</h2>
              <div className="space-y-4">
                <input placeholder="Skill Name" className="w-full bg-white/5 border border-white/10 rounded-xl p-3" />
                <input placeholder="Icon (emoji)" className="w-full bg-white/5 border border-white/10 rounded-xl p-3" />
                <input type="number" placeholder="Level (0-100)" className="w-full bg-white/5 border border-white/10 rounded-xl p-3" />
                <select className="w-full bg-white/5 border border-white/10 rounded-xl p-3">
                  <option>Frontend</option><option>Backend</option><option>Database</option><option>Tools</option>
                </select>
                <button className="btn-primary w-full">Add Skill</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}