
import React, { useState } from 'react';
import LoginView from './components/views/LoginView';
import NewsView from './components/views/NewsView';
import ChatView from './components/views/ChatView';
import AdminView from './components/views/AdminView';
import Header from './components/Header';
import { useAuth } from './context/AuthContext';
import type { Page } from './types';

const App: React.FC = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('news');

  if (!user) {
    return <LoginView />;
  }

  const renderContent = () => {
    switch (currentPage) {
      case 'news':
        return <NewsView />;
      case 'chat':
        return <ChatView />;
      case 'admin':
        return user.role === 'admin' ? <AdminView /> : <NewsView />;
      default:
        return <NewsView />;
    }
  };

  return (
    <div className="bg-sky-50 min-h-screen font-sans flex flex-col">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
