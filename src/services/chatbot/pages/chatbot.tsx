import type { Metadata } from "next";
import ChatSection from "../components/chat_section";
import { BackButton } from "@/services/auth/components/back_button";
import { HeaderFeature } from "@/components/ui/header_feature";

export default function ChatBot() {
  return (
    <div className="bg-primary">
      <HeaderFeature title="Chat Nubo" variant={"white"} className="text-center w-full" />
      <div className="bg-main rounded-t-3xl">
        <ChatSection />
      </div>
    </div>
  );
}

export const metadataChatbot: Metadata = {
  title: "Chatbot | NutriBox",
  description: "Chatbot page nutribox app",
  icons: "/assets/img/logo.png",
  openGraph: {
    title: "Chatbot | NutriBox",
    description: "Chatbot nutribox app",
  },
};
