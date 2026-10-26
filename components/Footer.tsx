'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/LanguageContext';
import Icon from '@/components/Icon';

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/logo-transparent.png"
                alt="Dryland Swim Lab"
                width={28}
                height={28}
              />
              <span className="font-bold text-xl">{t('header.logo')}</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {language === 'en' ? (
                <>
                  A dryland training platform dedicated to amateur swimming enthusiasts.
                </>
              ) : (
                <>
                  专为业余游泳爱好者打造的陆地训练平台。
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
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-center gap-2"><Icon name="mail" className="h-4 w-4 flex-none text-cyan-400" />contact@drylandswimlab.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <div className="flex justify-center gap-4 mb-3">
            <Link href="/free/terms" className="hover:text-white transition">
              {language === 'en' ? 'Terms of Service' : '服务条款'}
            </Link>
            <span>|</span>
            <Link href="/free/privacy" className="hover:text-white transition">
              {language === 'en' ? 'Privacy Policy' : '隐私政策'}
            </Link>
          </div>
          <p>{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
