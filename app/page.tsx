'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageCarousel from '@/components/ImageCarousel';
import { useLanguage } from '@/lib/LanguageContext';

// Hero区域轮播图片配置
const heroImages = [
  '/images/hero/hero-1.jpg',
  '/images/hero/hero-2.jpg',
  '/images/hero/hero-3.jpg',
  '/images/hero/hero-4.jpg',
];

export default function Home() {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[600px] py-20">
          {/* 背景图片轮播 */}
          <div className="absolute inset-0 h-full z-0">
            <ImageCarousel images={heroImages} interval={6000} />
          </div>

          {/* Hero 内容 */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center pt-16">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg text-gray-900">
                {t('home.hero.title')}<br className="hidden md:inline" />
                {t('home.hero.subtitle')}
              </h1>
              <p className="text-xl md:text-2xl mb-8 drop-shadow-md text-gray-800">
                {t('home.hero.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/free/calc"
                  className="px-8 py-4 rounded-lg font-semibold transition-colors shadow-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  {t('home.hero.tryFree')}
                </Link>
                <Link
                  href="/paid"
                  className="px-8 py-4 rounded-lg font-semibold transition-colors shadow-lg backdrop-blur-sm border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  {t('home.hero.viewCourse')}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {t('home.features.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-2">{t('home.features.specialized.title')}</h3>
                <p className="text-gray-600">
                  {t('home.features.specialized.description')}
                </p>
              </div>
              <div className="text-center p-6">
                <div className="text-5xl mb-4">👨‍🏫</div>
                <h3 className="text-xl font-semibold mb-2">{t('home.features.professional.title')}</h3>
                <p className="text-gray-600">
                  {t('home.features.professional.description')}
                </p>
              </div>
              <div className="text-center p-6">
                <div className="text-5xl mb-4">🏊</div>
                <h3 className="text-xl font-semibold mb-2">{t('home.features.trainingBase.title')}</h3>
                <p className="text-gray-600">
                  {t('home.features.trainingBase.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Course Preview - Coming Soon */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {t('home.course.title')}
            </h2>

            {/* Coming Soon 主卡片 */}
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* 课程视觉区域 */}
                <div className="aspect-video bg-gradient-to-br from-cyan-600 to-blue-600 flex flex-col items-center justify-center text-white relative">
                  {/* 时钟图标 */}
                  <div className="text-6xl mb-4 animate-pulse">
                    ⏰
                  </div>
                  {/* Coming Soon 标签 */}
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-4">
                    <span className="text-lg font-medium">
                      {language === 'en' ? 'Coming Soon' : '敬请期待'}
                    </span>
                  </div>
                  {/* 上线时间 */}
                  <p className="text-cyan-100 text-lg">
                    {language === 'en' ? 'Launching Late September 2026' : '9月底正式上线'}
                  </p>
                </div>

                <div className="p-8">
                  {/* 课程标题和描述 */}
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">
                    {language === 'en' ? 'Dryland Specialized Training Courses' : '陆上专项训练课程'}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {language === 'en'
                      ? 'Professional dryland training courses crafted by elite coaches. Designed to transform your swimming performance with scientific methods.'
                      : '由精英教练团队精心打造的专业陆上训练课程。采用科学方法，专为提升游泳表现而设计。'
                    }
                  </p>

                  {/* 独家福利说明 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start gap-3 bg-cyan-50 rounded-lg p-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center">
                        <span className="text-cyan-600">🎁</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {language === 'en' ? 'Early Bird Discounts' : '首发早鸟优惠'}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {language === 'en'
                            ? 'Get exclusive launch pricing when you sign up now'
                            : '现在预约，上线时享受专属首发折扣'
                          }
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-blue-50 rounded-lg p-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <span className="text-blue-600">📊</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {language === 'en' ? 'Open Water Training Pack' : '公开水域游泳专属资料包'}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {language === 'en'
                            ? 'Free open water swimming training materials for early sign-ups'
                            : '早鸟用户免费获得公开水域游泳训练资料包'
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 标签 */}
                  <div className="flex gap-2 mb-6">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {t('home.course.tags.professional')}
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {language === 'en' ? '45 Min Total' : '总计45分钟'}
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                      {language === 'en' ? '3 Sessions' : '3节课程'}
                    </span>
                  </div>

                  {/* 预约表单 */}
                  {!isSubmitted ? (
                    <form onSubmit={handleEmailSubmit} className="mb-4">
                      <div className="flex gap-3">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={language === 'en' ? 'Enter your email for launch notification' : '输入邮箱获取上线通知'}
                          required
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        />
                        <button
                          type="submit"
                          className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-colors"
                        >
                          {language === 'en' ? 'Notify Me' : '通知我'}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-semibold text-green-800">
                          {language === 'en' ? 'You\'re on the list!' : '预约成功！'}
                        </span>
                      </div>
                      <p className="text-green-700 text-sm">
                        {language === 'en'
                          ? 'We\'ll notify you as soon as we launch. Get ready to transform your swimming!'
                          : '我们会在课程上线时第一时间通知您。准备开始您的游泳蜕变之旅吧！'
                        }
                      </p>
                    </div>
                  )}

                  {/* 预约按钮 */}
                  <Link
                    href="/paid"
                    className="block w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-center py-4 rounded-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition-colors"
                  >
                    {language === 'en' ? 'Learn More About Launch' : '了解更多上线信息'}
                  </Link>

                  {/* 隐私说明 */}
                  <p className="text-center text-gray-400 text-sm mt-4">
                    {language === 'en'
                      ? '🔒 Your email is safe with us. We respect your privacy.'
                      : '🔒 您的邮箱很安全，我们尊重您的隐私。'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Course Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl mb-3">💪</div>
                <h4 className="font-semibold text-gray-900 mb-2">{t('home.course.highlights.core.title')}</h4>
                <p className="text-sm text-gray-600">{t('home.course.highlights.core.description')}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl mb-3">⚡</div>
                <h4 className="font-semibold text-gray-900 mb-2">{t('home.course.highlights.speed.title')}</h4>
                <p className="text-sm text-gray-600">{t('home.course.highlights.speed.description')}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl mb-3">🎯</div>
                <h4 className="font-semibold text-gray-900 mb-2">{t('home.course.highlights.technique.title')}</h4>
                <p className="text-sm text-gray-600">{t('home.course.highlights.technique.description')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('home.cta.title')}
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              {t('home.cta.description')}
            </p>
            <Link
              href="/free/calc"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-block"
            >
              {t('home.cta.buttonText')}
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      {/* 弹窗提示 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'en' ? 'Thanks for Your Interest!' : '感谢您的关注！'}
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {language === 'en'
                  ? 'You\'re now on our priority list. As an early subscriber, you\'ll receive:'
                  : '您已加入我们的优先预约名单。作为早鸟用户，您将获得：'
                }
              </p>

              <div className="space-y-3 text-left mb-6">
                <div className="flex items-center gap-3 text-gray-700">
                  <span className="text-cyan-600">✓</span>
                  <span>
                    {language === 'en'
                      ? 'Early bird launch pricing (up to 40% off)'
                      : '首发早鸟优惠（最高4折）'
                    }
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <span className="text-cyan-600">✓</span>
                  <span>
                    {language === 'en'
                      ? 'Free open water swimming training pack'
                      : '免费公开水域游泳训练资料包'
                    }
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <span className="text-cyan-600">✓</span>
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
                className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-colors"
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