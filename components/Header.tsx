'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';

export default function Header() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { href: '/', labelKey: 'header.home' },
    { href: '/free/calc', labelKey: 'header.trainingTools' },
    { href: '/free/blog', labelKey: 'header.trainingPlans' },
    { href: '/paid', labelKey: 'header.course' },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
              <path d="M16 8C18.2091 8 20 6.20914 20 4C20 1.79086 18.2091 0 16 0C13.7909 0 12 1.79086 12 4C12 6.20914 13.7909 8 16 8Z" fill="white"/>
              <path d="M8 16C8 16 12 12 16 12C20 12 24 16 24 16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <path d="M6 22L10 18L14 22L18 18L22 22L26 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="28" cy="4" r="2" fill="white" opacity="0.8"/>
              <circle cx="4" cy="28" r="1.5" fill="white" opacity="0.6"/>
            </svg>
            <span className="text-white font-bold text-xl">{t('header.logo')}</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  pathname === item.href
                    ? 'text-white border-b-2 border-white'
                    : 'text-blue-100 hover:text-white'
                }`}
              >
                {t(item.labelKey as any)}
              </Link>
            ))}
          </nav>

          {/* Language Switcher */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                language === 'en'
                  ? 'bg-white text-blue-600'
                  : 'text-blue-100 hover:bg-white/20'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('zh')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                language === 'zh'
                  ? 'bg-white text-blue-600'
                  : 'text-blue-100 hover:bg-white/20'
              }`}
            >
              中文
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}