import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { BotIcon } from '../icons/BotIcon';
import { MOCK_USERS } from '../../constants';

const LoginView: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(username, password);
    if (!success) {
      setError('نام کاربری یا رمز عبور اشتباه است.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-sky-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-2xl transform transition-all hover:scale-105 duration-300">
        <div className="text-center">
            <div className="inline-block p-4 bg-sky-500 rounded-full">
                <BotIcon className="w-10 h-10 text-white" />
            </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            ورود به حساب کاربری
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            به چت‌بات هوشمند Qwen خوش آمدید
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                placeholder="نام کاربری"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                placeholder="رمز عبور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <button
                type="button"
                onClick={() => alert('این قابلیت هنوز پیاده‌سازی نشده است.')}
                className="font-medium text-sky-600 hover:text-sky-500"
              >
                رمز عبور خود را فراموش کرده‌اید؟
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors duration-300"
            >
              ورود
            </button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            <p className="font-semibold">اطلاعات ورود جهت تست:</p>
            <div className="mt-2 space-y-1 text-left inline-block">
                {MOCK_USERS.map(user => (
                    <div key={user.id} className="text-xs">
                        <span className="font-mono bg-gray-100 p-1 rounded">{user.username}</span> / <span className="font-mono bg-gray-100 p-1 rounded">{user.password}</span> ({user.role})
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default LoginView;
