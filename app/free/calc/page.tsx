'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TrainingPlanGenerator from '@/components/TrainingPlanGenerator';
import { useLanguage } from '@/lib/LanguageContext';
import Icon from '@/components/Icon';

export default function CalcPage() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-9 sm:px-6 sm:py-14 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">{language === 'en' ? 'Free swim planning tool' : '免费游泳计划工具'}</p>
          <h1 className="mb-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{t('calc.title')}</h1>
          <p className="text-base leading-7 text-slate-600 sm:text-lg">
            {t('calc.description')}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5 sm:p-8">
          <TrainingPlanGenerator />
        </div>

        {/* 功能特点 */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-blue-100 bg-white p-6 text-center shadow-sm">
            <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700"><Icon name="water" className="h-6 w-6" /></div>
            <h3 className="font-bold text-gray-900 mb-2">{t('calc.features.water.title')}</h3>
            <p className="text-sm text-gray-600">{t('calc.features.water.description')}</p>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-white p-6 text-center shadow-sm">
            <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700"><Icon name="strength" className="h-6 w-6" /></div>
            <h3 className="font-bold text-gray-900 mb-2">{t('calc.features.dryland.title')}</h3>
            <p className="text-sm text-gray-600">{t('calc.features.dryland.description')}</p>
          </div>

          <div className="rounded-2xl border border-cyan-100 bg-white p-6 text-center shadow-sm">
            <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700"><Icon name="target" className="h-6 w-6" /></div>
            <h3 className="font-bold text-gray-900 mb-2">{t('calc.features.flexible.title')}</h3>
            <p className="text-sm text-gray-600">{t('calc.features.flexible.description')}</p>
          </div>
        </div>

        {/* 底部 CTA */}
        <div className="mt-12 rounded-3xl bg-slate-950 p-8 text-center text-white sm:p-10">
          <h2 className="text-2xl font-bold mb-4">{t('calc.cta.title')}</h2>
          <p className="mb-6 text-blue-100">
            {t('calc.cta.description')}
          </p>
          <a
            href="/paid"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 font-bold text-blue-800 transition hover:bg-cyan-50"
          >
            {t('calc.cta.buttonText')}
            <Icon name="arrow" className="h-4 w-4" />
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
