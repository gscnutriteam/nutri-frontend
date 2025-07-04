"use client";
import { useState, useEffect } from "react";
import ChatSection from "../components/chat_section";
import { HeaderFeature } from "@/components/ui/header_feature";
import { History } from "lucide-react";
import { listChats } from '../util/chat-store';

export default function ChatBotClient({ userData }: { userData: any }) {
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<{id: string, title: string}[]>([]);

  useEffect(() => {
    if (showHistory) {
      listChats().then(setHistory);
    }
  }, [showHistory]);

  return (
    <div className="bg-primary">
      <HeaderFeature
        title="Chat Nubo"
        variant={"white"}
        className="text-center w-full"
        rightSlot={
          <button
            className="p-2 rounded-full border-black border bg-white shadow"
            title="History"
            onClick={() => setShowHistory(true)}
          >
            <History className="w-4 h-4 text-black" />
          </button>
        }
      />
      <div className="bg-main rounded-t-3xl">
        <ChatSection userData={userData} />
      </div>
      {showHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90vw] max-w-md max-h-[80vh] flex flex-col gap-2 border border-gray-200">
            <div className="flex justify-between items-center mb-3 border-b border-gray-100 pb-2">
              <span className="font-bold text-lg">Riwayat Chat</span>
              <button onClick={() => setShowHistory(false)} className="text-2xl px-2 py-0.5 rounded hover:bg-gray-100 transition-colors">&times;</button>
            </div>
            <ul className="flex-1 overflow-y-auto divide-y divide-gray-100">
              {history.length === 0 && <li className="text-gray-400 py-4 text-center">Belum ada riwayat</li>}
              {history.map(chat => (
                <li key={chat.id}>
                  <button
                    className={`w-full text-left px-3 py-3 rounded-lg transition-colors flex items-center gap-2
                      hover:bg-gray-50`}
                    onClick={() => {
                      setShowHistory(false);
                      window.location.search = `?id=${chat.id}`;
                    }}
                  >
                    <span className="truncate block text-base">{chat.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
} 