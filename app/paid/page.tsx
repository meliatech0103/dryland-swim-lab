'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import { lessons } from '@/lib/lessons';
import Link from 'next/link';
import Icon from '@/components/Icon';

export default function PaidPage() {
  const { language } = useLanguage();
  const lesson = lessons[0];
  const hasCreemLink = lesson.creemLink && lesson.creemLink !== '#';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 课程主卡片 */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* 左侧：课程视觉区 */}
            <div className="relative flex min-h-[320px] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-800 p-8 text-white sm:p-10">
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/10" />
              <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full border border-white/10" />
              <div className="relative mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-cyan-100 shadow-lg backdrop-blur">
                <Icon name="water" className="h-9 w-9" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">
                {lesson.title[language]}
              </h2>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-5 py-2 mb-4">
                <span className="font-medium">
                  {lesson.sessions} {language === 'en' ? 'Sessions' : '节课程'} × {lesson.sessionsDuration} min
                </span>
              </div>
              <p className="text-cyan-100 text-center text-sm max-w-xs">
                {language === 'en'
                  ? 'Scientific dryland training to transform your freestyle'
                  : '科学陆上训练，让你的自由泳蜕变'}
              </p>
            </div>

            {/* 右侧：课程信息 */}
            <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {lesson.title[language]}
              </h1>
              <p className="text-gray-600 mb-6">
                {lesson.description[language]}
              </p>

              {/* 课程亮点 */}
              <ul className="space-y-3 mb-8">
                {lesson.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-700">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-cyan-700"><Icon name="check" className="h-3.5 w-3.5" /></span>
                    <span>{feature[language]}</span>
                  </li>
                ))}
              </ul>

              {/* 价格 + 操作区 */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-black text-gray-900">${lesson.price}</span>
                  <span className="text-gray-500">USD</span>
                  <span className="text-gray-400 text-sm ml-2">
                    {language === 'en'
                      ? `${lesson.totalDuration} min total`
                      : `总计${lesson.totalDuration}分钟`}
                  </span>
                </div>

                {hasCreemLink ? (
                  /* Creem 链接已配置：显示购页按钮 */
                  <>
                    <a
                      href={lesson.creemLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-lg rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
                    >
                      {language === 'en' ? 'Buy Now — $9.9' : '立即购买 — $9.9'}
                    </a>
                    <a
                      href={`/paid/lesson/${lesson.id}`}
                      className="block w-full text-center py-2 mt-3 text-cyan-600 text-sm font-medium hover:text-cyan-700 transition-colors"
                    >
                      {language === 'en'
                        ? 'Already purchased? Enter password →'
                        : '已购买？输入密码解锁 →'}
                    </a>
                  </>
                ) : (
                  /* Creem 链接未配置：显示即将上线 */
                  <>
                    <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl p-4 text-white text-center mb-4">
                      <div className="text-lg font-bold mb-1">
                        {language === 'en' ? 'Course in Preparation' : '课程正在制作中'}
                      </div>
                      <p className="text-cyan-100 text-sm">
                        {language === 'en'
                          ? 'Sales are not open yet. Preview the course while we prepare the full video program.'
                          : '课程尚未开放购买。您可以先预览课程，我们正在准备完整视频内容。'}
                      </p>
                    </div>

                    <a
                      href={`/paid/lesson/${lesson.id}`}
                      className="block w-full text-center py-2 text-cyan-600 text-sm font-medium hover:text-cyan-700 transition-colors"
                    >
                      {language === 'en'
                        ? 'Already purchased? Enter password →'
                        : '已购买？输入密码解锁 →'}
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <section className="mb-12 grid gap-5 md:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-cyan-700">
              {language === 'en' ? 'Who it is for' : '适合人群'}
            </p>
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-slate-950">
              {language === 'en' ? 'For swimmers building strength out of the water' : '适合希望在水外补足力量训练的泳者'}
            </h2>
            <p className="leading-7 text-slate-600">
              {language === 'en'
                ? 'Designed for adult and amateur freestyle swimmers who want a clear, coach-guided routine for upper-body strength, trunk control, and lower-body power.'
                : '面向成年及业余自由泳爱好者，围绕上肢力量、躯干控制和下肢发力，提供清晰、可跟练的训练安排。'}
            </p>
          </article>
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-cyan-700">
              {language === 'en' ? 'Equipment' : '器材准备'}
            </p>
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-slate-950">
              {language === 'en' ? 'Set up a safe training space' : '准备安全、稳固的训练空间'}
            </h2>
            <p className="leading-7 text-slate-600">
              {language === 'en'
                ? 'A yoga mat, dumbbells, and resistance band are used across sessions. Depending on the exercise, you may also use a pull-up bar or low bar, barbell, medicine ball, sturdy chair, or low step box. Check every anchor and clear the surrounding area before you begin.'
                : '课程会用到瑜伽垫、哑铃和弹力带；不同动作还可能用到引体向上杆或低杠、杠铃、药球、稳固座椅或低跳箱。训练前请检查器材固定情况，并清理周边空间。'}
            </p>
          </article>
        </section>

        <section className="mb-12 rounded-3xl bg-slate-950 p-6 text-white sm:p-9">
          <div className="mb-7 max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
              {language === 'en' ? 'Course outline' : '课程内容'}
            </p>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {language === 'en' ? 'Three focused 15-minute sessions' : '3 节训练，每节约 15 分钟'}
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              language === 'en'
                ? ['01', 'Push, pull & trunk stability', 'Build controlled upper-body strength and stable shoulder mechanics.']
                : ['01', '上肢推拉与躯干稳定', '练习可控的上肢力量和肩部稳定。'],
              language === 'en'
                ? ['02', 'Upper-body power & core control', 'Practice stronger pushing actions while keeping the trunk steady.']
                : ['02', '上肢推力与核心控制', '在保持躯干稳定的同时练习推力与快速发力。'],
              language === 'en'
                ? ['03', 'Leg strength & coordination', 'Train lower-body strength, landing control, and whole-body coordination.']
                : ['03', '下肢力量与全身协调', '练习腿部力量、落地控制和全身协调。'],
            ].map(([number, title, description]) => (
              <article key={number} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                <span className="mb-4 inline-flex text-sm font-bold tracking-[0.16em] text-cyan-300">{number}</span>
                <h3 className="mb-2 text-lg font-bold">{title}</h3>
                <p className="text-sm leading-6 text-slate-300">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-12 grid gap-6 rounded-3xl border border-cyan-100 bg-cyan-50/70 p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-800">
              {language === 'en' ? 'Swimmer perspectives' : '泳友经验分享'}
            </p>
            <h2 className="mb-2 text-xl font-bold text-slate-950">
              {language === 'en' ? 'Learn from real community stories' : '从真实泳友经验中获得启发'}
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-slate-600">
              {language === 'en'
                ? 'We do not yet have verified reviews from paid-course participants. These technique notes come from an amateur swimmer’s published story and are not course testimonials.'
                : '目前还没有可核实的付费课程学员评价。这里先分享一位业余泳者公开发表的技术心得，它不是课程评价。'}
            </p>
          </div>
          <Link href="/free/blog/article-2" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-cyan-200 bg-white px-4 py-3 font-semibold text-cyan-900 transition hover:bg-cyan-100">
            {language === 'en' ? 'Read the story' : '阅读泳友分享'}
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </section>

        {/* 课程详情入口 */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-12 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            {language === 'en' ? 'Preview the Course' : '预览课程内容'}
          </h3>
          <p className="text-gray-600 mb-6">
            {language === 'en'
              ? 'Watch the free preview and explore the course structure. If you already have a password, you can unlock the full content.'
              : '观看免费预览，了解课程结构。如果您已有密码，可以解锁完整内容。'}
          </p>
          <Link
            href={`/paid/lesson/${lesson.id}`}
            className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all shadow-md"
          >
            {language === 'en' ? 'View Course Details' : '查看课程详情'} →
          </Link>
        </div>

        {/* 支付方式说明 - 仅在 Creem 链接配置后显示 */}
        {hasCreemLink && (
          <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
              {language === 'en' ? 'Secure Payment Options' : '安全支付方式'}
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-gray-700">
                <Icon name="card" className="h-5 w-5 text-slate-500" />
                <span className="text-sm">{language === 'en' ? 'Credit / debit card' : '信用卡 / 借记卡'}</span>
              </div>
              {['Apple Pay', 'Google Pay', language === 'en' ? 'WeChat Pay' : '微信支付', language === 'en' ? 'Alipay' : '支付宝'].map((method) => (
                <div key={method} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-gray-700">{method}</div>
              ))}
            </div>
            <p className="text-gray-400 text-xs text-center mt-4">
              {language === 'en'
                ? 'Powered by Creem.io — Secure checkout, instant delivery, 30-day refund guarantee'
                : '由 Creem.io 提供支付服务 — 安全结算，即时交付，30天退款保证'}
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
