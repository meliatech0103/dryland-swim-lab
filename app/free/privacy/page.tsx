'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import Link from 'next/link';

export default function PrivacyPage() {
  const { language } = useLanguage();

  const sections = language === 'en' ? [
    { t: '1. Information We Collect', b: 'We collect the following information: (a) Email address — when you sign up for launch notifications or purchase a course; (b) Course unlock status — stored locally in your browser (localStorage) to remember which courses you have unlocked; (c) Usage data — we use Google Analytics to understand how visitors interact with our website, including page views, referral sources, and device information. This data is aggregated and anonymous.' },
    { t: '2. How We Use Your Information', b: 'We use your email address to: (a) Send you course unlock passwords after purchase (via our payment provider Creem.io); (b) Notify you about course launches if you signed up for early access; (c) Respond to your inquiries. We do not sell, rent, or share your personal information with third parties for marketing purposes.' },
    { t: '3. Payment Information', b: 'All payment processing is handled by Creem.io. We do not collect, store, or have access to your credit card details or other payment information. Creem.io processes payments securely in compliance with PCI-DSS standards. Please refer to Creem.io\'s privacy policy for details on how they handle payment data.' },
    { t: '4. Cookies & Local Storage', b: 'We use: (a) Google Analytics cookies — to analyze website traffic and improve user experience; (b) localStorage — to store your course unlock status so you do not need to re-enter your password on each visit. This data is stored on your device only and is not transmitted to our servers.' },
    { t: '5. Third-Party Services', b: 'Our website uses the following third-party services: (a) Creem.io — payment processing and digital product delivery; (b) Google Analytics — website traffic analysis; (c) Vercel — website hosting. Each service has its own privacy policy governing how they handle data.' },
    { t: '6. Data Retention', b: 'We retain your email address for as long as necessary to provide our services and respond to your inquiries. You may request deletion of your personal data at any time by contacting us at contact@drylandswimlab.com. Course unlock status stored in localStorage can be cleared by clearing your browser data.' },
    { t: '7. Your Rights', b: 'You have the right to: (a) Access the personal data we hold about you; (b) Request correction or deletion of your data; (c) Opt out of marketing communications; (d) Clear your locally stored data via your browser settings. To exercise any of these rights, contact us at contact@drylandswimlab.com.' },
    { t: '8. Data Security', b: 'We implement reasonable technical measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.' },
    { t: '9. Children\'s Privacy', b: 'Our services are not directed at children under 13. We do not knowingly collect personal information from children under 13.' },
    { t: '10. Changes to This Policy', b: 'We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. Continued use of the website after changes constitutes acceptance of the revised policy.' },
    { t: '11. Contact', b: 'If you have any questions about this Privacy Policy, please contact us at contact@drylandswimlab.com.' },
  ] : [
    { t: '1. 我们收集的信息', b: '我们收集以下信息：(a) 邮箱地址 — 当您注册上线通知或购买课程时提供；(b) 课程解锁状态 — 存储在您的浏览器本地（localStorage），用于记住您已解锁的课程；(c) 使用数据 — 我们使用 Google Analytics 了解访客如何与网站互动，包括页面浏览量、来源和设备信息。此数据为聚合匿名数据。' },
    { t: '2. 我们如何使用您的信息', b: '我们使用您的邮箱地址来：(a) 在您购买课程后发送解锁密码（通过支付服务商 Creem.io）；(b) 如果您注册了早鸟通知，通知您课程上线；(c) 回复您的咨询。我们不会为了营销目的将您的个人信息出售、出租或分享给第三方。' },
    { t: '3. 支付信息', b: '所有支付处理由 Creem.io 完成。我们不收集、存储或访问您的信用卡详情或其他支付信息。Creem.io 按照 PCI-DSS 标准安全处理支付。关于 Creem.io 如何处理支付数据，请参阅其隐私政策。' },
    { t: '4. Cookie 与本地存储', b: '我们使用：(a) Google Analytics Cookie — 用于分析网站流量和改善用户体验；(b) localStorage — 用于存储课程解锁状态，以便您无需每次访问重新输入密码。此数据仅存储在您的设备上，不会传输到我们的服务器。' },
    { t: '5. 第三方服务', b: '我们的网站使用以下第三方服务：(a) Creem.io — 支付处理和数字产品交付；(b) Google Analytics — 网站流量分析；(c) Vercel — 网站托管。每个服务都有自己的隐私政策。' },
    { t: '6. 数据保留', b: '我们保留您的邮箱地址的时间长度取决于提供服务及回复咨询的需要。您可以随时通过 contact@drylandswimlab.com 请求删除您的个人数据。存储在 localStorage 中的课程解锁状态可通过清除浏览器数据来删除。' },
    { t: '7. 您的权利', b: '您有权：(a) 访问我们持有的关于您的个人数据；(b) 请求更正或删除您的数据；(c) 退订营销通信；(d) 通过浏览器设置清除本地存储的数据。如需行使以上任何权利，请联系 contact@drylandswimlab.com。' },
    { t: '8. 数据安全', b: '我们采取合理的技术措施保护您的个人信息。但是，互联网上没有任何传输方式是 100% 安全的，我们无法保证绝对安全。' },
    { t: '9. 儿童隐私', b: '我们的服务不面向 13 岁以下儿童。我们不会故意收集 13 岁以下儿童的个人信 息。' },
    { t: '10. 政策变更', b: '我们可能会不时更新本隐私政策。变更将在此页面上发布，并附有更新的修订日期。在变更后继续使用网站即表示接受修订后的政策。' },
    { t: '11. 联系方式', b: '如果您对本隐私政策有任何疑问，请联系 contact@drylandswimlab.com。' },
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
              {language === 'en' ? 'Privacy Policy' : '隐私政策'}
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