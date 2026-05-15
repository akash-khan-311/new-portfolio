"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaPhone } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

import { Save } from "lucide-react";

const platforms = [
  { name: "Email Address", icon: IoMail, color: "from-gray-600 to-gray-800" },
  {
    name: "Phone Number",
    icon: FaPhone,
    color: "from-blue-500 to-blue-700",
  },
];

export default function Info() {
  const [links, setLinks] = useState<Record<string, string>>({});

  return (
    <div>
      <h1 className="text-4xl font-bold gradient-text mb-8">
        Personal Information
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {platforms.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div
                className={`w-12 h-12 rounded-xl bg-linear-to-br ${p.color} flex items-center justify-center`}
              >
                <p.icon size={24} />
              </div>
              <h3 className="text-xl font-bold">{p.name}</h3>
            </div>
            <input
              type="url"
              placeholder={`Your ${p.name}`}
              value={links[p.name] || ""}
              onChange={(e) => setLinks({ ...links, [p.name]: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-purple-500 outline-none"
            />
          </motion.div>
        ))}
      </div>

      <button className="btn-primary mt-8 flex items-center gap-2">
        <Save size={20} /> Save All Links
      </button>
    </div>
  );
}
