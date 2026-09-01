export type Language = 'en' | 'zh';

// 修改类型定义，使 t 函数可以接受任意字符串路径
export function useTranslation(language: Language) {
  const enTranslations = {
    // Header
    header: {
      logo: 'Dryland Swim Lab',
      home: 'Home',
      trainingTools: 'Free Custom Training Plan',
      trainingPlans: 'Swimmers Share',
      course: 'Dryland Specialized Training Courses',
    },

    // Footer
    footer: {
      rights: '© 2025 Dryland Swim Lab. All rights reserved.',
    },

    // Home Page
    home: {
      hero: {
        title: 'Freestyle Dryland Training',
        subtitle: 'Platform for Swimmers',
        description: 'Professional Freestyle Specialist Course · 1v1 Online Coaching',
        tryFree: 'Try Free Tools',
        viewCourse: 'View Course',
      },
      features: {
        title: 'Why Choose Us?',
        specialized: {
          title: 'Specialized Training',
          description: 'Freestyle-specific dryland training courses to improve core strength and stroke efficiency',
        },
        professional: {
          title: 'Professional Coaches',
          description: 'Former national team members, national-level athletes, and MJP fitness trainers provide personalized guidance',
        },
        trainingBase: {
          title: 'Training Base',
          description: 'Longchuan Bay Thousand Island Lake Training Base, combining offline training with online courses',
        },
      },
      course: {
        title: 'Professional Freestyle Course',
        description: 'Complete freestyle-specific dryland training program with 3 comprehensive sessions. Each session is 15 minutes, totaling 45 minutes of professional training content.',
        viewDetails: 'View Course Details',
        tags: {
          professional: 'Professional',
          total: '45 Min Total',
          sessions: '3 Sessions',
        },
        highlights: {
          core: {
            title: 'Core Strength',
            description: 'Build solid foundation for powerful strokes',
          },
          speed: {
            title: 'Speed Training',
            description: 'Enhance explosive power and stroke efficiency',
          },
          technique: {
            title: 'Technique Focus',
            description: 'Perfect your freestyle stroke mechanics',
          },
        },
      },
      cta: {
        title: 'Try Our Free Training Tools',
        description: 'Use our free training calculator to create your personalized freestyle training plan',
        buttonText: 'Generate Training Plan',
      },
    },

    // Training Tools Page
    calc: {
      title: 'Intelligent Training Plan Generator',
      description: 'Generate personalized training plans based on professional templates. You can choose water training, dryland training, or comprehensive training',
      frequency: {
        title: 'Select Training Frequency',
        label: 'Training days per week:',
        days: '{days} days',
      },
      mode: {
        title: 'Select Training Mode',
        water: {
          name: 'Water Training',
          description: 'Focus on freestyle water technique training',
        },
        dryland: {
          name: 'Dryland Training',
          description: 'Professional land training to improve strength and technique',
        },
        both: {
          name: 'Comprehensive Training',
          description: 'Time permitting, dual training recommended (separate sessions)',
        },
      },
      goal: {
        title: 'Select Training Goal',
        endurance: {
          name: 'Improve Endurance',
          description: 'Enhance cardiovascular and muscular endurance, extend swimming time',
        },
        speed: {
          name: 'Increase Speed',
          description: 'Enhance explosive power and stroke efficiency, improve swimming speed',
        },
        technique: {
          name: 'Improve Technique',
          description: 'Correct stroke mechanics, improve technical precision',
        },
        comprehensive: {
          name: 'Comprehensive Improvement',
          description: 'Comprehensive enhancement of all swimming skills',
        },
      },
      note: '🏊‍♂️ Freestyle Training Focus - This system is designed specifically for freestyle enthusiasts. You can choose to focus on water training, dryland training, or both when time permits. Dryland training content automatically rotates based on training days to avoid repetition.',
      generated: {
        title: 'Your Freestyle Training Plan',
        frequency: 'Training frequency:',
        days: '{days} times per week',
        mode: 'Training mode:',
        goal: 'Training goal:',
        style: 'Stroke style:',
        content: 'Training content:',
        contentValue: 'Water swimming + Rotating dryland training',
        distance: 'Training total distance:',
        water: '🏊‍♂️ Water swimming training:',
        dryland: '💪 Dryland training:',
        rest: '🏠 Complete rest day, let body fully recover',
        recommend: {
          title: 'Recommended Freestyle Course',
          sessions: '{sessions} sessions × {duration} min',
          totalDuration: 'Total duration {duration}',
          viewDetails: 'View Course Details',
        },
        regenerate: 'Regenerate Plan',
      },
      features: {
        water: {
          title: 'Professional Water Training',
          description: 'Based on professional 6-day training template, covering endurance, speed, and technique training',
        },
        dryland: {
          title: 'Complementary Dryland Training',
          description: 'Targeted core strength, explosive power, and technique training to enhance overall performance',
        },
        flexible: {
          title: 'Flexible Training Mode',
          description: 'Choose water, dryland, or comprehensive training based on time schedule, content rotates automatically to avoid repetition',
        },
      },
      cta: {
        title: 'Ready to Start Systematic Training?',
        description: 'Choose appropriate video course to start training based on your personalized training plan',
        buttonText: 'View Paid Courses',
      },
    },

    // Paid Course Page
    paid: {
      title: 'Freestyle Training Course',
      description: 'Professional freestyle dryland training course with 20% free preview. Unlock full content after purchase',
      course: {
        description: 'Complete freestyle-specific dryland training program with 3 comprehensive sessions.',
        sessions: 'Total Duration: {duration}',
        sessionsCount: '{sessions} sessions × {duration} min',
        professional: 'Professional Training',
        focus: 'Core + Speed + Technique',
        viewDetails: 'View Course Details',
      },
      benefits: {
        core: {
          title: 'Core Strength',
          description: 'Build solid foundation for powerful freestyle strokes',
        },
        speed: {
          title: 'Speed Training',
          description: 'Enhance explosive power and stroke efficiency',
        },
        technique: {
          title: 'Technique Focus',
          description: 'Perfect your freestyle stroke mechanics',
        },
      },
      info: {
        title: 'Course Information',
        preview: {
          title: 'Free Preview',
          description: 'First 20% available for free preview to understand course style and training methods',
        },
        password: {
          title: 'Password Unlock',
          description: 'Receive password via email after purchase, enter to unlock full course',
        },
        learnAnytime: {
          title: 'Learn Anytime',
          description: 'Access on phones, tablets, computers - train anytime, anywhere',
        },
        coaching: {
          title: '1v1 Coaching',
          description: 'After purchasing courses, schedule 1v1 online coaching for professional feedback',
        },
      },
    },

    // Freestyle Benefits Page
    compare: {
      title: 'Why Choose Freestyle?',
      description: 'Discover the advantages of freestyle swimming and how our specialized dryland training can transform your performance',
      hero: {
        title: 'The Fastest, Most Efficient Swimming Style',
        description: 'Freestyle (front crawl) is the fastest competitive swimming style and perfect for fitness, recreation, and competitive swimming. Our specialized dryland training helps you master this technique.',
      },
      advantages: {
        title: 'Freestyle Training Advantages',
        technical: 'Continuous stroke coordination with perfect body rotation and breathing rhythm',
        speed: 'Fastest swimming style with optimal energy expenditure per distance',
        dryland: 'Upper body strength, core stability, and stroke technique training',
        difficulty: '⭐⭐⭐⭐ Requires better coordination and endurance - rewarding challenge',
        performance: 'Improved cardiovascular fitness, upper body strength, and overall athletic ability',
        recommended: '4-5 times per week, 20-30 minutes per session for optimal results',
      },
      training: {
        title: '🏋️ Dryland Training',
        description: 'Our specialized freestyle dryland training focuses on:',
        core: '✓ Core strength development for body stability',
        upper: '✓ Upper body strength for powerful strokes',
        shoulder: '✓ Shoulder flexibility and injury prevention',
        stroke: '✓ Stroke technique simulation and refinement',
      },
      results: {
        title: '🎯 Training Results',
        description: 'After completing our freestyle training course, you will achieve:',
        efficiency: '✓ Improved stroke efficiency and speed',
        body: '✓ Better body positioning and rotation',
        breathing: '✓ Enhanced breathing rhythm and timing',
        fitness: '✓ Increased endurance and overall fitness',
      },
      cta: {
        title: 'Ready to Transform Your Freestyle?',
        description: 'Join our specialized freestyle dryland training course and take your swimming to the next level',
        viewCourse: 'View Freestyle Course',
        tryPlanner: 'Try Training Planner',
      },
    },

    // Blog Page
    blog: {
      title: 'Freestyle Training Plans & Tips',
      description: 'Professional freestyle dryland training plans, technique sharing, and student success stories',
      category: 'Training Plans',
      readMore: 'Read More →',
      cta: {
        title: 'Want to Learn Freestyle Dryland Training Systematically?',
        description: 'Our professional freestyle course provides a complete training system and guidance',
        buttonText: 'View Freestyle Course',
      },
    },
  };

  const zhTranslations = {
    // Header
    header: {
      logo: 'Dryland Swim Lab',
      home: '首页',
      trainingTools: '免费定制训练计划',
      trainingPlans: '泳者分享',
      course: '陆上专项训练课程',
    },

    // Footer
    footer: {
      rights: '© 2025 Dryland Swim Lab. 保留所有权利。',
    },

    // Home Page
    home: {
      hero: {
        title: '自由泳陆地训练',
        subtitle: '业余游泳爱好者平台',
        description: '专业自由泳专项课程 · 1v1在线指导',
        tryFree: '试用免费工具',
        viewCourse: '查看课程',
      },
      features: {
        title: '为什么选择我们？',
        specialized: {
          title: '专业训练',
          description: '自由泳专项陆地训练课程，提升核心力量和划水效率',
        },
        professional: {
          title: '专业教练',
          description: '前国家队成员、国家级运动员和MJP体能师提供个性化指导',
        },
        trainingBase: {
          title: '训练基地',
          description: '千岛湖龙川湾训练基地，结合线下训练和线上课程',
        },
      },
      course: {
        title: '专业自由泳课程',
        description: '完整的自由泳专项陆地训练项目，包含3节综合课程。每节课15分钟，共45分钟专业训练内容。',
        viewDetails: '查看课程详情',
        tags: {
          professional: '专业',
          total: '总计45分钟',
          sessions: '3节课',
        },
        highlights: {
          core: {
            title: '核心力量',
            description: '为强力划水建立坚实基础',
          },
          speed: {
            title: '速度训练',
            description: '增强爆发力和划水效率',
          },
          technique: {
            title: '技术专注',
            description: '完善自由泳划水技术',
          },
        },
      },
      cta: {
        title: '试用我们的免费训练工具',
        description: '使用我们的免费训练计算器创建个性化自由泳训练计划',
        buttonText: '生成训练计划',
      },
    },

    // Training Tools Page
    calc: {
      title: '智能训练计划生成器',
      description: '基于专业训练模板，根据你的训练需求生成个性化计划。你可以选择水下训练、陆上训练或兼顾训练',
      frequency: {
        title: '选择训练频率',
        label: '每周训练天数:',
        days: '{days}天',
      },
      mode: {
        title: '选择训练模式',
        water: {
          name: '水下训练',
          description: '专注于自由泳水下技术训练',
        },
        dryland: {
          name: '陆上训练',
          description: '进行专业陆地训练，提升力量和技术',
        },
        both: {
          name: '兼顾训练',
          description: '时间充裕时可进行双重训练（推荐分次进行）',
        },
      },
      goal: {
        title: '选择训练目的',
        endurance: {
          name: '增强耐力',
          description: '提升心肺功能和肌肉耐力，延长游泳时间',
        },
        speed: {
          name: '提高速度',
          description: '增强爆发力和划水效率，提升游泳速度',
        },
        technique: {
          name: '改善技术',
          description: '修正划水动作，提高技术精确度',
        },
        comprehensive: {
          name: '综合提升',
          description: '全面提升各项游泳技能',
        },
      },
      note: '🏊‍♂️ 专注自由泳训练 - 本系统专门为自由泳爱好者设计。你可以选择专注于水下训练、陆上训练，或时间充裕时兼顾两者。陆上训练内容会根据训练天数自动轮换，避免重复训练。',
      generated: {
        title: '你的自由泳训练计划',
        frequency: '训练频率:',
        days: '每周 {days} 次',
        mode: '训练模式:',
        goal: '训练目的:',
        style: '泳式:',
        content: '训练内容:',
        contentValue: '水下游泳 + 轮换陆上训练',
        distance: '训练总距离:',
        water: '🏊‍♂️ 水下游泳训练:',
        dryland: '💪 陆上训练:',
        rest: '🏠 完全休息日，让身体充分恢复',
        recommend: {
          title: '推荐自由泳训练课程',
          sessions: '{sessions} 节课 × {duration} 分钟',
          totalDuration: '总时长 {duration}',
          viewDetails: '查看课程详情',
        },
        regenerate: '重新生成计划',
      },
      features: {
        water: {
          title: '专业水下训练',
          description: '基于一周六练的专业训练模板，涵盖耐力、速度、技术训练',
        },
        dryland: {
          title: '配套陆上训练',
          description: '针对性核心力量、爆发力、技术动作训练，提升整体表现',
        },
        flexible: {
          title: '灵活训练模式',
          description: '根据时间安排选择水下、陆上或兼顾训练，内容自动轮换避免重复',
        },
      },
      cta: {
        title: '准备好开始系统训练了吗？',
        description: '根据你的个性化训练计划，选择合适的视频课程开始训练',
        buttonText: '查看付费课程',
      },
    },

    // Paid Course Page
    paid: {
      title: '自由泳训练课程',
      description: '专业自由泳陆地训练课程，20%免费预览。购买后解锁完整内容',
      course: {
        description: '完整的自由泳专项陆地训练项目，包含3节综合课程。',
        sessions: '总时长: {duration}',
        sessionsCount: '{sessions} 节课 × {duration} 分钟',
        professional: '专业训练',
        focus: '核心 + 速度 + 技术',
        viewDetails: '查看课程详情',
      },
      benefits: {
        core: {
          title: '核心力量',
          description: '为强力自由泳划水建立坚实基础',
        },
        speed: {
          title: '速度训练',
          description: '增强爆发力和划水效率',
        },
        technique: {
          title: '技术专注',
          description: '完善自由泳划水技术',
        },
      },
      info: {
        title: '课程信息',
        preview: {
          title: '免费预览',
          description: '前20%可免费预览，了解课程风格和训练方法',
        },
        password: {
          title: '密码解锁',
          description: '购买后通过邮件收到密码，输入后解锁完整课程',
        },
        learnAnytime: {
          title: '随时学习',
          description: '可在手机、平板、电脑上访问 - 随时随地训练',
        },
        coaching: {
          title: '1v1指导',
          description: '购买课程后可预约1v1在线指导，获得专业反馈',
        },
      },
    },

    // Freestyle Benefits Page
    compare: {
      title: '为什么选择自由泳？',
      description: '发现自由泳游泳的优势以及我们专业的陆地训练如何改变你的表现',
      hero: {
        title: '最快、最高效的游泳方式',
        description: '自由泳（爬泳）是最快的竞技游泳方式，非常适合健身、休闲和竞技游泳。我们专业的陆地训练帮助你掌握这项技术。',
      },
      advantages: {
        title: '自由泳训练优势',
        technical: '连续划水配合完美的身体旋转和呼吸节奏',
        speed: '最快的游泳方式，单位距离能量消耗最优',
        dryland: '上肢力量、核心稳定性和划水技术训练',
        difficulty: '⭐⭐⭐⭐ 需要更好的协调性和耐力 - 有回报的挑战',
        performance: '改善心肺功能、上肢力量和整体运动能力',
        recommended: '每周4-5次，每次20-30分钟以获得最佳效果',
      },
      training: {
        title: '🏋️ 陆地训练',
        description: '我们专业的自由泳陆地训练专注于：',
        core: '✓ 核心力量发展，提升身体稳定性',
        upper: '✓ 上肢力量，增强划水力度',
        shoulder: '✓ 肩部灵活性和伤病预防',
        stroke: '✓ 划水技术模拟和完善',
      },
      results: {
        title: '🎯 训练效果',
        description: '完成我们的自由泳训练课程后，你将实现：',
        efficiency: '✓ 提升划水效率和速度',
        body: '✓ 更好的身体定位和旋转',
        breathing: '✓ 增强呼吸节奏和时机',
        fitness: '✓ 提高耐力和整体体能',
      },
      cta: {
        title: '准备好改变你的自由泳了吗？',
        description: '加入我们专业的自由泳陆地训练课程，将游泳提升到新水平',
        viewCourse: '查看自由泳课程',
        tryPlanner: '试用训练计划器',
      },
    },

    // Blog Page
    blog: {
      title: '自由泳训练计划与技巧',
      description: '专业自由泳陆地训练计划、技术分享和学员成功故事',
      category: '训练计划',
      readMore: '阅读更多 →',
      cta: {
        title: '想要系统学习自由泳陆地训练吗？',
        description: '我们的专业自由泳课程提供完整的训练系统和指导',
        buttonText: '查看自由泳课程',
      },
    },
  };

  const translations = language === 'en' ? enTranslations : zhTranslations;

  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let result: any = translations;

    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return key; // 如果找不到，返回原key
      }
    }

    if (typeof result === 'string') {
      // 处理参数替换
      if (params) {
        return result.replace(/\{(\w+)\}/g, (match, paramKey) => {
          return String(params[paramKey] || match);
        });
      }
      return result;
    }

    return key; // 如果最终结果不是字符串，返回原key
  };

  return { t, translations };
}