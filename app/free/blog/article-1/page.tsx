'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import Link from 'next/link';

export default function Article1Page() {
  const { language } = useLanguage();

  const renderContent = (content: string) => {
    // 按行分割内容
    const lines = content.split('\n');
    const rendered = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // 处理二级标题 (##)
      if (line.startsWith('## ')) {
        const titleText = line.replace('## ', '').trim();
        rendered.push(
          <h2 key={i} className="text-2xl font-bold mt-8 mb-4 text-gray-900">
            {titleText}
          </h2>
        );
      }
      // 处理三级标题 (###)
      else if (line.startsWith('### ')) {
        const titleText = line.replace('### ', '').trim();
        rendered.push(
          <h3 key={i} className="text-xl font-semibold mt-6 mb-3 text-gray-900">
            {titleText}
          </h3>
        );
      }
      // 处理空行
      else if (line === '') {
        rendered.push(<br key={i} />);
      }
      // 处理普通段落
      else if (line !== '') {
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
    id: '1',
    title: {
      en: 'How Amateurs Can Build an Actionable Training Plan: From Water Feel to Systematic Progression',
      zh: '业余爱好者如何制定可实施的训练计划：从水感突破到系统进阶',
    },
    date: '2026-09-02',
    category: {
      en: 'Training Plans',
      zh: '训练计划',
    },
    content: {
      en: `Many amateur swimmers often find themselves trapped in a frustrating cycle: swimming several times a week yet seeing no improvement, or struggling with inconsistent routines due to a lack of structure. Swimming is a sport that heavily relies on technical precision and neuromuscular coordination. To achieve breakthroughs within limited spare time, blindly grinding out yardage is inefficient. You need an actionable, quantifiable, and land-water integrated training plan.

## I. Define Your Status and Core Goals: Reject "Pseudo-Diligence"
Before drafting a plan, conduct an objective self-diagnosis. Is your bottleneck weak core strength causing lower body sinkage? Or is it incorrect catch-and-pull technique?

Set Periodized Goals: Do not blindly benchmark against professional athletes. Break down major goals (e.g., breaking 30 minutes for a 1500m freestyle) into 4-6 week micro-cycles.

Audit Your Time: Evaluate how many days you can realistically dedicate to training. For working professionals, "2 days of water technique refinement + 2 days of high-efficiency dryland training" is often far more effective than swimming four low-quality days a week.

## II. Integrating Land and Water: Why You Need Dryland Training
Many swimmers overlook out-of-water conditioning. In fact, many water-feel and propulsion issues are resolved much faster on land.

### 1. Building Core and Rotational Chains
Freestyle relies heavily on core-driven body roll. Dryland movements such as resistance band swim simulations and core variations help reinforce neuromuscular pathways.

### 2. Injury Prevention
Common swimmer's shoulder injuries are often caused by muscular imbalances. Proper dryland activation and mobility work protect your joints for the long haul.

## III. A Standard Weekly Template for Amateur Efficiency
Drawing on our team's 2 years of practical experience organizing over 120 team training sessions for enthusiasts, we recommend the following structured weekly model:

Tuesday (Technique & Water Feel): 45-minute pool session. Focus on single-arm drills and side-glide coordination—prioritize quality over speed.

Thursday (Dryland Specific): 45-minute land session. Focus on core stability, shoulder/back resistance training, and hip mobility.

Weekend (Endurance & Simulation): 60-90 minute integrated session. Blend the technical elements practiced during the week into aerobic endurance swimming and pace testing.

## IV. Continuous Review and Fine-Tuning
A training plan is never set in stone. After each session, record your subjective feelings (e.g., stroke efficiency, breathing ease) or objective metrics. By dynamically adjusting based on physical feedback, your plan will truly become an accelerator for breaking through your plateaus.`,
      zh: `许多业余游泳爱好者在训练时常陷入这样的困境：每周游好几次，成绩却卡在瓶颈期纹丝不动；或者因为缺乏系统规划，常常"三天打鱼，两天晒网"。游泳是一项极度依赖技术细节与神经肌肉协调的运动。要在有限的业余时间里实现突破，盲目"死磕"水上距离并不科学，你需要一份可执行、可量化、陆水结合的系统训练计划。

## 一、 明确现状与核心目标：拒绝"伪勤奋"
在制定计划前，首先要进行客观的自我诊断。你的短板究竟是核心力量不足导致下肢沉水？还是高肘划水技术不规范？

设定阶段性目标：不要盲目对标专业运动员。将大目标（如：自由泳 1500 米进阶 30 分钟）拆解为 4-6 周的小周期目标。

时间资产盘点：评估自己每周能腾出几天进行训练。对于上班族而言，"2天水上精细化技术课 + 2天高效陆地专项训练"往往比一周游四天但质量低下有效得多。

## 二、 陆水结合：为什么你需要"陆上专项体能训练（Dryland）"？
很多泳者忽视了岸上的修炼。事实上，许多水感和发力问题，在陆地上解决往往事半功倍。

### 1. 核心与旋转链条的建立
自由泳不仅靠手臂，更依赖核心驱动的身体滚转。通过弹力带模拟划水、平板支撑变式等旱地动作，可以在陆地上强固神经肌肉记忆。

### 2. 规避伤病风险
游泳中最常见的肩袖损伤，多因肩部肌肉力量失衡引起。科学的旱地拉伸与肩背激活，能有效保驾护航。

## 三、 一份标准的业余高效周计划模板
结合我们的多年训练实践，推荐以下结构清晰的周计划模型：

周二（技术+水感）：45分钟游泳训练。重点进行单臂划水、侧滑行分解练习，不追求速度，追求动作质量。

周四（旱地专项）：45分钟陆上体能训练。聚焦核心稳定性、肩背抗阻训练及髋关节灵活性。

周六或周日（长距离耐力/实战）：60-90分钟综合训练。将前面掌握的技术融入有氧耐力游中，并进行节奏测试。

## 四、 持续复盘与微调
训练计划不是一成不变的。每次训练后，记录下自己的主观感受（如：划水是否省力、呼吸是否顺畅）或客观数据。只有不断根据身体反馈动态调整，这份计划才能真正成为你突破瓶颈的加速器。`
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
