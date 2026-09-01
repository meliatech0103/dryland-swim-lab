// 本地存储键名
export const STORAGE_KEY_PREFIX = 'dryland-swim-unlocked-';

// 检查课程是否已解锁
export const isLessonUnlocked = (lessonId: string): boolean => {
  if (typeof window === 'undefined') return false;
  const stored = localStorage.getItem(`${STORAGE_KEY_PREFIX}${lessonId}`);
  return stored === 'true';
};

// 解锁课程
export const unlockLesson = (lessonId: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`${STORAGE_KEY_PREFIX}${lessonId}`, 'true');
};

// 锁定课程（测试用）
export const lockLesson = (lessonId: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(`${STORAGE_KEY_PREFIX}${lessonId}`);
};

// 格式化时间（秒 -> 分:秒）
export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

// 格式化价格
export const formatPrice = (price: number): string => {
  return `$${price}`;
};