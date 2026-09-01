'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🏊</span>
              <span className="font-bold text-xl">{t('header.logo')}</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {language === 'en' ? (
                <>
                  A dryland training platform dedicated to amateur swimming enthusiasts.
                  Based at Longchuan Bay, Thousand Island Lake, Zhejiang Provincial Triathlon Federation Training Base.
                  Specialized courses in freestyle with 1v1 online coaching.
                </>
              ) : (
                <>
                  专为业余游泳爱好者打造的陆地训练平台。
                  位于浙江省铁人三项训练基地千岛湖龙川湾。
                  提供自由泳专项课程和1v1在线指导。
                </>
              )}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">
              {language === 'en' ? 'Quick Links' : '快速链接'}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/free/calc" className="text-gray-400 hover:text-white transition">
                  {t('header.trainingTools')}
                </Link>
              </li>
              <li>
                <Link href="/free/blog" className="text-gray-400 hover:text-white transition">
                  {t('header.trainingPlans')}
                </Link>
              </li>
              <li>
                <Link href="/paid" className="text-gray-400 hover:text-white transition">
                  {t('header.course')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">
              {language === 'en' ? 'Contact Us' : '联系我们'}
            </h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>📍 {language === 'en' ? 'Longchuan Bay Training Base, Thousand Island Lake, Zhejiang' : '浙江省千岛湖龙川湾训练基地'}</li>
              <li>📧 contact@drylandswimlab.com</li>
              <li>📱 {language === 'en' ? '1v1 Online Coaching Available' : '提供1v1在线指导'}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}