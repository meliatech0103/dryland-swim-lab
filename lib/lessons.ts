import { formatDuration, formatPrice } from './utils';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  price: number;
  sessions: number; // 课程节数
  sessionsDuration: number; // 每节时长（分钟）
  totalDuration: number; // 总时长（分钟）
  video: {
    preview: string;
    full: string;
    duration: number; // 秒
  };
  password: string;
  creemLink?: string;
}

export const lessons: Lesson[] = [
  {
    id: 'freestyle',
    title: 'Freestyle Dryland Training Course',
    description: 'Complete freestyle-specific dryland training program',
    price: 9.9,
    sessions: 3,
    sessionsDuration: 15,
    totalDuration: 45,
    video: {
      preview: '/videos/free/freestyle-preview.mp4',
      full: '/videos/paid/freestyle-full.mp4',
      duration: 2700, // 45 minutes total
    },
    password: 'FREE2025',
    creemLink: '#', // Connect Creem.io later
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