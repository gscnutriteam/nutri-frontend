import { HeaderFeature } from "@/components/ui/header_feature";
import AppMobileLayout from "@/layout/app_mobile_layout";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { SavedArticles } from "../components/saved-articles";
import { ToastProvider } from "../components/toast-provider";
import FloatingBackToTopWrapper from "../components/floating-back-to-top-wrapper";

export default function InfoKesehatanSaved() {
  return (
    <AppMobileLayout>
      <ToastProvider />
      <div className="bg-white max-h-[90vh] flex flex-col w-full overflow-auto">
        {/* Floating Back To Top Button */}
        <FloatingBackToTopWrapper />
        
        {/* Custom header */}
        <div className="w-full border-b border-gray-200 py-3 px-4 flex items-center relative bg-white">
          <Link href="/app/info-kesehatan" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors absolute left-4 z-10">
            <ArrowLeftIcon size={20} />
          </Link>
          
          <h1 className="text-lg font-semibold text-center w-full text-gray-800">
            Artikel Tersimpan
          </h1>
        </div>
        
        <div className="px-4 py-4">
          <SavedArticles />
        </div>
      </div>
    </AppMobileLayout>
  );
}

export const metadataInfoKesehatanSaved: Metadata = {
  title: "Artikel Tersimpan | NutriBox",
  description: "Artikel tersimpan dari Info Kesehatan",
  icons: "/assets/img/logo.png",
  openGraph: {
    title: "Artikel Tersimpan | NutriBox",
    description: "Artikel tersimpan dari Info Kesehatan",
  },
}; 