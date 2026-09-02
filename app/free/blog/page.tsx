'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';

const blogPosts = [
  {
    id: 1,
    titleKey: 'blog.post1.title',
    excerptKey: 'blog.post1.excerpt',
    date: '2026-09-02',
    categoryKey: 'blog.category',
  },
];

const blogContent = {
  en: {
    'blog.post1.title': 'How Amateurs Can Build an Actionable Training Plan: From Water Feel to Systematic Progression',
    'blog.post1.excerpt': 'For amateur swimmers, blindly piling up yardage often yields limited results. Drawing on our team\'s 2 years of practical experience organizing over 120 team training sessions for enthusiasts, this article provides a step-by-step guide to breaking down core goals, integrating specialized dryland swim training, and crafting an actionable training plan that balances work and life to break through long-standing plateaus.',
  },
  zh: {
    'blog.post1.title': '业余爱好者如何制定可实施的训练计划：从水感突破到系统进阶',
    'blog.post1.excerpt': '对于业余游泳爱好者而言，盲目堆砌游量往往效果甚微。结合我们团队2年来组织120余场业余爱好者的团队训练实践经验，手把手教你如何拆解核心目标、结合游泳陆地专项体能训练（Dryland Training），制定一份兼顾工作与生活的可执行游泳训练计划，突破长期以来的技术瓶颈。',
  },
};

export default function BlogPage() {
  const { t, language } = useLanguage();

  const getPostContent = (key: string): string => {
    const content = language === 'en' ? blogContent.en : blogContent.zh;
    if (key in content) {
      return (content as any)[key];
    }
    return key;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{t('blog.title')}</h1>
          <p className="text-gray-600 text-lg">
            {t('blog.description')}
          </p>
        </div>

        <div className="grid gap-6">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-cyan-100 text-cyan-600 px-3 py-1 rounded-full text-sm font-medium">
                  {t(post.categoryKey)}
                </span>
                <span className="text-gray-400 text-sm">{post.date}</span>
              </div>
              <h2 className="text-2xl font-bold mb-3">{getPostContent(post.titleKey)}</h2>
              <p className="text-gray-600 mb-4">{getPostContent(post.excerptKey)}</p>
              <Link
                href={`/free/blog/article-${post.id}`}
                className="text-cyan-600 hover:text-cyan-700 font-medium"
              >
                {t('blog.readMore')}
              </Link>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-cyan-600 to-blue-500 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">{t('blog.cta.title')}</h2>
          <p className="mb-6 text-cyan-100">
            {t('blog.cta.description')}
          </p>
          <Link
            href="/paid"
            className="bg-white text-cyan-600 px-8 py-4 rounded-lg font-semibold hover:bg-cyan-50 transition-colors inline-block"
          >
            {t('blog.cta.buttonText')}
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}