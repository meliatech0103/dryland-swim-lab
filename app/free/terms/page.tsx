'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import Link from 'next/link';

export default function TermsPage() {
  const { language } = useLanguage();

  const sections = language === 'en' ? [
    { t: '1. Acceptance of Terms', b: 'By accessing or using the Dryland Swim Lab website (drylandswimlab.com), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.' },
    { t: '2. Services Description', b: 'Dryland Swim Lab provides online dryland training courses, training plan tools, and educational content for amateur swimming enthusiasts. Our services include free training calculators, blog articles, and paid video-based training courses.' },
    { t: '3. Paid Courses & Payment', b: 'Paid courses are processed through our third-party payment provider (Creem.io). Upon successful payment, you will receive an unlock password via email. This password grants you access to the full course video content. Passwords are for personal use only and must not be shared or redistributed. We reserve the right to revoke access if password sharing is detected. All prices are listed in USD.' },
    { t: '4. Refund Policy', b: 'We offer a 30-day refund guarantee. If you are not satisfied with your purchase, contact us at contact@drylandswimlab.com within 30 days of purchase to request a refund. Refunds are processed through Creem.io.' },
    { t: '5. Intellectual Property', b: 'All content on this website, including but not limited to training videos, articles, images, and tools, is the property of Dryland Swim Lab. You may not reproduce, distribute, or create derivative works without our written permission.' },
    { t: '6. User Conduct', b: 'You agree not to: (a) Share your course access password with others; (b) Copy, download, or redistribute course video content; (c) Use automated tools to scrape or harvest data from the website; (d) Attempt to bypass or circumvent any access controls.' },
    { t: '7. Disclaimer of Warranties', b: 'The training content provided is for informational and educational purposes only. We are not liable for any injuries or health issues that may result from following our training programs. Always consult a qualified healthcare professional before beginning any new exercise regimen.' },
    { t: '8. Limitation of Liability', b: 'To the maximum extent permitted by law, Dryland Swim Lab shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services.' },
    { t: '9. Changes to Terms', b: 'We may update these Terms of Service from time to time. Changes will be posted on this page with an updated revision date. Continued use of the website after changes constitutes acceptance of the revised terms.' },
    { t: '10. Contact', b: 'If you have any questions about these Terms, please contact us at contact@drylandswimlab.com.' },
  ] : [
    { t: '1. 条款接受', b: '访问或使用 Dryland Swim Lab 网站（drylandswimlab.com）即表示您同意受本服务条款约束。如果您不同意这些条款，请勿使用我们的服务。' },
    { t: '2. 服务说明', b: 'Dryland Swim Lab 为业余游泳爱好者提供在线陆上训练课程、训练计划工具和教学内容。我们的服务包括免费训练计算器、博客文章和付费视频训练课程。' },
    { t: '3. 付费课程与支付', b: '付费课程通过第三方支付服务商（Creem.io）处理。支付成功后，您将通过邮件收到解锁密码。该密码可解锁完整课程视频内容。密码仅供个人使用，不得分享或再分发。如检测到密码共享，我们保留撤销访问权限的权利。所有价格以美元标示。' },
    { t: '4. 退款政策', b: '我们提供 30 天退款保证。如果您对购买不满意，请在购买后 30 天内联系 contact@drylandswimlab.com 申请退款。退款由 Creem.io 处理。' },
    { t: '5. 知识产权', b: '本网站的所有内容，包括但不限于训练视频、文章、图片和工具，均为 Dryland Swim Lab 的财产。未经我们书面许可，您不得复制、分发或创建衍生作品。' },
    { t: '6. 用户行为', b: '您同意不：(a) 将课程访问密码分享给他人；(b) 复制、下载或再分发课程视频内容；(c) 使用自动工具抓取或采集网站数据；(d) 尝试绕过或规避任何访问控制。' },
    { t: '7. 免责声明', b: '提供的训练内容仅供参考和教育用途。我们对因遵循训练计划而可能导致的任何伤害或健康问题不承担责任。在开始任何新的锻炼计划之前，请务必咨询合格的医疗专业人士。' },
    { t: '8. 责任限制', b: '在法律允许的最大范围内，Dryland Swim Lab 对因您使用服务而产生的任何间接、附带或后果性损害不承担责任。' },
    { t: '9. 条款变更', b: '我们可能会不时更新本服务条款。变更将在此页面上发布，并附有更新的修订日期。在变更后继续使用网站即表示接受修订后的条款。' },
    { t: '10. 联系方式', b: '如果您对本条款有任何疑问，请联系 contact@drylandswimlab.com。' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-8 font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {language === 'en' ? 'Back to Home' : '返回首页'}
        </Link>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
              {language === 'en' ? 'Terms of Service' : '服务条款'}
            </h1>
            <p className="text-gray-400 text-sm mb-8">Last updated: 2026-09-22</p>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              {sections.map((s, i) => (
                <section key={i}>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">{s.t}</h2>
                  <p>{s.b}</p>
                </section>
              ))}
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}