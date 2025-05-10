'use client'
import type React from "react";
import { useState, useEffect } from "react";
import { Home, BarChart2, MessageCircle, User, Scan } from "lucide-react";
import { usePathname } from "next/navigation";
import useScanStore from "@/services/scan/store/scan_store";
import LinkAPP from "../util/link";
// import { usePage } from "@inertiajs/react";

const BottomBar: React.FC = () => {
  const pathname = usePathname();
  const { isLoading } = useScanStore();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/app";
    return pathname.startsWith(path);
  };

  const navItems = [
    { icon: Home, label: "Beranda", path: "/" },
    { icon: BarChart2, label: "Statistik", path: "/app/statistic" },
    { icon: Scan, label: "Scan", path: "/scan", special: true },
    { icon: MessageCircle, label: "Chat Nubo", path: "/app/chat-nubo" },
    { icon: User, label: "Profil", path: "/app/profile" },
  ];

  if (isLoading) {
    return null;
  }
  
  return (
    <div className="fixed z-[100] bottom-[-10px] border-t-black border-l-black border-r-black border-2 left-0 right-0 text-sm mx-auto max-w-md bg-primary flex justify-between items-center py-3 px-3 rounded-t-xl">
      {navItems.map((item) => (
        item.special ? (
          <LinkAPP key={item.path} href={item.path} className="flex flex-col gap-1 items-center -mt-10">
            <div className="bg-bg-selected p-3 rounded-full border-[3px] border-black cursor-pointer">
              <item.icon className="w-6 h-6 text-teal-500" />
            </div>
            <span className="text-white font-medium">{item.label}</span>
          </LinkAPP>
        ) : (
          <LinkAPP 
            key={item.path} 
            href={item.path} 
            className={`flex flex-col gap-1 items-center p-2 ${isActive(item.path) ? "text-primary bg-bg-selected rounded-lg cursor-default" : "cursor-pointer"}`}
          >
            <item.icon className={`w-6 h-6 ${isActive(item.path) ? "text-primary" : "text-white"}`} />
            <span className={`font-medium ${isActive(item.path) ? "text-primary" : "text-white"}`}>{item.label}</span>
          </LinkAPP>
        )
      ))}
    </div>
  );
};

export default BottomBar;