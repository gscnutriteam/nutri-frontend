import ChatBot from "@/services/chatbot/pages/chatbot";
import { Metadata } from "next";

export default async function Page() {
  return <ChatBot />;
}

export const metadata: Metadata = {
  title: "Chatbot | NutriPlate",
  description: "Chatbot page NutriPlate app",
  icons: "/assets/img/logo.png",
  openGraph: {
    title: "Chatbot | NutriPlate",
    description: "Chatbot NutriPlate app",
  },
};
