"use client"
import ChatSection from "../components/chat_section";
import { BackButton } from "@/services/auth/components/back_button";
import { HeaderFeature } from "@/components/ui/header_feature";
import { useState } from "react";
import { History } from "lucide-react";

export default function ChatBot() {
  const [showHistory, setShowHistory] = useState(false);
  return (
    <div className="bg-primary">
      <HeaderFeature
        title="Chat Nubo"
        variant={"white"}
        className="text-center w-full"
        rightSlot={
          <button
            className="p-2 rounded-full stroke-black bg-white shadow"
            title="History"
            onClick={() => setShowHistory(true)}
          >
            <History className="w-4 h-4 text-black" />
          </button>
        }
      />
      <div className="bg-main rounded-t-3xl">
        <ChatSection showHistory={showHistory} setShowHistory={setShowHistory} />
      </div>
    </div>
  );
}

