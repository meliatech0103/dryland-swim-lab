import type { ReactNode } from 'react';

export type IconName =
  | 'water'
  | 'strength'
  | 'target'
  | 'globe'
  | 'pool'
  | 'clock'
  | 'book'
  | 'chart'
  | 'bolt'
  | 'location'
  | 'mail'
  | 'phone'
  | 'card'
  | 'check'
  | 'arrow';

const paths: Record<IconName, ReactNode> = {
  water: <><path d="M3 8c2.1 0 2.1-1.5 4.2-1.5S9.3 8 11.4 8s2.1-1.5 4.2-1.5S17.7 8 19.8 8" /><path d="M3 13c2.1 0 2.1-1.5 4.2-1.5S9.3 13 11.4 13s2.1-1.5 4.2-1.5 2.1 1.5 4.2 1.5" /><path d="M5 18h14" /></>,
  strength: <><path d="M6 9v6M3.5 10v4M18 9v6m2.5-5v4M6 12h12" /></>,
  target: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3.5 12h17M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
  pool: <><path d="M4 6v11M8 6v11M16 6v11M20 6v11" /><path d="M2 20c1.5-1.2 3-1.2 4.5 0s3 1.2 4.5 0 3-1.2 4.5 0 3 1.2 4.5 0 3-1.2 4.5 0" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>,
  book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21z" /><path d="M4 5.5v13A2.5 2.5 0 0 1 6.5 16H20" /></>,
  chart: <><path d="M4 19V5M4 19h17" /><path d="m7 15 4-4 3 2 5-6" /><path d="M16 7h3v3" /></>,
  bolt: <path d="m13 2-9 12h7l-1 8 10-13h-7z" />,
  location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
  phone: <path d="M7 3h3l1.2 4-2 1.5a15 15 0 0 0 6.3 6.3L17 13l4 1.2v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.8 5.2 2 2 0 0 1 7 3Z" />,
  card: <><rect x="2.5" y="5" width="19" height="14" rx="2" /><path d="M3 10h18M7 15h4" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
};

export default function Icon({
  name,
  className = 'h-6 w-6',
  strokeWidth = 1.7,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
