'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

interface UnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlock: (password: string) => void;
  error?: string | null;
}

export default function UnlockModal({
  isOpen,
  onClose,
  onUnlock,
  error,
}: UnlockModalProps) {
  const [password, setPassword] = useState('');
  const { language } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim()) {
      onUnlock(password.trim());
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'en' ? 'Unlock Full Course' : '解锁完整课程'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'en' ? 'Enter Unlock Password' : '输入解锁密码'}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={language === 'en' ? 'Password from purchase email' : '购买邮件中的密码'}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600">
              {language === 'en'
                ? "Don't have a password yet?"
                : '还没有密码？'}
              {' '}
              <span className="text-gray-400">
                {language === 'en'
                  ? 'Purchase via Creem.io — password delivered to your email instantly'
                  : '通过 Creem.io 购买 — 密码即时发送至邮箱'}
              </span>
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              {language === 'en' ? 'Cancel' : '取消'}
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {language === 'en' ? 'Unlock' : '解锁'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}