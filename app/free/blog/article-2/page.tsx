'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import Link from 'next/link';

export default function Article2Page() {
  const { language } = useLanguage();

  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const rendered = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.startsWith('## ')) {
        const titleText = line.replace('## ', '').trim();
        rendered.push(
          <h2 key={i} className="text-2xl font-bold mt-10 mb-4 text-gray-900">
            {titleText}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        const titleText = line.replace('### ', '').trim();
        rendered.push(
          <h3 key={i} className="text-xl font-semibold mt-6 mb-3 text-gray-900">
            {titleText}
          </h3>
        );
      } else if (line === '') {
        rendered.push(<div key={i} className="h-2" />);
      } else if (line !== '') {
        rendered.push(
          <p key={i} className="text-gray-700 leading-relaxed mb-4">
            {line}
          </p>
        );
      }
    }

    return rendered;
  };

  const articleData = {
    id: '2',
    title: {
      en: 'My Freestyle "Aha" Moments: Body Position, High Elbow Catch & Breathing Rotation',
      zh: '我的自由泳开悟时刻：身体姿态、高肘抱水与换气转体',
    },
    date: '2026-09-21',
    category: {
      en: 'Technique',
      zh: '技术心得',
    },
    content: {
      en: `Sharing from the perspective of an ordinary amateur swimmer — my freestyle "aha" moments. Special thanks to all the fellow swimmers who've given me those eye-opening, plain-language tips along the way. I'm still working hard on my own technique 💪 Sharing these with you for discussion!

## 1. Body Position — Imagine a Fully Drawn Bow 🏹
The guiding principle: from your fingertips, through your core, to your toes — stretch your body into a single arrow. Not stiffly rigid, but imagine placing yourself on a fully drawn bow, achieving the longest possible body deformation. So with every reach forward before entry, strive to reach the farthest point possible, engaging your entire body to send yourself forward.

Key insight: The longer and more streamlined your body, the less drag you create. Every centimeter of reach counts.

Training method: Practice pull buoy drills to maintain stable body position while focusing on maximum reach with each stroke.

## 2. High Elbow Catch — Think "Lucky Cat" 🐱 with Elbow Pointing to the Sky
There are countless high elbow catch tutorial videos out there — every coach teaches it! I used to practice the motion while walking down the street, but once I got in the water, I still couldn't do it properly, especially on my weak-side arm.

Then a fellow swimmer gave me a tip that changed everything: slow down and consciously feel your elbow tip always pointing toward the sky throughout the catch phase. Deliberately lift your elbow upward on every single stroke. One day, my right hand suddenly "got it" — I could feel the unmistakable propulsive force that a proper catch generates!

### The Key: Timing Your Effort
The high elbow catch path is actually quite long. If you power through the entire motion, you'll exhaust yourself quickly and your technique will break down as fatigue sets in.

Here's the strategy: Slow down the catch phase. From the entry point (ahead of your head) to your chest, don't rush — focus on establishing the high elbow position. Then, during the push phase (from chest to thigh), explode with power. Keep your palm facing backward to generate significant propulsion. Finish the push close to the outside of your thigh.

Training method: Pull buoy drills, 4 strokes per breath / or use a swimmer's snorkel.

## 3. Breathing & Rotation — Think "Side-Lying" and "Flirting" 🙋🏻‍♀️
During the breath, the motion feels a bit like resting your ear on one arm in a side-lying position... but you're not actually lying on your side! The slight rotation for breathing is driven by actively engaging your hips — specifically the bony protrusion where your upper and lower body connect.

A skilled swimmer pointed out that the feeling of active hip rotation is exactly the same motion as... flirting! This aha moment was surprisingly simple: imagine how you'd sway your body if you were standing and trying to be flirtatious — that's exactly how you should actively rotate your body when breathing.

Training method: Kickboard single-side breathing drills, focusing on initiating the rotation from the hip, not the shoulder or head.

## Summary
These three insights — the drawn-bow body line, the sky-pointing elbow, and the hip-driven rotation — are simple in concept but require patient, deliberate practice to internalize. The key is slowing down, feeling each movement, and waiting for those aha moments to arrive. They will come.`,
      zh: `从普通业余爱好者角度分享我的自由泳开悟时刻。特别感谢各路泳友，经常在练习中收到一些醍醐灌顶的"大白话"教学，自己也还在努力练习中 💪 分享给大家一起讨论！

## 1. 身体姿态 — 请想象满弓的箭 🏹
指导思想：从指尖、腰腹到脚尖，尽你所能地绷成一支箭。不是僵硬的绷紧，是想象把自己上满弓，达到身体最长的形变。所以每一次的入水前伸，都要努力够到最远处，调动全身往前送。

核心认知：身体越长越流线型，阻力越小。每一厘米的前伸都有意义。

训练方法：多练夹板划手，可以保持身体姿态的稳定，专注每次划手的最大前伸。

## 2. 高肘抱水 — 招财猫肘尖指天 🐱
高肘抱水教学视频数不胜数，教练都会教！我也经常在路上走着走着开始空气练高肘抱水，但下了水还是做不好，尤其是弱侧手。

后来被一位泳友指点，让我慢慢找到抱水过程中始终肘尖朝着天的感觉，把动作放慢、每一次划手都有意地把肘尖举起来对着天。突然有一天右手开悟，感受到了抱水带来的明显的推进感！

### 关键：发力的时机
高肘抱水的路径还是挺长的，如果全程都在发力，会游得非常累，高肘动作也会随着力竭很快就变形。

正确策略：把动作放慢。在抱水（从头前方到胸前）这段距离不求快，把高肘这个动作做出来；然后在推水（从胸到大腿）这段距离爆发用力，掌心保持向后，获得显著的推进力，推水的结束动作贴近大腿外侧。

训练方法：夹板划手，4划一换气 / 戴呼吸管也可以。

## 3. 换气转体 — 请想象侧卧和撒娇 🙋🏻‍♀️
换气的时候动作有点像把耳朵贴在一侧胳膊上侧卧……但不是真的侧卧啊！换气的微微侧身是通过髋部（上半身和下半身连接的那个骨头突出来的部位）主动发力实现的。

感谢高手提点：主动转髋的感觉就是撒娇的发力动作！这个开悟真的很简单，想象站立姿态你要撒娇的话会怎么扭动身体，就在换气的时候怎么主动转动身体。

训练方法：浮板单边换气，专注从髋部发起转动，而非肩膀或头部。

## 小结
这三个开悟时刻 — 满弓的身体线、指天的肘尖、髋驱动的转体 — 概念简单，但需要耐心、刻意地练习才能内化。关键是放慢速度，感受每一个动作，等待开悟时刻的到来。它一定会来的。`,
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href="/free/blog"
          className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-8 font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {language === 'en' ? 'Back to Articles' : '返回文章列表'}
        </Link>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-cyan-100 text-cyan-600 px-3 py-1 rounded-full text-sm font-medium">
                {articleData.category[language]}
              </span>
              <span className="text-gray-400 text-sm">{articleData.date}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              {articleData.title[language]}
            </h1>

            <div className="prose prose-lg max-w-none text-gray-700">
              {renderContent(articleData.content[language])}
            </div>
          </div>
        </article>

        <div className="mt-12 bg-gradient-to-r from-cyan-600 to-blue-500 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">
            {language === 'en' ? 'Ready to Level Up Your Swimming?' : '准备好提升你的游泳水平了吗？'}
          </h2>
          <p className="mb-6 text-cyan-100">
            {language === 'en'
              ? 'Get professional training plans and 1v1 coaching to accelerate your progress.'
              : '获取专业训练计划和1v1指导，加速你的进步。'}
          </p>
          <Link
            href="/paid"
            className="bg-white text-cyan-600 px-8 py-4 rounded-lg font-semibold hover:bg-cyan-50 transition-colors inline-block"
          >
            {language === 'en' ? 'Explore Courses' : '探索课程'}
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}