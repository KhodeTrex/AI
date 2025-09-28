
import React, { useState, useRef, useEffect } from 'react';
import type { Message } from '../../types';
import { sendMessageToAI } from '../../services/geminiService';
import { SendIcon } from '../icons/SendIcon';
import { UserIcon } from '../icons/UserIcon';
import { BotIcon } from '../icons/BotIcon';
import { SpinnerIcon } from '../icons/SpinnerIcon';

const ChatBubble: React.FC<{ message: Message }> = ({ message }) => {
    const isUser = message.sender === 'user';
    return (
        <div className={`flex items-start gap-3 animate-fade-in-up ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser && (
                 <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white flex-shrink-0">
                    <BotIcon className="w-6 h-6" />
                </div>
            )}
            <div className={`max-w-md lg:max-w-2xl px-5 py-3 rounded-2xl ${isUser ? 'bg-sky-500 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none shadow-md'}`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
            </div>
             {isUser && (
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 flex-shrink-0">
                    <UserIcon className="w-6 h-6" />
                </div>
            )}
        </div>
    );
};


const ChatView: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: 'سلام! چطور میتونم کمکتون کنم؟ 😊',
            sender: 'bot',
            timestamp: new Date().toISOString(),
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;

        const userMessage: Message = {
            id: Date.now(),
            text: input,
            sender: 'user',
            timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const aiResponseText = await sendMessageToAI(input);
        
        const botMessage: Message = {
            id: Date.now() + 1,
            text: aiResponseText,
            sender: 'bot',
            timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-120px)] max-w-4xl mx-auto bg-white/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-sky-200 overflow-hidden">
            <div className="flex-grow p-6 space-y-6 overflow-y-auto">
                {messages.map(msg => <ChatBubble key={msg.id} message={msg} />)}
                {isLoading && (
                    <div className="flex items-start gap-3 animate-fade-in-up justify-start">
                         <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white flex-shrink-0">
                            <BotIcon className="w-6 h-6" />
                        </div>
                        <div className="px-5 py-3 rounded-2xl bg-white text-gray-800 rounded-bl-none shadow-md">
                            <SpinnerIcon className="w-5 h-5 text-sky-500 animate-spin" />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 bg-white/70 border-t border-sky-200">
                <div className="flex items-center bg-gray-100 rounded-full p-2">
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && handleSend()}
                        placeholder="پیام خود را تایپ کنید..."
                        className="flex-grow bg-transparent outline-none px-4 text-gray-700 placeholder-gray-500"
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                        className="w-10 h-10 flex items-center justify-center bg-sky-500 text-white rounded-full disabled:bg-sky-300 transition-colors duration-300 transform hover:scale-110 disabled:scale-100"
                    >
                        <SendIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatView;
