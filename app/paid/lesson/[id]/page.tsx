'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getLessonById, checkPassword, formatDuration, formatPrice, type Lesson } from '@/lib/lessons';
import { isLessonUnlocked, unlockLesson } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VideoPlayer from '@/components/VideoPlayer';
import UnlockModal from '@/components/UnlockModal';

export default function LessonPage() {
  const params = useParams();
  const lessonId = params.id as string;

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
      setUnlockError('Incorrect password, please try again');
    }
  };

  if (!lesson) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
            <a href="/paid" className="text-blue-600 hover:text-blue-700">
              Return to Course List
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
        {/* Back Link */}
        <div className="mb-6">
          <a href="/paid" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Return to Course List
          </a>
        </div>

        {/* Course Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{lesson.title}</h1>
          <p className="text-gray-600 text-lg mb-4">{lesson.description}</p>
          <div className="flex items-center gap-6">
            <div className="text-lg">
              <span className="text-gray-500">Price:</span>{' '}
              <span className="font-bold text-blue-600">{formatPrice(lesson.price)}</span>
            </div>
            <div className="text-lg">
              <span className="text-gray-500">Total Duration:</span>{' '}
              <span className="font-semibold">{formatDuration(lesson.video.duration)}</span>
            </div>
            <div className="text-lg text-sm">
              <div className="text-gray-500">
                {lesson.sessions} sessions × {lesson.sessionsDuration} min
              </div>
              <div className="text-xs mt-1">
                {lesson.totalDuration} minutes total
              </div>
            </div>
            {isUnlocked && (
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                ✓ Unlocked
              </span>
            )}
          </div>
        </div>

        {/* Video Player */}
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

        {!isUnlocked && (
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg p-6 text-white text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Currently in Preview Mode</h2>
            <p className="mb-4 text-blue-100">
              Full course: {lesson.sessions} sessions ({formatDuration(lesson.video.duration)} total), currently only playing first 20%
            </p>
            <button
              onClick={() => setShowUnlockModal(true)}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Enter Password to Unlock Full Course
            </button>
          </div>
        )}

        {/* Course Details */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Course Details</h2>
          <div className="space-y-4 text-gray-600">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📚</span>
              <div>
                <h3 className="font-semibold mb-1">Course Content</h3>
                <p>
                  This course includes complete dryland training guidance covering warm-up, core training, strength training, and stretching cooldown,
                  helping you effectively improve swimming skills on land.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎯</span>
              <div>
                <h3 className="font-semibold mb-1">Training Goals</h3>
                <p>
                  Through scientific and systematic dryland training, strengthen core power, improve stroke efficiency, enhance body coordination,
                  allowing you to swim faster and easier in the water.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚡</span>
              <div>
                <h3 className="font-semibold mb-1">Training Intensity</h3>
                <p>
                  Suitable for amateur swimming enthusiasts with moderate training intensity. Adjust movement difficulty and repetition count based on personal situation.
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