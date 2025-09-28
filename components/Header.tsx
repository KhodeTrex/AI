
import React from 'react';
import { useAuth } from '../context/AuthContext';
import type { Page } from '../types';
import { BotIcon } from './icons/BotIcon';
import { NewsIcon } from './icons/NewsIcon';
import { ChatIcon } from './icons/ChatIcon';
import { AdminIcon } from './icons/AdminIcon';
import { LogoutIcon } from './icons/LogoutIcon';

interface HeaderProps {
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
}

const NavItem: React.FC<{
    page: Page;
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
    icon: React.ReactNode;
    label: string;
}> = ({ page, currentPage, setCurrentPage, icon, label }) => {
    const isActive = currentPage === page;
    return (
        <button
            onClick={() => setCurrentPage(page)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${isActive ? 'bg-sky-500 text-white shadow-md' : 'text-gray-600 hover:bg-sky-100'}`}
        >
            {icon}
            {label}
        </button>
    );
};

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
    const { user, logout } = useAuth();

    return (
        <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-sky-500 rounded-full text-white">
                           <BotIcon className="w-7 h-7" />
                        </div>
                        <span className="text-2xl font-bold text-gray-800">Qwen AI</span>
                    </div>

                    <nav className="hidden md:flex items-center gap-2 bg-gray-100 p-1 rounded-full">
                        <NavItem page="news" currentPage={currentPage} setCurrentPage={setCurrentPage} icon={<NewsIcon className="w-5 h-5"/>} label="اخبار"/>
                        <NavItem page="chat" currentPage={currentPage} setCurrentPage={setCurrentPage} icon={<ChatIcon className="w-5 h-5"/>} label="چت"/>
                        {user?.role === 'admin' && (
                           <NavItem page="admin" currentPage={currentPage} setCurrentPage={setCurrentPage} icon={<AdminIcon className="w-5 h-5"/>} label="ادمین"/>
                        )}
                    </nav>

                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-700 hidden sm:block">
                           خوش آمدید, <span className="font-bold">{user?.username}</span>
                        </span>
                        <button onClick={logout} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-full hover:bg-red-200 transition-colors duration-300">
                           <LogoutIcon className="w-5 h-5"/>
                           <span className="hidden sm:inline">خروج</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
