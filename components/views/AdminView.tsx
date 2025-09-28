
import React, { useState } from 'react';
import type { User } from '../../types';
import { Role } from '../../types';
import { MOCK_USERS } from '../../constants';
import { useAuth } from '../../context/AuthContext';
import { TrashIcon } from '../icons/TrashIcon';
import { PlusIcon } from '../icons/PlusIcon';
import { UserIcon } from '../icons/UserIcon';


const AdminView: React.FC = () => {
    const [users, setUsers] = useState<User[]>(MOCK_USERS);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const { user: currentUser } = useAuth();

    const handleAddUser = (e: React.FormEvent) => {
        e.preventDefault();
        if(!newUsername || !newPassword) return;

        const newUser: User = {
            id: Date.now(),
            username: newUsername,
            password: newPassword,
            role: Role.USER
        };
        setUsers([...users, newUser]);
        setNewUsername('');
        setNewPassword('');
        setShowAddForm(false);
    }

    const handleDeleteUser = (userId: number) => {
        if (userId === currentUser?.id) {
            alert("نمی‌توانید حساب کاربری خودتان را حذف کنید.");
            return;
        }
        if (users.find(u => u.id === userId)?.role === Role.ADMIN) {
             alert("نمی‌توانید حساب کاربری ادمین را حذف کنید.");
            return;
        }
        setUsers(users.filter(user => user.id !== userId));
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">مدیریت کاربران</h1>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg shadow-md hover:bg-sky-600 transition-colors duration-300"
                >
                    <PlusIcon className="w-5 h-5" />
                    {showAddForm ? 'لغو' : 'افزودن کاربر'}
                </button>
            </div>

            {showAddForm && (
                <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">نام کاربری</label>
                            <input
                                type="text"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                                required
                            />
                        </div>
                        <div className="col-span-1">
                             <label className="block text-sm font-medium text-gray-700 mb-1">رمز عبور</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                                required
                            />
                        </div>
                         <div className="col-span-1">
                            <button type="submit" className="w-full px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors duration-300">
                                ایجاد کاربر
                            </button>
                         </div>
                    </form>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">نام کاربری</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">نقش</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">عملیات</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === Role.ADMIN ? 'bg-sky-100 text-sky-800' : 'bg-green-100 text-green-800'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-900 disabled:text-gray-400" disabled={user.id === currentUser?.id || user.role === Role.ADMIN}>
                                        <TrashIcon className="w-5 h-5"/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminView;
