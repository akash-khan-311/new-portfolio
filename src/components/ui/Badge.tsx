"use client";
import { motion } from "motion/react";

export default function Badge({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-400 dark:bg-white/5 border border-white/10 backdrop-blur-sm mb-6"
    >
      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
      <span className="text-xs text-white/80 ">{text}</span>
    </motion.div>
  );
}
