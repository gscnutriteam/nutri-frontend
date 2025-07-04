"use client";
import { Chat } from "@/components/ui/chat";
import { useChat } from '@ai-sdk/react';
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { createChat, loadChat, listChats } from '../util/chat-store';
import type { Message } from '../util/chat-store';

interface ChatSectionProps {
  showHistory: boolean;
  setShowHistory: (show: boolean) => void;
}

export default function ChatSection({ showHistory, setShowHistory }: ChatSectionProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const chatId = searchParams.get('id');
    const [initialMessages, setInitialMessages] = useState<Message[]>([]);
    const [id, setId] = useState<string | undefined>(chatId || undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState<{id: string, title: string}[]>([]);

    useEffect(() => {
        async function setupChat() {
            if (!id) {
                const newId = await createChat();
                setId(newId);
                router.replace(`?id=${newId}`);
                return;
            }
            const msgs = await loadChat(id);
            // Convert createdAt to Date for compatibility
            const fixedMsgs = msgs.map(m => ({ ...m, createdAt: m.createdAt ? new Date(m.createdAt) : undefined }));
            setInitialMessages(fixedMsgs as any[]);
        }
        setupChat();
    }, [id]);

    const chat = useChat({
        id,
        initialMessages,
        sendExtraMessageFields: true,
    });

    // Load history when modal opened
    useEffect(() => {
        if (showHistory) {
            listChats().then(setHistory);
        }
    }, [showHistory]);

    return (
        <div className="relative h-[97vh] px-3 pt-8">
            {/* Chat UI */}
            <Chat
                className="h-full"
                handleInputChange={chat.handleInputChange}
                handleSubmit={chat.handleSubmit}
                input={chat.input}
                isGenerating={isLoading}
                messages={chat.messages}
                stop={chat.stop}
                onRateResponse={(messageId, rating) => {
                    // console.log("Rating", messageId, rating)
                }}
                append={chat.append}
                suggestions={[
                    "Rekomendasi makan siang yang sehat",
                    "Makanan untuk diet",
                ]}
            />
            {/* History Modal */}
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
                                            ${chat.id === id ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-gray-50'}
                                        `}
                                        onClick={() => {
                                            setShowHistory(false);
                                            setId(chat.id);
                                            router.replace(`?id=${chat.id}`);
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