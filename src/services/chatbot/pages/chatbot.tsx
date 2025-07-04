import { cookies } from 'next/headers';
import { getUserDataFromToken } from '@/lib/jwt_server';
import ChatBotClient from './chatbot-client';

export default async function ChatBotServer() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;
  const userData = token ? await getUserDataFromToken(token) : null;

  return <ChatBotClient userData={userData} />;
}

