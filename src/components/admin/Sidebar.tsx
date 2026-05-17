"use client";
import { useState } from "react";

// Icons
import { MdLogout } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { IoShareSocialSharp } from "react-icons/io5";
import { GrUserExpert } from "react-icons/gr";
import { AiOutlineBars } from "react-icons/ai";
import { FaHome, FaFilePdf } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { GiSkills } from "react-icons/gi";
import { MdContactMail } from "react-icons/md";
import { PiMonitorFill } from "react-icons/pi";
import MenuItem from "./MenuItems";
import { logout } from "@/lib/Auth/logout";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { NavbarLogo } from "../ui/resizable-navbar";

const Sidebar = () => {
  const [isActive, setActive] = useState(false);
  const router = useRouter();
  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  const handleLogout = async () => {
    try {
      const result = await logout();

      if (result.success) {
        toast.success("Logged out");

        // clear any local state (if used)
        localStorage.removeItem("accessToken");

        router.push("/login");
      }
    } catch (err) {
      console.error(err);
      toast.error("Logout failed");
    }
  };
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="text-gray-100 flex justify-between lg:hidden relative z-99999">
        <button
          onClick={handleToggle}
          className="fixed top-0 right-0 p-4 focus:outline-none z-50 cursor-pointer"
        >
          <AiOutlineBars className="h-8 w-8" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed z-40 flex flex-col justify-between overflow-x-hidden backdrop-blur-md bg-[#1d3652] w-64 px-2 py-4 inset-y-0 left-0 transform transition duration-300 ease-in-out
  ${isActive ? "translate-x-0" : "-translate-x-full"}
  lg:translate-x-0`}
      >
        <div className="flex flex-col items-center justify-center mb-4">
          {/* <Link
            href="/"
            className="text-[#16f2b3] text-xl md:text-2xl lg:text-3xl font-bold uppercase"
          >
            akash <span className="text-pink-600">khan</span>
          </Link> */}
          <div className="border-b w-full flex justify-center items-center shadow-2xl ">
            <NavbarLogo />
          </div>
          <div className="flex flex-col flex-1 justify-center space-y-2 mt-10">
            <MenuItem
              icon={MdSpaceDashboard}
              label={"Statistics"}
              path={"/admin"}
            />
            <MenuItem
              icon={FaHome}
              label={"Hero Section"}
              path={"/admin/hero"}
            />
            <MenuItem
              icon={FcAbout}
              label={"About Section"}
              path={"/admin/about"}
            />
            <MenuItem
              icon={IoShareSocialSharp}
              label={"Social Links"}
              path={"/admin/social"}
            />
            <MenuItem
              icon={GrUserExpert}
              label={"Experience Section"}
              path={"/admin/experience"}
            />
            <MenuItem
              icon={GiSkills}
              label={"Skills Section"}
              path={"/admin/skills"}
            />
            <MenuItem
              icon={PiMonitorFill}
              label={"Project Section"}
              path={"/admin/project"}
            />
            <MenuItem
              icon={MdContactMail}
              label={"Information"}
              path={"/admin/info"}
            />
            <MenuItem
              icon={FaFilePdf}
              label={"My Resume"}
              path={"/admin/resume"}
            />
          </div>
        </div>

        <div className="mb-2">
          <hr className="border-white/20 mb-2" />
          <button
            onClick={handleLogout}
            className="flex w-full items-center px-4 cursor-pointer py-2 hover:backdrop-blur-sm hover:bg-white/10  text-white transition-colors duration-300 transform"
          >
            <MdLogout className="w-5 h-5" color="white" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
