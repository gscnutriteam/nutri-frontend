import ChatBot, { metadataChatbot } from "@/services/chatbot/pages/chatbot";

export const metadata = metadataChatbot;
export default function Page() {
  return <ChatBot />;
}
