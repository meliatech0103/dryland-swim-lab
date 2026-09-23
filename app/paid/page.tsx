'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import { lessons } from '@/lib/lessons';
import Link from 'next/link';

export default function PaidPage() {
  const { language } = useLanguage();
  const lesson = lessons[0];
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  const hasCreemLink = lesson.creemLink && lesson.creemLink !== '#';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 课程主卡片 */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* 左侧：课程视觉区 */}
            <div className="bg-gradient-to-br from-cyan-600 to-blue-600 flex flex-col items-center justify-center text-white p-10 min-h-[320px]">
              <div className="text-6xl mb-4">🏊‍♂️</div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">
                {lesson.title[language]}
              </h2>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-5 py-2 mb-4">
                <span className="font-medium">
                  {lesson.sessions} {language === 'en' ? 'Sessions' : '节课程'} × {lesson.sessionsDuration} min
                </span>
              </div>
              <p className="text-cyan-100 text-center text-sm max-w-xs">
                {language === 'en'
                  ? 'Scientific dryland training to transform your freestyle'
                  : '科学陆上训练，让你的自由泳蜕变'}
              </p>
            </div>

            {/* 右侧：课程信息 */}
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {lesson.title[language]}
              </h1>
              <p className="text-gray-600 mb-6">
                {lesson.description[language]}
              </p>

              {/* 课程亮点 */}
              <ul className="space-y-3 mb-8">
                {lesson.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-700">
                    <span className="text-cyan-600 mt-0.5 text-lg">✓</span>
                    <span>{feature[language]}</span>
                  </li>
                ))}
              </ul>

              {/* 价格 + 操作区 */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-black text-gray-900">${lesson.price}</span>
                  <span className="text-gray-500">USD</span>
                  <span className="text-gray-400 text-sm ml-2">
                    {language === 'en'
                      ? `${lesson.totalDuration} min total`
                      : `总计${lesson.totalDuration}分钟`}
                  </span>
                </div>

                {hasCreemLink ? (
                  /* Creem 链接已配置：显示购页按钮 */
                  <>
                    <a
                      href={lesson.creemLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-lg rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
                    >
                      {language === 'en' ? 'Buy Now — $9.9' : '立即购买 — $9.9'}
                    </a>
                    <a
                      href={`/paid/lesson/${lesson.id}`}
                      className="block w-full text-center py-2 mt-3 text-cyan-600 text-sm font-medium hover:text-cyan-700 transition-colors"
                    >
                      {language === 'en'
                        ? 'Already purchased? Enter password →'
                        : '已购买？输入密码解锁 →'}
                    </a>
                  </>
                ) : (
                  /* Creem 链接未配置：显示即将上线 */
                  <>
                    <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl p-4 text-white text-center mb-4">
                      <div className="text-lg font-bold mb-1">
                        {language === 'en' ? 'Course Coming Soon' : '课程即将上线'}
                      </div>
                      <p className="text-cyan-100 text-sm">
                        {language === 'en'
                          ? 'Leave your email to get notified when it launches'
                          : '留下邮箱，课程上线时第一时间通知您'}
                      </p>
                    </div>

                    {!isSubmitted ? (
                      <form onSubmit={handleSubmit} className="mb-3">
                        <div className="flex gap-3">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={language === 'en' ? 'Enter your email' : '输入您的邮箱'}
                            required
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          />
                          <button
                            type="submit"
                            className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                          >
                            {language === 'en' ? 'Notify Me' : '通知我'}
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3 text-center">
                        <span className="text-green-700 font-medium text-sm">
                          ✓ {language === 'en' ? 'You\'re on the list!' : '预约成功！'}
                        </span>
                      </div>
                    )}

                    <a
                      href={`/paid/lesson/${lesson.id}`}
                      className="block w-full text-center py-2 text-cyan-600 text-sm font-medium hover:text-cyan-700 transition-colors"
                    >
                      {language === 'en'
                        ? 'Already purchased? Enter password →'
                        : '已购买？输入密码解锁 →'}
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 课程详情入口 */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-12 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            {language === 'en' ? 'Preview the Course' : '预览课程内容'}
          </h3>
          <p className="text-gray-600 mb-6">
            {language === 'en'
              ? 'Watch the free preview and explore the course structure. If you already have a password, you can unlock the full content.'
              : '观看免费预览，了解课程结构。如果您已有密码，可以解锁完整内容。'}
          </p>
          <Link
            href={`/paid/lesson/${lesson.id}`}
            className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all shadow-md"
          >
            {language === 'en' ? 'View Course Details' : '查看课程详情'} →
          </Link>
        </div>

        {/* 支付方式说明 - 仅在 Creem 链接配置后显示 */}
        {hasCreemLink && (
          <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
              {language === 'en' ? 'Secure Payment Options' : '安全支付方式'}
            </h3>
            <div className="flex flex-wrap justify-center gap-6 items-center">
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-2xl">💳</span>
                <span className="text-sm">{language === 'en' ? 'Credit/Debit Card' : '信用卡/借记卡'}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-2xl">🍎</span>
                <span className="text-sm">Apple Pay</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-2xl">📱</span>
                <span className="text-sm">Google Pay</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-2xl">💚</span>
                <span className="text-sm">{language === 'en' ? 'WeChat Pay' : '微信支付'}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-2xl">🔵</span>
                <span className="text-sm">{language === 'en' ? 'Alipay' : '支付宝'}</span>
              </div>
            </div>
            <p className="text-gray-400 text-xs text-center mt-4">
              {language === 'en'
                ? 'Powered by Creem.io — Secure checkout, instant delivery, 30-day refund guarantee'
                : '由 Creem.io 提供支付服务 — 安全结算，即时交付，30天退款保证'}
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}