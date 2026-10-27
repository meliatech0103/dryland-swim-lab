'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import Link from 'next/link';

const article = {
  en: {
    title: 'Why Do You Tire So Quickly When You Swim Faster? Check These Three Freestyle Basics First',
    category: 'Technique',
    intro: 'Many recreational swimmers know the pattern: an easy pace feels manageable, but swimming faster quickly becomes tiring. The harder you try, the more your technique can fall apart.\n\nAdding more distance is not always the answer. Body position, breathing, and stroke rhythm can all affect how much effort swimming takes. You do not need to fix everything at once. Start by noticing one thing during your next session.',
    sections: [
      {
        title: '1. If your legs sink, do not immediately kick harder',
        paragraphs: [
          'Leg position can be affected by body alignment, breathing, and individual buoyancy. Kicking harder may tire you out without addressing the position that is making swimming feel difficult.',
          'Try keeping your head relaxed and your gaze naturally toward the pool floor ahead. Let your chest extend gently into the water while keeping your trunk steady. Avoid becoming stiff or deliberately forcing your head down. Notice whether this position feels more balanced and whether you feel less like you are dragging your legs behind you.',
          'Every swimmer settles differently in the water, so the adjustment that helps will vary from person to person.',
        ],
      },
      {
        title: '2. Notice whether your head lifts when you breathe',
        paragraphs: [
          'If you lift your head to breathe, your balance may change and your legs may drop. Pay attention to whether you are exhaling steadily underwater. Then try letting your body rotate gently with the breath instead of turning only your head to find air.',
          'You do not need to force bilateral breathing to make progress, or rotate farther than feels comfortable. Start with a relaxed, repeatable breathing rhythm. If breathing makes you tense or your stroke breaks down, slow down, shorten the distance, and ask a coach to observe you if possible.',
        ],
      },
      {
        title: '3. Check for a noticeable pause between strokes',
        paragraphs: [
          'Reaching forward and gliding are not automatically problems. The thing to notice is whether your body also loses momentum when your hand pauses in front. If each stroke feels like “push, stop, push, stop,” increasing your speed can feel especially hard.',
          'Swim at an easy pace and notice how one arm connects to the next. Do not force a faster stroke rate, and do not rush just to keep your hands moving. Aim for a smooth, repeatable rhythm with steady breathing.',
        ],
      },
    ],
    practiceTitle: 'Try this in your next session',
    practiceIntro: 'Choose the one issue that stands out most. Do not try to change your head position, kick, and stroke all at once. Practice over short distances at an easy pace, and note after each set:',
    practicePoints: [
      'Did breathing feel more relaxed?',
      'Did your body feel more balanced?',
      'At the same pace, did the stroke feel easier?',
    ],
    closing: 'Change one cue at a time so you can tell whether it helps. Stop if you feel pain, dizziness, or unusual shortness of breath. If the issue continues, ask a coach to watch your stroke.',
    ctaTitle: 'Want to fit practice into your week?',
    ctaText: 'Use our free freestyle training planner to build a weekly plan around your available training days and goal.',
    ctaButton: 'Build My Free Plan',
    sourcesTitle: 'Further reading',
    sources: [
      { label: 'Freestyle Body Position and Rotation · U.S. Masters Swimming', href: 'https://www.usms.org/fitness-and-training/guides/freestyle/body-position' },
      { label: 'Freestyle Breathing · U.S. Masters Swimming', href: 'https://www.usms.org/fitness-and-training/guides/freestyle/breathing' },
    ],
    back: 'Back to Articles',
  },
  zh: {
    title: '为什么自由泳一提速就累？先检查这 3 个技术环节',
    category: '技术训练',
    intro: '很多业余泳者都有过这种感觉：慢慢游还能坚持，一提速就很快累；越想用力，动作越容易散。\n\n这时，继续加大游量未必能解决问题。身体姿态、换气和划水节奏都可能影响你游起来是否省力。你不需要一次改完所有动作，可以先在下次训练里逐项观察。',
    sections: [
      {
        title: '1. 腿下沉时，先别急着加大打腿',
        paragraphs: [
          '腿的位置受身体姿态、呼吸和个人浮力特点等多种因素影响。单纯更用力地打腿，可能让你更快疲劳，却没有解决身体位置的问题。',
          '试着让头部保持放松，视线自然朝池底前方；感受胸口轻轻向水里延伸，同时让躯干保持稳定。动作不必僵硬，也不需要刻意把头压进水里。重点是观察：这个姿势是否让身体更平衡，游起来是否少了一些“拖着腿走”的感觉。',
          '每个人在水里的自然姿态都不同，适合自己的调整也会不同。',
        ],
      },
      {
        title: '2. 换气时，留意头部有没有带着身体抬起来',
        paragraphs: [
          '如果每次换气都抬头，身体可能跟着失去平衡，腿也更容易下沉。可以先留意水下呼气是否连续，再尝试让身体随换气轻轻转动，而不是只扭头去找空气。',
          '不需要为了“标准”强迫自己双侧换气，也不必刻意转到很大的角度。先找到自然、稳定、不憋气的节奏。如果换气让你紧张或动作明显变形，可以放慢速度，缩短距离，必要时请教练在现场观察。',
        ],
      },
      {
        title: '3. 划水之间，是否有明显的停顿',
        paragraphs: [
          '前伸和滑行本身并不是问题；需要留意的是，手臂停在前方时，身体是否也跟着失去前进的节奏。若每次划水都像“用力一下、停一下”，一提速就可能觉得特别吃力。',
          '先用轻松速度游，感受两侧手臂如何自然衔接。别急着强行加快划频，也别为了追求“不断手”而慌忙划水。目标是动作连贯、呼吸稳定，能持续重复。',
        ],
      },
    ],
    practiceTitle: '下次训练可以这样试',
    practiceIntro: '选一个最明显的问题作为本次重点，不要同时改头部、打腿和划水。可以用短距离、轻松速度做几组练习；每组之后简单记录：',
    practicePoints: [
      '这次换气有没有更从容？',
      '身体有没有更平衡？',
      '同样的速度下，动作是否更轻松？',
    ],
    closing: '一次只改一个提示，才能更容易感受到它有没有帮助。若出现疼痛、头晕或异常气促，请停止训练；如果问题持续存在，最好请教练观察你的实际动作。',
    ctaTitle: '想把练习安排进每周训练？',
    ctaText: '试试我们的免费自由泳训练计划工具，按每周可训练的天数和训练目标生成一份计划。',
    ctaButton: '生成我的免费计划',
    sourcesTitle: '延伸阅读',
    sources: [
      { label: '自由泳身体姿态与转体 · U.S. Masters Swimming', href: 'https://www.usms.org/fitness-and-training/guides/freestyle/body-position' },
      { label: '自由泳呼吸 · U.S. Masters Swimming', href: 'https://www.usms.org/fitness-and-training/guides/freestyle/breathing' },
    ],
    back: '返回文章列表',
  },
};

export default function Article3Page() {
  const { language } = useLanguage();
  const content = article[language];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Link href="/free/blog" className="inline-flex items-center gap-2 text-cyan-700 hover:text-cyan-800 mb-8 font-medium">
          <span aria-hidden="true">←</span>
          {content.back}
        </Link>

        <article className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 sm:p-8 md:p-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-cyan-50 text-cyan-800 px-3 py-1 rounded-full text-sm font-medium">{content.category}</span>
              <time dateTime="2026-10-27" className="text-gray-400 text-sm">2026-10-27</time>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 leading-tight">{content.title}</h1>

            <div className="text-gray-700 leading-relaxed mb-8 space-y-4">
              {content.intro.split('\n\n').map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>

            <div className="space-y-8">
              {content.sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">{section.title}</h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </section>
              ))}
            </div>

            <section className="mt-10 rounded-2xl bg-slate-50 border border-slate-100 p-5 sm:p-7">
              <h2 className="text-2xl font-bold mb-3 text-gray-900">{content.practiceTitle}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">{content.practiceIntro}</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
                {content.practicePoints.map((point) => <li key={point}>{point}</li>)}
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">{content.closing}</p>
            </section>

            <section className="mt-8 border-t border-slate-100 pt-6">
              <h2 className="text-lg font-bold mb-3 text-gray-900">{content.sourcesTitle}</h2>
              <ul className="space-y-2 text-sm">
                {content.sources.map((source) => (
                  <li key={source.href}>
                    <a href={source.href} target="_blank" rel="noreferrer" className="text-cyan-700 hover:text-cyan-900 underline underline-offset-2">
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </article>

        <div className="mt-8 bg-gradient-to-r from-cyan-700 to-blue-600 rounded-2xl p-7 sm:p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">{content.ctaTitle}</h2>
          <p className="mb-6 text-cyan-50 leading-relaxed">{content.ctaText}</p>
          <Link href="/free/calc" className="bg-white text-blue-700 px-7 py-3 rounded-xl font-semibold hover:bg-cyan-50 transition-colors inline-block">
            {content.ctaButton}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
