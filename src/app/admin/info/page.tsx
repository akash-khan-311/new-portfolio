"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaPhone } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

import { Save } from "lucide-react";
import PageTitle from "../_components/PageTitle";

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
  
<PageTitle title="Personal Information" description="Update your personal information" />
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
                className={`w-12 h-12 rounded-xl bg-linear-to-br text-white ${p.color} flex items-center justify-center`}
              >
                <p.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">{p.name}</h3>
            </div>
            <input
              type="url"
              placeholder={`Your ${p.name}`}
              value={links[p.name] || ""}
              onChange={(e) => setLinks({ ...links, [p.name]: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none"
            />
          </motion.div>
        ))}
      </div>

      <button className="gradient-border text-white px-10 py-2 cursor-pointer rounded-2xl mt-8 flex items-center gap-2">
        <Save size={20} /> Save All Links
      </button>
    </div>
  );
}
