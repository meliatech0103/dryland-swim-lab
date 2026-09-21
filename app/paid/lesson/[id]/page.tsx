'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getLessonById, checkPassword, formatDuration, formatPrice, type Lesson } from '@/lib/lessons';
import { isLessonUnlocked, unlockLesson } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VideoPlayer from '@/components/VideoPlayer';
import UnlockModal from '@/components/UnlockModal';
import { useLanguage } from '@/lib/LanguageContext';

export default function LessonPage() {
  const params = useParams();
  const lessonId = params.id as string;
  const { language } = useLanguage();

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [unlockError, setUnlockError] = useState<string | null>(null);

  useEffect(() => {
    const foundLesson = getLessonById(lessonId);
    if (foundLesson) {
      setLesson(foundLesson);
      setIsUnlocked(isLessonUnlocked(lessonId));
    }
  }, [lessonId]);

  const handleUnlock = (password: string) => {
    if (checkPassword(lessonId, password)) {
      unlockLesson(lessonId);
      setIsUnlocked(true);
      setShowUnlockModal(false);
      setUnlockError(null);
    } else {
      setUnlockError(
        language === 'en'
          ? 'Incorrect password. Please check your email for the correct password.'
          : '密码错误，请检查购买邮件中的密码。'
      );
    }
  };

  if (!lesson) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">
              {language === 'en' ? 'Course Not Found' : '课程未找到'}
            </h1>
            <a href="/paid" className="text-blue-600 hover:text-blue-700">
              {language === 'en' ? 'Return to Course List' : '返回课程列表'}
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 返回链接 */}
        <div className="mb-6">
          <a href="/paid" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {language === 'en' ? 'Return to Course List' : '返回课程列表'}
          </a>
        </div>

        {/* 课程标题 */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
            {lesson.title[language]}
          </h1>
          <p className="text-gray-600 text-lg mb-4">{lesson.description[language]}</p>
          <div className="flex flex-wrap items-center gap-4">
            <div className="text-lg">
              <span className="text-gray-500">{language === 'en' ? 'Price:' : '价格：'}</span>{' '}
              <span className="font-bold text-blue-600">{formatPrice(lesson.price)}</span>
            </div>
            <div className="text-lg">
              <span className="text-gray-500">{language === 'en' ? 'Duration:' : '时长：'}</span>{' '}
              <span className="font-semibold">{formatDuration(lesson.video.duration)}</span>
            </div>
            <div className="text-sm text-gray-500">
              {lesson.sessions} {language === 'en' ? 'sessions' : '节'} × {lesson.sessionsDuration} min
            </div>
            {isUnlocked && (
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                ✓ {language === 'en' ? 'Unlocked' : '已解锁'}
              </span>
            )}
          </div>
        </div>

        {/* 视频播放器 */}
        <div className="mb-8">
          {isUnlocked ? (
            <VideoPlayer src={lesson.video.full} unlocked={true} />
          ) : (
            <VideoPlayer
              src={lesson.video.preview}
              unlocked={false}
              unlockVideo={() => setShowUnlockModal(true)}
            />
          )}
        </div>

        {/* 未解锁时的引导区域 */}
        {!isUnlocked && (
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 text-white text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">
              {language === 'en' ? 'Preview Mode' : '预览模式'}
            </h2>
            <p className="mb-6 text-cyan-100">
              {language === 'en'
                ? `Full course: ${lesson.sessions} sessions (${formatDuration(lesson.video.duration)} total). Purchase to unlock the complete training program.`
                : `完整课程：${lesson.sessions}节（总计${formatDuration(lesson.video.duration)}）。购买后解锁完整训练。`}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Creem 购买按钮 */}
              {lesson.creemLink && lesson.creemLink !== '#' ? (
                <a
                  href={lesson.creemLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-block"
                >
                  {language === 'en' ? `Buy for $${lesson.price}` : `购买 ¥${lesson.price}`}
                </a>
              ) : null}

              {/* 密码解锁按钮 */}
              <button
                onClick={() => setShowUnlockModal(true)}
                className={`px-8 py-3 rounded-lg font-semibold transition-colors inline-block ${
                  lesson.creemLink && lesson.creemLink !== '#'
                    ? 'border-2 border-white text-white hover:bg-white/10'
                    : 'bg-white text-blue-600 hover:bg-blue-50'
                }`}
              >
                {language === 'en' ? 'Enter Password to Unlock' : '输入密码解锁'}
              </button>
            </div>

            <p className="text-cyan-200 text-sm mt-4">
              {language === 'en'
                ? '💡 Password is sent to your email after purchase via Creem.io'
                : '💡 购买后密码将通过 Creem.io 自动发送至您的邮箱'}
            </p>
          </div>
        )}

        {/* 课程亮点 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            {language === 'en' ? 'What You\'ll Get' : '课程亮点'}
          </h2>
          <div className="space-y-4 text-gray-600">
            {lesson.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="text-cyan-600 mt-0.5 text-lg">✓</span>
                <span className="text-base">{feature[language]}</span>
              </div>
            ))}

            <div className="flex items-start gap-3">
              <span className="text-2xl">📚</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {language === 'en' ? 'Complete Training Guide' : '完整训练指导'}
                </h3>
                <p>
                  {language === 'en'
                    ? 'Warm-up, core training, strength work, and cool-down — all video-guided for proper form.'
                    : '热身、核心训练、力量训练、拉伸放松——全程视频引导，确保动作规范。'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎯</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {language === 'en' ? 'Results-Driven' : '效果导向'}
                </h3>
                <p>
                  {language === 'en'
                    ? 'Scientific and systematic training to strengthen core power, improve stroke efficiency, and enhance coordination.'
                    : '科学系统化训练，强化核心力量、提升划水效率、增强身体协调性。'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <UnlockModal
        isOpen={showUnlockModal}
        onClose={() => {
          setShowUnlockModal(false);
          setUnlockError(null);
        }}
        onUnlock={handleUnlock}
        error={unlockError}
      />
    </div>
  );
}