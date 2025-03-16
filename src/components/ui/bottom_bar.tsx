'use client'
import type React from "react";
import { useState, useEffect } from "react";
import { Home, BarChart2, MessageCircle, User, Scan } from "lucide-react";
import { usePathname } from "next/navigation";
import useScanStore from "@/services/scan/store/scan_store";
// import { usePage } from "@inertiajs/react";

const BottomBar: React.FC = () => {
  const [active, setActive] = useState("");
  const path = usePathname();
  const { isLoading } = useScanStore();

  useEffect(() => {
    setActive(path);
  }, [path]);


  const classActive = "text-primary bg-bg-selected rounded-lg cursor-default";
  const iconActive = "text-primary";
  const textActive = "text-primary";
  const classDefault = "cursor-pointer";

  if (isLoading) {
    return null;
  }
  
  return (
    <div className="fixed z-[100] bottom-0 border-t-black border-2 left-0 right-0 text-sm mx-auto max-w-md bg-primary flex justify-between items-center py-3 px-3 rounded-t-xl">
      {/* Beranda */}
      <div className={`flex flex-col gap-1 items-center p-2 ${active === "/app" ? classActive : classDefault}`}>
        <Home className={`w-6 h-6 ${active === "/app" ? iconActive : "text-white"}`} />
        <span className={`font-medium ${active === "/app" ? textActive : "text-white"}`}>Beranda</span>
      </div>

      {/* Statistik */}
      <div className={`flex flex-col gap-1 items-center p-2 ${active === "/app/statistic" ? classActive : classDefault}`}>
        <BarChart2 className={`w-6 h-6 ${active === "/app/statistic" ? iconActive : "text-white"}`} />
        <span className={`font-medium ${active === "/app/statistic" ? textActive : "text-white"}`}>Statistik</span>
      </div>

      {/* Scan */}
      <div className="flex flex-col gap-1 items-center -mt-10">
        <div className="bg-bg-selected p-3 rounded-full border-[3px] border-black cursor-pointer">
          <Scan className="w-6 h-6 text-teal-500" />
        </div>
        <span className="text-white font-medium">Scan</span>
      </div>

      {/* Chat Nubo */}
      <div className={`flex flex-col gap-1 items-center p-2 ${active === "/app/chat-nubo" ? classActive : classDefault}`}>
        <MessageCircle className={`w-6 h-6 ${active === "/app/chat-nubo" ? iconActive : "text-white"}`} />
        <span className={`font-medium ${active === "/app/chat-nubo" ? textActive : "text-white"}`}>Chat Nubo</span>
      </div>

      {/* Profil */}
      <div className={`flex flex-col gap-1 items-center p-2 ${active === "/app/profile" ? classActive : classDefault}`}>
        <User className={`w-6 h-6 ${active === "/app/profile" ? iconActive : "text-white"}`} />
        <span className={`font-medium ${active === "/app/profile" ? textActive : "text-white"}`}>Profil</span>
      </div>
    </div>
  );
};

export default BottomBar;