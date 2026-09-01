'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TrainingPlanGenerator from '@/components/TrainingPlanGenerator';
import { useLanguage } from '@/lib/LanguageContext';

export default function CalcPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{t('calc.title')}</h1>
          <p className="text-gray-600 text-lg">
            {t('calc.description')}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <TrainingPlanGenerator />
        </div>

        {/* 功能特点 */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-6 text-center">
            <div className="text-3xl mb-3">🏊‍♂️</div>
            <h3 className="font-bold text-gray-900 mb-2">{t('calc.features.water.title')}</h3>
            <p className="text-sm text-gray-600">{t('calc.features.water.description')}</p>
          </div>

          <div className="bg-green-50 rounded-lg p-6 text-center">
            <div className="text-3xl mb-3">💪</div>
            <h3 className="font-bold text-gray-900 mb-2">{t('calc.features.dryland.title')}</h3>
            <p className="text-sm text-gray-600">{t('calc.features.dryland.description')}</p>
          </div>

          <div className="bg-purple-50 rounded-lg p-6 text-center">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-bold text-gray-900 mb-2">{t('calc.features.flexible.title')}</h3>
            <p className="text-sm text-gray-600">{t('calc.features.flexible.description')}</p>
          </div>
        </div>

        {/* 底部 CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">{t('calc.cta.title')}</h2>
          <p className="mb-6 text-blue-100">
            {t('calc.cta.description')}
          </p>
          <a
            href="/paid"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-block"
          >
            {t('calc.cta.buttonText')}
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}