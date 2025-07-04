import ChatSection from "../components/chat_section";
import { HeaderFeature } from "@/components/ui/header_feature";
import { cookies } from 'next/headers';
import { getUserDataFromToken } from '@/lib/jwt_server';
import { History } from "lucide-react";

export default async function ChatBot() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;
  const userData = token ? await getUserDataFromToken(token) : null;

  // showHistory state will be managed in ChatSection (client)
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
            id="history-btn"
          >
            <History className="w-4 h-4 text-black" />
          </button>
        }
      />
      <div className="bg-main rounded-t-3xl">
        <ChatSection
          userData={userData}
        />
      </div>
    </div>
  );
}

