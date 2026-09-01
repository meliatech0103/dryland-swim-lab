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
    date: '2025-08-15',
    categoryKey: 'blog.category',
  },
  {
    id: 2,
    titleKey: 'blog.post2.title',
    excerptKey: 'blog.post2.excerpt',
    date: '2025-08-10',
    categoryKey: 'blog.category',
  },
  {
    id: 3,
    titleKey: 'blog.post3.title',
    excerptKey: 'blog.post3.excerpt',
    date: '2025-08-05',
    categoryKey: 'blog.category',
  },
  {
    id: 4,
    titleKey: 'blog.post4.title',
    excerptKey: 'blog.post4.excerpt',
    date: '2025-07-28',
    categoryKey: 'blog.category',
  },
];

const blogContent = {
  en: {
    'blog.post1.title': 'How Amateur Swimmers Can Plan Their Dryland Training',
    'blog.post1.excerpt': 'Dryland training is crucial for swimming enthusiasts. This article introduces how to create a scientifically structured dryland training plan based on your personal situation...',
    'blog.post2.title': '5 Core Dryland Training Exercises for Freestyle',
    'blog.post2.excerpt': 'Freestyle requires strong upper body power and perfect stroke technique. These 5 dryland training exercises can help you practice effectively at home...',
    'blog.post3.title': 'Freestyle Dryland Training Guide: Enhance Stroke Power',
    'blog.post3.excerpt': 'Freestyle stroke power directly affects swimming speed. This article details how to enhance stroke power through dryland training...',
    'blog.post4.title': 'Longchuan Bay Thousand Island Lake Training Base: Student Success Stories',
    'blog.post4.excerpt': 'At the Longchuan Bay Thousand Island Lake Training Base, we have witnessed the transformation of countless amateur swimming enthusiasts. Here are the success stories of several students...',
  },
  zh: {
    'blog.post1.title': '业余游泳爱好者如何制定陆地训练计划',
    'blog.post1.excerpt': '陆地训练对游泳爱好者至关重要。本文介绍如何根据个人情况制定科学结构的陆地训练计划...',
    'blog.post2.title': '自由泳5个核心陆地训练动作',
    'blog.post2.excerpt': '自由泳需要强大的上肢力量和完美的划水技术。这5个陆地训练动作可以帮助你在家有效练习...',
    'blog.post3.title': '自由泳陆地训练指南：增强划水力量',
    'blog.post3.excerpt': '自由泳划水力量直接影响游泳速度。本文详细介绍如何通过陆地训练增强划水力量...',
    'blog.post4.title': '千岛湖龙川湾训练基地：学员成功案例',
    'blog.post4.excerpt': '在千岛湖龙川湾训练基地，我们见证了无数业余游泳爱好者的蜕变。以下是几位学员的成功故事...',
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
                href="#"
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