import { formatDuration, formatPrice } from './utils';

export interface Lesson {
  id: string;
  title: { en: string; zh: string };
  description: { en: string; zh: string };
  price: number;
  currency: string;
  sessions: number; // 课程节数
  sessionsDuration: number; // 每节时长（分钟）
  totalDuration: number; // 总时长（分钟）
  video: {
    preview: string;
    full: string;
    duration: number; // 秒
  };
  password: string;
  creemLink: string; // Creem.io checkout link
  features: { en: string; zh: string }[];
}

export const lessons: Lesson[] = [
  {
    id: 'freestyle',
    title: {
      en: 'Freestyle Dryland Training Course',
      zh: '自由泳陆上专项训练课程',
    },
    description: {
      en: '3-session freestyle-specific dryland training program with video-guided exercises',
      zh: '3节自由泳陆上专项训练课程，全程视频引导',
    },
    price: 9.9,
    currency: 'USD',
    sessions: 3,
    sessionsDuration: 15,
    totalDuration: 45,
    video: {
      preview: '/videos/free/freestyle-preview.mp4',
      full: '/videos/paid/freestyle-full.mp4',
      duration: 2700,
    },
    password: process.env.NEXT_PUBLIC_COURSE_PASSWORD || 'FREE2025',
    creemLink: process.env.NEXT_PUBLIC_CREEM_CHECKOUT_LINK || '#',
    features: [
      { en: '3 progressive training sessions (15 min each)', zh: '3节进阶式训练（每节15分钟）' },
      { en: 'Freestyle-specific core & shoulder exercises', zh: '自由泳专项核心与肩部训练' },
      { en: 'Video-guided warm-up & cool-down', zh: '视频引导热身与拉伸放松' },
    ],
  },
];

export const getLessonById = (id: string): Lesson | undefined => {
  return lessons.find((lesson) => lesson.id === id);
};

export const checkPassword = (lessonId: string, inputPassword: string): boolean => {
  const lesson = getLessonById(lessonId);
  return lesson ? lesson.password === inputPassword : false;
};

// Re-export utils functions for convenience
export { formatDuration, formatPrice };