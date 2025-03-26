"use client";
import { Chat } from "@/components/ui/chat";
import { useChat } from '@ai-sdk/react';
import { useEffect, useState } from "react";
export default function ChatSection() {
    const { messages, input, handleInputChange, handleSubmit, stop, append, error } = useChat()
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        // console.log("Messages", messages)
        console.log("Error", error)
    }
    , [messages, error])
    return (
        <Chat
        className="h-[97vh] px-3 pt-8"
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        input={input}
        isGenerating={isLoading}
        messages={messages}
        stop={stop}
        onRateResponse={(messageId, rating) => {
            console.log("Rating", messageId, rating)
        }}
        append={append}
        suggestions={[
            "Rekomendasi makan siang yang sehat",
            "Makanan untuk diet",
        ]}
        />
    )
}