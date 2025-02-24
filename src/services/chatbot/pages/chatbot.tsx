import { Metadata } from "next";
import ChatSection from "../components/chat_section";
import { BackButton } from "@/services/auth/components/back_button";

export default function ChatBot() {
  return (
    <div className="bg-primary">
      <div className="relative flex w-full bg-primary">
        <BackButton
          variant="white"
          className="absolute top-0 flex items-center left-2 h-full"
        />
        <p className="text-center w-full text-xl py-2 font-semibold text-white">
          Chat Nubo
        </p>
      </div>
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
