
import { GoogleGenAI, Chat } from '@google/genai';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

let chat: Chat | null = null;

const getChatInstance = (): Chat => {
    if(!chat) {
        chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: 'You are Qwen, a friendly and helpful AI assistant with a slightly playful personality. Keep your responses concise and engaging. Use emojis where appropriate.',
            },
        });
    }
    return chat;
}

export const sendMessageToAI = async (message: string): Promise<string> => {
  try {
    const chatInstance = getChatInstance();
    const response = await chatInstance.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Error communicating with Gemini API:", error);
    return "متاسفانه مشکلی پیش آمده. لطفا دوباره تلاش کنید.";
  }
};
