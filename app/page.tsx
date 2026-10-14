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
  '/images/hero/hero-1.jpg',
  '/images/hero/hero-2.jpg',
  '/images/hero/hero-3.jpg',
  '/images/hero/hero-4.jpg',
];

export default function Home() {
  const { t, language } = useLanguage();
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <StructuredData />
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative isolate flex min-h-[620px] items-center overflow-hidden py-16 sm:py-20">
          {/* 背景图片轮播 */}
          <div className="absolute inset-0 h-full z-0">
            <ImageCarousel images={heroImages} interval={6000} />
          </div>
          <div className="absolute inset-0 z-[1] bg-gradient-to-r from-slate-950/80 via-blue-950/55 to-slate-900/10" />
          <div className="absolute inset-0 z-[1] bg-gradient-to-t from-slate-950/35 via-transparent to-slate-950/10" />

          {/* Hero 内容 */}
          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl rounded-[2rem] border border-white/40 bg-white/90 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-md sm:p-10 lg:p-12">
              <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-800">
                <span className="h-2 w-2 rounded-full bg-cyan-500" />
                {language === 'en' ? 'Coach-led · Swim-specific · Built for amateurs' : '教练设计 · 自由泳专项 · 面向业余泳者'}
              </p>
              <h1 className="mb-5 max-w-2xl text-4xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                {t('home.hero.title')}<br />
                <span className="text-blue-700">{t('home.hero.subtitle')}</span>
              </h1>
              <p className="mb-8 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                {t('home.hero.description')}
              </p>
              <div className="mb-8 flex flex-wrap gap-2.5 text-sm font-semibold text-slate-700">
                {[language === 'en' ? '3 guided sessions' : '3 节视频课程', language === 'en' ? '15 minutes each' : '每节 15 分钟', language === 'en' ? 'Strength + body control' : '力量与身体控制'].map((item) => (
                  <span key={item} className="rounded-full border border-slate-200 bg-white px-3.5 py-2">{item}</span>
                ))}
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/free/calc"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3.5 font-bold text-white shadow-lg shadow-blue-900/20 transition hover:-translate-y-0.5 hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                >
                  {t('home.hero.tryFree')}
                  <Icon name="arrow" className="h-4 w-4" />
                </Link>
                <Link
                  href="/paid"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-bold text-slate-800 transition hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                >
                  {t('home.hero.viewCourse')}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
              {language === 'en' ? 'Why Choose Us' : '为什么选择我们'}
            </h2>

            {/* Core Value Proposition */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
              <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl p-8 text-white shadow-xl">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-cyan-100"><Icon name="water" className="h-8 w-8" /></div>
                <div className="text-xl md:text-2xl font-medium mb-1">
                  {language === 'en' ? 'Scientific Training System' : '科学训练体系'}
                </div>
                <p className="text-cyan-100 text-sm md:text-base">
                  {language === 'en'
                    ? 'Methodology built on sports physiology and biomechanics, integrating dryland and water training'
                    : '基于运动生理学和生物力学的训练方法，融合陆上与水上训练'}
                </p>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-white shadow-xl">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-cyan-200"><Icon name="globe" className="h-8 w-8" /></div>
                <div className="text-xl md:text-2xl font-medium mb-1">
                  {language === 'en' ? 'International Coaching Team' : '国际化教练团队'}
                </div>
                <p className="text-gray-300 text-sm md:text-base">
                  {language === 'en'
                    ? 'Led by former Australian national team swimmers and world-renowned coach teams'
                    : '由前澳大利亚国家队运动员和国际知名教练团队领衔'}
                </p>
              </div>
            </div>

            {/* Three Core Themes */}
            <div className="space-y-16">

              {/* Professional Training */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="order-2 lg:order-1">
                  <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                    {language === 'en' ? 'Professional Training' : '专业训练'}
                  </h3>
                  <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                    {language === 'en'
                      ? 'Scientific training methodology based on sports physiology and biomechanics. Our training system integrates dryland and water training to maximize your performance.'
                      : '基于运动生理学和生物力学的科学训练方法。我们的训练体系融合陆上与水上训练，最大化提升你的表现。'}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <div className="mb-2 text-blue-600"><Icon name="strength" className="h-6 w-6" /></div>
                      <div className="text-sm text-gray-600">
                        {language === 'en' ? 'Dryland + Water Integration' : '陆水结合训练'}
                      </div>
                    </div>
                    <div className="bg-cyan-50 rounded-xl p-4">
                      <div className="mb-2 text-cyan-600"><Icon name="target" className="h-6 w-6" /></div>
                      <div className="text-sm text-gray-600">
                        {language === 'en' ? 'Personalized Progression' : '个性化进阶'}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
                  <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                    <img
                      src="/images/why-us/training-1.jpg"
                      alt="Professional Training 1"
                      className="w-full h-48 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                    <img
                      src="/images/why-us/training-2.jpg"
                      alt="Professional Training 2"
                      className="w-full h-48 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </div>

              {/* Professional Coaches */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                    <img
                      src="/images/why-us/coach-1.jpg"
                      alt="Professional Coach 1"
                      className="w-full h-48 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                    <img
                      src="/images/why-us/coach-2.jpg"
                      alt="Professional Coach 2"
                      className="w-full h-48 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 id="coaches" className="scroll-mt-24 text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                    {language === 'en' ? 'Professional Coaches' : '专业教练'}
                  </h3>

                  {/* Coach 1: Rick Van Der Zant */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        RV
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-1">
                          Rick Van Der Zant
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs font-medium">
                            {language === 'en' ? 'International Coach' : '国际教练'}
                          </span>
                          <span className="bg-cyan-600 text-white px-2 py-0.5 rounded text-xs font-medium">
                            45 {language === 'en' ? 'Years Exp' : '年经验'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {language === 'en'
                        ? 'Internationally renowned swimming coach Rick Van Der Zant, former Australian national team swimmer with 45 years of coaching experience. Long-term collaborator with the Queensland Academy of Sport (QAS) sports science team, dedicated to building scientific and systematic training frameworks.'
                        : '国际知名游泳教练 Rick Van Der Zant，前澳大利亚国家队运动员，拥有 45 年执教经验。长期与澳大利亚昆士兰体育学院（QAS）运动科学团队合作，专注构建科学、系统化训练体系。'}
                    </p>
                  </div>

                  {/* Coach 2: Mach */}
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-gray-700 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        MC
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-1">
                          {language === 'en' ? 'Coach Mach' : '马赫教练'}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-gray-700 text-white px-2 py-0.5 rounded text-xs font-medium">
                            {language === 'en' ? 'Elite Coach' : '精英教练'}
                          </span>
                          <span className="bg-blue-700 text-white px-2 py-0.5 rounded text-xs font-medium">
                            {language === 'en' ? 'Expert Trainer' : '专业教练'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {language === 'en'
                        ? 'Coach Mach, core team member and senior assistant coach to world-renowned swimming coach Dirk Schrauwen. Bringing extensive international high-level training and tactical guidance experience, specializing in bridging world-class training philosophies with localized instruction.'
                        : '马赫教练，国际泳坛著名教练德克（Dirk Schrauwen）核心教练团队成员、资深助理教练。拥有丰富的国际化高水平训练与赛训指导经验，擅长将世界级顶尖训练理念与本土化教学相结合。'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Training Base */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="order-2 lg:order-1">
                  <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                    {language === 'en' ? 'Training Base' : '训练基地'}
                  </h3>
                  <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                    {language === 'en'
                      ? 'Located at Longchuan Bay, Thousand Island Lake, Zhejiang Provincial Triathlon Federation Training Base. Professional training environment with complete facilities.'
                      : '位于浙江省千岛湖龙川湾，浙江省铁人三项训练基地。专业训练环境，设施完善。'}
                  </p>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-cyan-600"><Icon name="pool" className="h-8 w-8" /></div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-2">
                          {language === 'en' ? 'Training Environment' : '训练环境'}
                        </div>
                        <p className="text-gray-600 text-sm">
                          {language === 'en'
                            ? 'Professional swimming pool, dryland training area, recovery facilities'
                            : '专业泳池、陆上训练区、恢复设施'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
                  <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                    <img
                      src="/images/why-us/base-1.jpg"
                      alt="Training Base"
                      className="w-full h-48 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                    <img
                      src="/images/why-us/base-2.jpg"
                      alt="Training Base 2"
                      className="w-full h-48 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
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
