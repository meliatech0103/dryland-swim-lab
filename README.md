# 🏊 Dryland Swim Lab

Dryland training platform dedicated to amateur swimming enthusiasts.

## 📋 Project Overview

Specialized courses in breaststroke and freestyle dryland training with 1v1 online coaching, based at Longchuan Bay Thousand Island Lake, Zhejiang Provincial Triathlon Federation Training Base.

### Core Features

- **Landing Page** - Professional landing page showcasing course value
- **Free Traffic Generation**
  - Training Calculator - Scientific training schedule planning
  - Training Plans & Tips - Professional training articles
  - Breaststroke vs Freestyle - Comparative analysis to help with selection
- **Paid Courses**
  - Video preview (first 20% free)
  - Password unlock system
  - Local storage for unlock status

## 🚀 Quick Start

### Environment Requirements

- Node.js v24.20.0+
- npm 11.19.0+

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit http://localhost:3000

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
dryland-swim-lab/
├── app/                          # Next.js pages
│   ├── page.tsx                  # Home page
│   ├── free/                     # Free pages
│   │   ├── calc/                 # Training calculator
│   │   ├── blog/                 # Training plans
│   │   └── compare/              # Breaststroke vs Freestyle
│   └── paid/                     # Paid pages
│       ├── page.tsx              # Course list
│       └── lesson/[id]/          # Course details (dynamic routing)
├── components/                   # React components
│   ├── Header.tsx                # Navigation bar
│   ├── Footer.tsx                # Footer
│   ├── VideoPlayer.tsx           # Video player
│   └── UnlockModal.tsx           # Password unlock modal
├── lib/                          # Utility functions and data
│   ├── lessons.ts                # Course data configuration
│   └── utils.ts                  # Utility functions
└── public/videos/                # Video files
    ├── free/                     # Free preview videos
    └── paid/                     # Paid full videos
```

## 🔧 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel

## 💰 Pricing

- **Breaststroke Dryland Training Course**: 3 sessions × 15 min (45 min total) - **$9.9 USD**
- **Freestyle Dryland Training Course**: 3 sessions × 15 min (45 min total) - **$9.9 USD**
- **Breaststroke + Freestyle Combo Course**: 6 sessions × 15 min (90 min total) - **$16.9 USD**

## 📝 Configuration

### Course Configuration

Edit `lib/lessons.ts` to configure course information:

```typescript
export const lessons: Lesson[] = [
  {
    id: 'frog',
    title: 'Breaststroke Dryland Training Course',
    description: 'Comprehensive breaststroke-specific dryland training program',
    price: 9.9,
    sessions: 3,
    sessionsDuration: 15,
    totalDuration: 45,
    video: {
      preview: '/videos/free/frog-preview.mp4',
      full: '/videos/paid/frog-full.mp4',
      duration: 2700, // 45 minutes total
    },
    password: 'FROG2025',
    creemLink: '#',
  },
  // ... other courses
];
```

### Password Unlock System

Uses localStorage to store unlock status, no login required.

Test passwords:
- Breaststroke course: `FROG2025`
- Freestyle course: `FREE2025`
- Combo course: `COMBO2025`

## 🎯 Development Roadmap

- [ ] Integrate Creem.io payment
- [ ] Add actual video content
- [ ] Enhance blog articles
- [ ] Add coach and base photos
- [ ] SEO optimization
- [ ] Deploy to Vercel

## 📄 License

MIT

## 🤝 Support

For questions, contact: contact@drylandswimlab.com