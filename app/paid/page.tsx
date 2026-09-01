'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';

export default function PaidPage() {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-center justify-center">
        <div className="w-full">
          {/* 主标题区域 */}
          <div className="text-center mb-12">
            <div className="inline-block mb-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mb-4 shadow-2xl">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {language === 'en' ? 'Dryland Specialized Training Courses' : '陆上专项训练课程'}
            </h1>

            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
              <p className="text-cyan-300 font-medium text-lg">
                {language === 'en' ? 'Coming Late September 2026' : '即将于 9 月底正式上线，敬请期待'}
              </p>
            </div>

            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              {language === 'en'
                ? 'Our professional coaching team is meticulously crafting and producing specialized dryland training courses designed to transform your swimming performance.'
                : '正在由专业教练团队深度打磨制作，专为提升游泳表现而设计的专业陆上训练课程。'
              }
            </p>
          </div>

          {/* 预约留资区域 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/10 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-3">
                {language === 'en' ? 'Secure Your Early Access' : '抢先预约席位'}
              </h2>
              <p className="text-gray-300 text-base">
                {language === 'en'
                  ? 'Be the first to know when we launch. Early birds get exclusive benefits!'
                  : '上线首发通知我，早鸟用户享受独家福利！'
                }
              </p>
            </div>

            {/* 独家福利说明 */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3 bg-white/5 rounded-lg p-4">
                <div className="flex-shrink-0 w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center">
                  <span className="text-cyan-400">🎁</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">
                    {language === 'en' ? 'Early Bird Discounts' : '首发早鸟优惠'}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {language === 'en'
                      ? 'Get exclusive launch pricing when you sign up now'
                      : '现在预约，上线时享受专属首发折扣'
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/5 rounded-lg p-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <span className="text-blue-400">📊</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">
                    {language === 'en' ? 'Open Water Training Pack' : '公开水域游泳专属资料包'}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {language === 'en'
                      ? 'Free open water swimming training materials for early sign-ups'
                      : '早鸟用户免费获得公开水域游泳训练资料包'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* 预约表单 */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={language === 'en' ? 'Enter your email' : '输入您的邮箱'}
                    required
                    className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    {language === 'en' ? 'Notify Me' : '通知我'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {language === 'en' ? 'You\'re on the list!' : '预约成功！'}
                </h3>
                <p className="text-gray-300">
                  {language === 'en'
                    ? 'We\'ll notify you as soon as we launch. Get ready to transform your swimming!'
                    : '我们会在课程上线时第一时间通知您。准备开始您的游泳蜕变之旅吧！'
                  }
                </p>
              </div>
            )}

            <p className="text-center text-gray-400 text-sm mt-6">
              {language === 'en'
                ? '🔒 Your information is safe. We respect your privacy.'
                : '🔒 您的信息很安全，我们尊重您的隐私。'
              }
            </p>
          </div>

          {/* 专业团队介绍 */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 text-center border border-white/5">
              <div className="text-3xl mb-3">🏊‍♂️</div>
              <h3 className="text-white font-semibold mb-2">
                {language === 'en' ? 'Elite Coaching Team' : '精英教练团队'}
              </h3>
              <p className="text-gray-400 text-sm">
                {language === 'en'
                  ? 'Former national swimmers and certified trainers'
                  : '前国家队成员和专业认证教练'
                }
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 text-center border border-white/5">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-white font-semibold mb-2">
                {language === 'en' ? 'Scientific Training' : '科学训练体系'}
              </h3>
              <p className="text-gray-400 text-sm">
                {language === 'en'
                  ? 'Data-driven approach for optimal results'
                  : '数据驱动的训练方法，追求最佳效果'
                }
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 text-center border border-white/5">
              <div className="text-3xl mb-3">💪</div>
              <h3 className="text-white font-semibold mb-2">
                {language === 'en' ? 'Dryland Specialization' : '陆上专项训练'}
              </h3>
              <p className="text-gray-400 text-sm">
                {language === 'en'
                  ? 'Focused on core strength and technique improvement'
                  : '专注于核心力量和技术提升的专项训练'
                }
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* 弹窗提示 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-md w-full border border-white/10 shadow-2xl">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">
                {language === 'en' ? 'Thanks for Your Interest!' : '感谢您的关注！'}
              </h3>

              <p className="text-gray-300 mb-6 leading-relaxed">
                {language === 'en'
                  ? 'You\'re now on our priority list. As an early subscriber, you\'ll receive:'
                  : '您已加入我们的优先预约名单。作为早鸟用户，您将获得：'
                }
              </p>

              <div className="space-y-3 text-left mb-6">
                <div className="flex items-center gap-3 text-gray-200">
                  <span className="text-cyan-400">✓</span>
                  <span>
                    {language === 'en'
                      ? 'Early bird launch pricing (up to 40% off)'
                      : '首发早鸟优惠（最高4折）'
                    }
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-200">
                  <span className="text-cyan-400">✓</span>
                  <span>
                    {language === 'en'
                      ? 'Free open water swimming training pack'
                      : '免费公开水域游泳训练资料包'
                    }
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-200">
                  <span className="text-cyan-400">✓</span>
                  <span>
                    {language === 'en'
                      ? 'Priority access to course launch'
                      : '课程上线优先访问权'
                    }
                  </span>
                </div>
              </div>

              <button
                onClick={handleCloseModal}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all"
              >
                {language === 'en' ? 'Got It!' : '知道了！'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
