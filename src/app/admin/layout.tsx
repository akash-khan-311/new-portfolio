import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen relative">
      {/* <div className="absolute bottom-0 left-[30%] right-0 top-[-50%] h-125 w-125  rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />
      <div className="absolute bottom-0 right-[-10%] top-[-10%] h-125 w-125  rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" /> */}
      <Sidebar />
      <div className="flex-1 relative lg:ml-64 z-0 bg-[#1A1A2E]">
        {/* <TopBar /> */}
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
