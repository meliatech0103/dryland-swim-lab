'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageCarousel from '@/components/ImageCarousel';
import StructuredData from '@/components/StructuredData';
import Icon from '@/components/Icon';
import { useLanguage } from '@/lib/LanguageContext';

// Hero区域轮播图片配置
const heroImages = [
  '/images/hero/hero-2.jpg', // pictures/IMG_5643.JPG
  '/images/hero/hero-1.jpg', // pictures/IMG_5634.JPG
];

export default function Home() {
  const { t, language } = useLanguage();
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <StructuredData />
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative isolate flex min-h-[560px] items-center overflow-hidden py-12 sm:min-h-[620px] sm:py-16">
          {/* 背景图片轮播 */}
          <div className="absolute inset-0 h-full z-0">
            <ImageCarousel images={heroImages} interval={6000} />
          </div>
          <div className="absolute inset-0 z-[1] bg-gradient-to-r from-slate-950/70 via-slate-950/35 to-slate-950/5" />
          <div className="absolute inset-0 z-[1] bg-gradient-to-t from-slate-950/25 via-transparent to-slate-950/10" />

          {/* Hero 内容 */}
          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl py-8 sm:py-12">
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-slate-950/25 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-cyan-300" />
                {language === 'en' ? 'Free freestyle training planner' : '免费自由泳训练计划'}
              </p>
              <h1 className="mb-5 max-w-xl text-4xl font-black leading-[1.08] tracking-tight text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.24)] sm:text-5xl lg:text-6xl">
                {t('home.hero.title')}<br />
                <span className="text-cyan-300">{t('home.hero.subtitle')}</span>
              </h1>
              <p className="mb-8 max-w-xl text-base leading-7 text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.3)] sm:text-lg sm:leading-8">
                {t('home.hero.description')}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/free/calc"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-slate-950/25 transition hover:-translate-y-0.5 hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {t('home.hero.tryFree')}
                  <Icon name="arrow" className="h-4 w-4" />
                </Link>
                <Link
                  href="/paid"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/70 bg-slate-950/20 px-6 py-3.5 font-bold text-white backdrop-blur-sm transition hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {t('home.hero.viewCourse')}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Coaching Team */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div>
              <h3 id="coaches" className="mb-8 scroll-mt-24 text-2xl font-bold text-gray-900 md:text-3xl">
                {language === 'en' ? 'Professional Coaches' : '专业教练'}
              </h3>
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <article className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
                  <div className="mb-5 flex items-center gap-5">
                    <img
                      src="/images/why-us/coach-1.jpg"
                      alt={language === 'en' ? 'Rick Van Der Zant coaching at the pool' : 'Rick Van Der Zant 在泳池边指导训练'}
                      className="h-24 w-24 shrink-0 rounded-full border-4 border-blue-50 object-cover shadow-sm sm:h-28 sm:w-28"
                      style={{ objectPosition: '44% 32%' }}
                    />
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 sm:text-2xl">Rick Van Der Zant</h4>
                      <p className="mt-1 text-sm font-medium text-blue-700">
                        {language === 'en' ? 'Former Australian National Team Swimmer' : '前澳大利亚国家队运动员'}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4 inline-flex rounded-full bg-cyan-50 px-3 py-1 text-sm font-semibold text-cyan-800">
                    {language === 'en' ? '45 years coaching' : '45 年执教经验'}
                  </div>
                  <p className="text-sm leading-7 text-gray-600">
                    {language === 'en'
                      ? 'Works with the Queensland Academy of Sport sports science team to develop systematic training frameworks.'
                      : '长期与昆士兰体育学院（QAS）运动科学团队合作，专注构建系统化训练体系。'}
                  </p>
                </article>

                <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                  <div className="mb-5 flex items-center gap-5">
                    <img
                      src="/images/why-us/coach-2.jpg"
                      alt={language === 'en' ? 'Swimming coach at the pool' : '游泳教练在泳池边'}
                      className="h-24 w-24 shrink-0 rounded-full border-4 border-slate-100 object-cover shadow-sm sm:h-28 sm:w-28"
                      style={{ objectPosition: '34% 48%' }}
                    />
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 sm:text-2xl">
                        Mach
                      </h4>
                      <p className="mt-1 text-sm font-medium text-blue-700">
                        {language === 'en' ? 'Assistant Coach to Dirk Lange' : '德克·朗格团队助教'}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4 inline-flex rounded-full bg-cyan-50 px-3 py-1 text-sm font-semibold text-cyan-800">
                    {language === 'en' ? 'International coaching experience' : '国际执教经验'}
                  </div>
                  <p className="text-sm leading-7 text-gray-600">
                    {language === 'en'
                      ? 'Previously assisted Dirk Lange and helped coach international swimmers, including London 2012 Olympic champion Cameron van der Burgh.'
                      : '曾担任德克·朗格的助教，参与国际泳者训练，其中包括伦敦 2012 奥运冠军卡梅伦·范德伯格。'}
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-8">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">
                {language === 'en' ? 'From the swimming community' : '来自泳友的经验'}
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                {language === 'en' ? 'Small cues can change a stroke.' : '一句动作提示，也能带来新的水感。'}
              </h2>
              <p className="mt-4 max-w-xl text-slate-600">
                {language === 'en'
                  ? 'A swimmer shares how slowing down the catch helped them find a steadier high-elbow position.'
                  : '一位业余泳者分享：放慢抱水动作后，自己逐渐找到了更稳定的高肘位置。'}
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                  <Icon name="water" className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-slate-900">{language === 'en' ? 'Swimmer story · Technique note' : '泳友故事 · 技术心得'}</p>
                  <p className="text-sm text-slate-500">{language === 'en' ? 'Shared by an amateur swimmer' : '来自业余泳者的真实经验分享'}</p>
                </div>
              </div>
              <p className="text-lg leading-8 text-slate-700">
                {language === 'en'
                  ? 'A swimmer’s takeaway: slow the catch down, find the high-elbow position first, then build speed through the push.'
                  : '泳友心得：把抱水动作放慢，先找到高肘位置，再在推水阶段发力。'}
              </p>
              <Link href="/free/blog/article-2" className="mt-6 inline-flex items-center gap-2 font-bold text-blue-700 hover:text-blue-900">
                {language === 'en' ? 'Read the swimmer’s story' : '阅读完整泳友分享'}
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <p className="mt-4 text-xs leading-5 text-slate-400">
                {language === 'en'
                  ? 'Community experience, not a review of the paid course.'
                  : '此处为泳友经验分享，并非付费课程评价。'}
              </p>
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
                  <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-white/25 bg-white/10 text-white"><Icon name="book" className="h-8 w-8" /></div>
                  {/* Coming Soon 标签 */}
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-4">
                    <span className="text-lg font-medium">
                      {language === 'en' ? 'Full Videos in Preparation' : '完整视频正在制作中'}
                    </span>
                  </div>
                  <p className="text-cyan-100 text-lg">
                    {language === 'en' ? 'Full course videos are being prepared' : '完整课程视频正在准备中'}
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
                        <Icon name="book" className="h-4 w-4 text-cyan-700" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {language === 'en' ? 'Course Preview' : '课程预览'}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {language === 'en'
                            ? 'Explore the course structure and sample lesson before launch'
                            : '上线前先了解课程结构与预览内容'
                          }
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-blue-50 rounded-lg p-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <Icon name="clock" className="h-4 w-4 text-blue-700" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {language === 'en' ? 'Sales Status' : '课程状态'}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {language === 'en'
                            ? 'The full video course is being prepared. Explore the course structure and sample lesson.'
                            : '完整视频课程正在准备中，可先了解课程结构与预览内容。'
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

                  {/* 课程预览入口 */}
                  <Link
                    href="/paid"
                    className="block w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-center py-4 rounded-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition-colors"
                  >
                    {language === 'en' ? 'Preview the Course' : '预览课程内容'}
                  </Link>
                </div>
              </div>
            </div>

            {/* Course Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700"><Icon name="strength" className="h-6 w-6" /></div>
                <h4 className="font-semibold text-gray-900 mb-2">{t('home.course.highlights.core.title')}</h4>
                <p className="text-sm text-gray-600">{t('home.course.highlights.core.description')}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700"><Icon name="bolt" className="h-6 w-6" /></div>
                <h4 className="font-semibold text-gray-900 mb-2">{t('home.course.highlights.speed.title')}</h4>
                <p className="text-sm text-gray-600">{t('home.course.highlights.speed.description')}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700"><Icon name="target" className="h-6 w-6" /></div>
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

    </div>
  );
}
