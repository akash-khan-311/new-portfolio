"use client";
import { motion } from "framer-motion";
import { Eye, User, Code, Briefcase, FolderGit, Mail } from "lucide-react";
import PageTitle from "./_components/PageTitle";

const stats = [
  {
    label: "Total Visits",
    value: "1,247",
    icon: Eye,
    color: "from-purple-500 to-pink-500",
  },
  {
    label: "Hero Updates",
    value: "6",
    icon: User,
    color: "from-cyan-500 to-blue-500",
  },
  {
    label: "Skills Added",
    value: "12",
    icon: Code,
    color: "from-green-500 to-emerald-500",
  },
  {
    label: "Experience",
    value: "4",
    icon: Briefcase,
    color: "from-orange-500 to-red-500",
  },
  {
    label: "Projects",
    value: "18",
    icon: FolderGit,
    color: "from-yellow-500 to-orange-500",
  },
  {
    label: "Messages",
    value: "23",
    icon: Mail,
    color: "from-pink-500 to-rose-500",
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <PageTitle
        title="Admin Dashboard"
        description="Welcome back! Here's what's happening with your portfolio."
      />
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="glass p-6 cursor-pointer border rounded-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center`}
              >
                <stat.icon size={24} />
              </div>
              <span className="text-green-400 text-sm">+12%</span>
            </div>
            <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
            <p className="text-gray-400 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass p-6">
          <h2 className="text-xl font-bold my-4 pb-4 border-b">
            Recent Activity
          </h2>
          <ul className="space-y-3">
            {[
              "Updated Hero section",
              "Added new project",
              "Edited About info",
              "New contact message",
            ].map((act, i) => (
              <li
                key={i}
                className="flex justify-between items-center p-3 bg-white/5 rounded-lg"
              >
                <span className="text-gray-300">{act}</span>
                <span className="text-xs text-gray-500">{i + 1}h ago</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass p-6">
          <h2 className="text-xl font-bold my-4 pb-4 border-b">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {["Add Project", "Add Skill", "Update Hero", "View Site"].map(
              (action) => (
                <button key={action} className="btn-primary text-sm">
                  {action}
                </button>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
