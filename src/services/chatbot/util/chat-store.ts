import { db } from '@/lib/firebase';
import { collection, doc, setDoc, getDoc, addDoc, getDocs, updateDoc, arrayUnion } from 'firebase/firestore';
import { generateId } from 'ai';

// Message type sesuai AI SDK
export type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'data';
  content: string;
  createdAt?: Date;
};

const CHATS = 'chats';
const STREAMS = 'chat_streams';

export async function createChat(): Promise<string> {
  const id = generateId();
  await setDoc(doc(db, CHATS, id), { messages: [] });
  await setDoc(doc(db, STREAMS, id), { streamIds: [] });
  return id;
}

export async function loadChat(id: string): Promise<Message[]> {
  const docSnap = await getDoc(doc(db, CHATS, id));
  if (!docSnap.exists()) return [];
  return docSnap.data().messages || [];
}

export async function saveChat({ id, messages }: { id: string; messages: Message[] }): Promise<void> {
  await setDoc(doc(db, CHATS, id), {
    messages: messages.map(msg => {
      // Remove undefined fields
      const clean = Object.fromEntries(
        Object.entries(msg).filter(([_, v]) => v !== undefined)
      );
      return clean;
    })
  });
}

export async function appendStreamId({ chatId, streamId }: { chatId: string; streamId: string }) {
  await updateDoc(doc(db, STREAMS, chatId), { streamIds: arrayUnion(streamId) });
}

export async function loadStreams(chatId: string): Promise<string[]> {
  const docSnap = await getDoc(doc(db, STREAMS, chatId));
  if (!docSnap.exists()) return [];
  return docSnap.data().streamIds || [];
}

// List all chat ids and their titles (first user message or fallback)
export async function listChats(): Promise<{id: string, title: string}[]> {
  const snapshot = await getDocs(collection(db, CHATS));
  return snapshot.docs.map(doc => {
    const messages = doc.data().messages || [];
    const firstUserMsg = messages.find((m: any) => m.role === 'user');
    return {
      id: doc.id,
      title: firstUserMsg?.content?.slice(0, 40) || 'Chat tanpa judul',
    };
  });
} 