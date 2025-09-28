
import { GoogleGenAI, Chat } from '@google/genai';

// API_KEY is expected to be set in the deployment environment.
const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;
let chat: Chat | null = null;

if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
}

const getChatInstance = (): Chat | null => {
    if (!ai) {
        return null;
    }
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
  if (!API_KEY || !ai) {
    return "خطا: کلید API برای ارتباط با هوش مصنوعی تنظیم نشده است. لطفا با مدیر سیستم تماس بگیرید.";
  }

  try {
    const chatInstance = getChatInstance();
    if (!chatInstance) {
         return "خطا: امکان ایجاد ارتباط با هوش مصنوعی وجود ندارد.";
    }
    const response = await chatInstance.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Error communicating with Gemini API:", error);
    return "متاسفانه در ارتباط با سرویس هوش مصنوعی مشکلی پیش آمده. لطفا دوباره تلاش کنید.";
  }
};