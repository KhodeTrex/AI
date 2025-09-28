
import React, { useState } from 'react';
import type { NewsItem } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { INITIAL_NEWS_ITEMS } from '../../constants';
import { PlusIcon } from '../icons/PlusIcon';

const NewsCard: React.FC<{ item: NewsItem }> = ({ item }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
        {item.imageUrl && <img className="h-56 w-full object-cover" src={item.imageUrl} alt={item.title} />}
        <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{item.title}</h3>
            <p className="text-gray-600 mb-4">{item.content}</p>
            <div className="text-sm text-gray-500 flex justify-between items-center">
                <span>نویسنده: {item.author}</span>
                <span>{new Date(item.date).toLocaleDateString('fa-IR')}</span>
            </div>
        </div>
    </div>
);

const NewsView: React.FC = () => {
    const { user } = useAuth();
    const [newsItems, setNewsItems] = useState<NewsItem[]>(INITIAL_NEWS_ITEMS);
    const [showForm, setShowForm] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [newImageUrl, setNewImageUrl] = useState('');

    const handleAddNews = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle || !newContent || !user) return;

        const newNewsItem: NewsItem = {
            id: Date.now(),
            title: newTitle,
            content: newContent,
            imageUrl: newImageUrl || `https://picsum.photos/800/400?random=${Date.now()}`,
            author: user.username,
            date: new Date().toISOString(),
        };

        setNewsItems([newNewsItem, ...newsItems]);
        setNewTitle('');
        setNewContent('');
        setNewImageUrl('');
        setShowForm(false);
    };

    return (
        <div className="animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">اخبار و اطلاعیه‌ها</h1>
                {user?.role === 'admin' && (
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg shadow-md hover:bg-sky-600 transition-colors duration-300"
                    >
                        <PlusIcon className="w-5 h-5" />
                        {showForm ? 'لغو' : 'افزودن خبر'}
                    </button>
                )}
            </div>

            {showForm && user?.role === 'admin' && (
                <div className="bg-white p-6 rounded-xl shadow-lg mb-8 animate-fade-in-up">
                    <form onSubmit={handleAddNews} className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-700">خبر جدید</h2>
                        <input
                            type="text"
                            placeholder="عنوان"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                            required
                        />
                        <textarea
                            placeholder="محتوا"
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 h-32"
                            required
                        />
                        <input
                            type="text"
                            placeholder="آدرس تصویر (اختیاری)"
                            value={newImageUrl}
                            onChange={(e) => setNewImageUrl(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                        />
                        <button type="submit" className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors duration-300">
                            انتشار
                        </button>
                    </form>
                </div>
            )}

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-1">
                {newsItems.map(item => <NewsCard key={item.id} item={item} />)}
            </div>
        </div>
    );
};

export default NewsView;
