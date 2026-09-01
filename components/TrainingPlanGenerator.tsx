'use client';

import { useState, useRef } from 'react';
import { lessons, formatPrice } from '@/lib/lessons';
import { useLanguage } from '@/lib/LanguageContext';
import html2canvas from 'html2canvas';
import QRCode from 'qrcode';

// 训练目的选项
const trainingGoals = [
  { id: 'endurance', name: 'endurance', description: 'endurance' },
  { id: 'speed', name: 'speed', description: 'speed' },
  { id: 'technique', name: 'technique', description: 'technique' },
  { id: 'comprehensive', name: 'comprehensive', description: 'comprehensive' },
];

// 训练模式选项
const trainingModes = [
  { id: 'water', icon: '🏊‍♂️' },
  { id: 'dryland', icon: '💪' },
  { id: 'both', icon: '🎯' },
];

// 英文版自由泳训练计划模板
const freestylePlansEn = [
  {
    day: 'Monday',
    theme: 'Low-intensity long-distance endurance',
    totalDistance: '2400m',
    intensity: 'Low intensity (65-70% max heart rate)',
    waterTraining: [
      { name: 'Warm-up', content: '200m freestyle with pull buoy', duration: '' },
      { name: 'Main set', content: '2000m freestyle (steady pace)', duration: '' },
      { name: 'Cool-down', content: '200m freestyle with pull buoy', duration: '' },
    ],
  },
  {
    day: 'Tuesday',
    theme: 'High-interval interval power',
    totalDistance: '1800m',
    intensity: 'High intensity (85-95% max heart rate)',
    waterTraining: [
      { name: 'Warm-up', content: '200m freestyle', duration: '' },
      { name: 'Interval', content: '3×100m (sets at 85%, 90%, 100% threshold pace respectively), repeat 4 times, rest = training time for each set', duration: '' },
      { name: 'Technical compensation', content: '4×50m pull buoy pulling + 4×50m flutter kick with board', duration: '' },
    ],
  },
  {
    day: 'Wednesday',
    theme: 'Pace control + technique refinement',
    totalDistance: '1600m',
    intensity: 'Medium-high intensity (75-85% max heart rate)',
    waterTraining: [
      { name: 'Warm-up', content: '200m freestyle', duration: '' },
      { name: 'Main set', content: '6×200m freestyle pace (descending pace, 1min rest between sets)', duration: '' },
      { name: 'Technical compensation', content: '4×50m flutter kick with board + 10 flip turn push-offs + 10 dive starts', duration: '' },
    ],
  },
  {
    day: 'Thursday',
    theme: 'Low-intensity aerobic recovery',
    totalDistance: '1800m',
    intensity: 'Low intensity (60-65% max heart rate)',
    waterTraining: [
      { name: 'Warm-up', content: '200m freestyle', duration: '' },
      { name: 'Main set', content: '400m freestyle (steady pace) + 300m breaststroke/backstroke + 400m freestyle cool-down + 300m breaststroke/backstroke', duration: '' },
      { name: 'Technical compensation', content: '4×50m flutter kick with board', duration: '' },
    ],
  },
  {
    day: 'Friday',
    theme: 'Mixed-oxygen threshold',
    totalDistance: '1500m',
    intensity: 'Medium-high intensity (80-90% max heart rate)',
    waterTraining: [
      { name: 'Warm-up', content: '200m freestyle', duration: '' },
      { name: 'Mixed-oxygen threshold', content: '1×400m freestyle (threshold pace PB+10s, 2min rest after completion) + 2×200m freestyle (threshold pace PB+5s, 1min rest between sets, 2min rest after completion) + 4×100m freestyle all-out (full sprint, 45s rest between sets)', duration: '' },
      { name: 'Cool-down', content: '100m cool-down freestyle', duration: '' },
    ],
  },
  {
    day: 'Saturday',
    theme: 'Comprehensive intensity test',
    totalDistance: '1600m',
    intensity: 'High intensity (85-95% max heart rate)',
    waterTraining: [
      { name: 'Warm-up', content: '200m freestyle', duration: '' },
      { name: 'Main set', content: '400m×3 all-out (3min rest between sets, record each set data)', duration: '' },
      { name: 'Technical compensation', content: '4×50m freestyle (technique/pace alternating)', duration: '' },
    ],
  },
  {
    day: 'Sunday',
    theme: 'Rest day',
    totalDistance: 'Rest',
    intensity: 'Complete rest',
    waterTraining: [],
    restDay: true,
  },
];

// 中文版自由泳训练计划模板
const freestylePlansZh = [
  {
    day: '周一',
    theme: '低强度长距离耐力',
    totalDistance: '2400m',
    intensity: '低强度（65-70%最大心率）',
    waterTraining: [
      { name: '热身', content: '200m夹板自由泳', duration: '' },
      { name: '主项', content: '2000m自由泳（恒定配速）', duration: '' },
      { name: '放松', content: '200m夹板自由泳', duration: '' },
    ],
  },
  {
    day: '周二',
    theme: '高强度间歇爆发力',
    totalDistance: '1800m',
    intensity: '高强度（85-95%最大心率）',
    waterTraining: [
      { name: '热身', content: '200m自由泳', duration: '' },
      { name: '间歇', content: '3×100m（每组分别阈值配速85%、90%、100%），循环4次，每组休息时间=每组训练时间', duration: '' },
      { name: '技术补偿', content: '4×50m夹板划手+4*50m浮板打腿', duration: '' },
    ],
  },
  {
    day: '周三',
    theme: '节奏控制+技术打磨',
    totalDistance: '1600m',
    intensity: '中高强度（75-85%最大心率）',
    waterTraining: [
      { name: '热身', content: '200m自由泳', duration: '' },
      { name: '主项', content: '6×200m节奏自由泳（配速递减，组间休息1min）', duration: '' },
      { name: '技术补偿', content: '4×50m浮板打腿+10次滚翻蹬边+10次跳发练习', duration: '' },
    ],
  },
  {
    day: '周四',
    theme: '低强度有氧恢复',
    totalDistance: '1800m',
    intensity: '低强度（60-65%最大心率）',
    waterTraining: [
      { name: '热身', content: '200m自由泳', duration: '' },
      { name: '主项', content: '400m自由泳（恒定配速）+300m蛙泳/仰泳+400m自由泳放松+300m蛙泳/仰泳', duration: '' },
      { name: '技术补偿', content: '4*50m浮板打腿', duration: '' },
    ],
  },
  {
    day: '周五',
    theme: '混氧阈值',
    totalDistance: '1500m',
    intensity: '中高强度（80-90%最大心率）',
    waterTraining: [
      { name: '热身', content: '200m自由泳', duration: '' },
      { name: '混养阈值', content: '1*400m自由泳（阈值配速PB+10s，结束休息2min）+2*200m自由泳（阈值配速PB+5s，组间休息1min，结束休息2min）+4*100m自由泳全力游（全力冲，组间休息45s）', duration: '' },
      { name: '放松', content: '100m放松自由泳', duration: '' },
    ],
  },
  {
    day: '周六',
    theme: '综合强度测试',
    totalDistance: '1600m',
    intensity: '高强度（85-95%最大心率）',
    waterTraining: [
      { name: '热身', content: '200m自由泳', duration: '' },
      { name: '主项', content: '400m*3全力游（组间休息3min，记录每组数据）', duration: '' },
      { name: '技术补偿', content: '4×50m自由泳（技术/节奏交替）', duration: '' },
    ],
  },
  {
    day: '周日',
    theme: '休息日',
    totalDistance: '休息',
    intensity: '完全休息',
    waterTraining: [],
    restDay: true,
  },
];

// 英文版陆上训练动作库
const drylandExercisesEn = {
  endurance: {
    name: 'Endurance Training',
    sets: [
      {
        name: 'Endurance Training Set A',
        category: 'Cardiovascular endurance',
        exercises: [
          { name: 'Burpees', sets: '4 sets', duration: '10 reps per set', rest: '60s' },
          { name: 'Mountain Climbers', sets: '4 sets', duration: '20 reps per set', rest: '30s' },
          { name: 'High Knees', sets: '4 sets', duration: '30s per set', rest: '20s' },
          { name: 'Plank Alternates', sets: '3 sets', duration: '30s per set', rest: '30s' },
        ],
      },
      {
        name: 'Endurance Training Set B',
        category: 'Circuit endurance',
        exercises: [
          { name: 'Jump Rope', sets: '4 sets', duration: '1min per set', rest: '45s' },
          { name: 'Jumping Jacks', sets: '4 sets', duration: '30 reps per set', rest: '30s' },
          { name: 'Alternating Lunges', sets: '4 sets', duration: '16 reps per set', rest: '30s' },
          { name: 'Mountain Climbers', sets: '3 sets', duration: '25 reps per set', rest: '30s' },
        ],
      },
      {
        name: 'Endurance Training Set C',
        category: 'Interval endurance',
        exercises: [
          { name: 'Burpees', sets: '5 sets', duration: '8 reps per set', rest: '45s' },
          { name: 'Jump Rope', sets: '4 sets', duration: '45s per set', rest: '30s' },
          { name: 'Squat Jumps', sets: '4 sets', duration: '12 reps per set', rest: '45s' },
          { name: 'Jumping Jacks', sets: '3 sets', duration: '40 reps per set', rest: '30s' },
        ],
      },
    ],
  },
  speed: {
    name: 'Speed Training',
    sets: [
      {
        name: 'Power Training Set A',
        category: 'Upper body power',
        exercises: [
          { name: 'Box Jumps', sets: '4 sets', duration: '8 reps per set', rest: '60s' },
          { name: 'Medicine Ball Throws', sets: '4 sets', duration: '10 reps per set', rest: '60s' },
          { name: 'Resistance Band Pulls', sets: '4 sets', duration: '15 reps per set', rest: '30s' },
          { name: 'Explosive Push-ups', sets: '3 sets', duration: '10 reps per set', rest: '30s' },
        ],
      },
      {
        name: 'Power Training Set B',
        category: 'Full body power',
        exercises: [
          { name: 'Standing Long Jump', sets: '5 sets', duration: '6 reps per set', rest: '45s' },
          { name: 'Medicine Ball Rotations', sets: '4 sets', duration: '12 reps per set', rest: '45s' },
          { name: 'Resistance Band Pulls', sets: '4 sets', duration: '12 reps per set', rest: '30s' },
          { name: 'Fast Mountain Climbers', sets: '3 sets', duration: '15 reps per set', rest: '30s' },
        ],
      },
      {
        name: 'Power Training Set C',
        category: 'Core power',
        exercises: [
          { name: 'Box Jumps', sets: '4 sets', duration: '6 reps per set', rest: '60s' },
          { name: 'Medicine Ball Slams', sets: '4 sets', duration: '10 reps per set', rest: '45s' },
          { name: 'Resistance Band Pushes', sets: '4 sets', duration: '12 reps per set', rest: '30s' },
          { name: 'Fast Burpees', sets: '3 sets', duration: '8 reps per set', rest: '45s' },
        ],
      },
    ],
  },
  technique: {
    name: 'Technique Training',
    sets: [
      {
        name: 'Technique Training Set A',
        category: 'Stroke technique',
        exercises: [
          { name: 'Single Arm Stroke Mimic', sets: '3 sets', duration: '15 reps per set', rest: '30s' },
          { name: 'Resistance Band Corrections', sets: '3 sets', duration: '12 reps per set', rest: '30s' },
          { name: 'Shoulder Mobility', sets: '3 sets', duration: '20s per set', rest: '20s' },
          { name: 'Freestyle Leg Mimic', sets: '3 sets', duration: '30s per set', rest: '20s' },
        ],
      },
      {
        name: 'Technique Training Set B',
        category: 'Body coordination',
        exercises: [
          { name: 'Double Arm Stroke Mimic', sets: '3 sets', duration: '12 reps per set', rest: '30s' },
          { name: 'Resistance Band Stretches', sets: '3 sets', duration: '15 reps per set', rest: '30s' },
          { name: 'Shoulder Rotations', sets: '3 sets', duration: '20 reps per set', rest: '20s' },
          { name: 'Body Rotation Training', sets: '3 sets', duration: '10 reps per set', rest: '30s' },
        ],
      },
      {
        name: 'Technique Training Set C',
        category: 'Overall technique',
        exercises: [
          { name: 'Alternating Single Arm Stroke', sets: '3 sets', duration: '20 reps per set', rest: '30s' },
          { name: 'Resistance Band Stretches', sets: '3 sets', duration: '15 reps per set', rest: '30s' },
          { name: 'Shoulder Mobility', sets: '3 sets', duration: '25s per set', rest: '20s' },
          { name: 'Full Body Coordination', sets: '3 sets', duration: '30s per set', rest: '30s' },
        ],
      },
    ],
  },
  comprehensive: {
    name: 'Comprehensive Training',
    sets: [
      {
        name: 'Coordination Training',
        category: 'Body coordination',
        exercises: [
          { name: 'Single-Leg RDL with Reach', sets: '3 sets', duration: '8 reps per set', rest: '45s' },
          { name: 'Balance Board Training', sets: '3 sets', duration: '30s per set', rest: '30s' },
          { name: 'Lateral Movement', sets: '3 sets', duration: '20 reps per set', rest: '30s' },
          { name: 'Ankle Mobility', sets: '3 sets', duration: '15 reps per set', rest: '20s' },
        ],
      },
      {
        name: 'Power Training',
        category: 'Explosive power',
        exercises: [
          { name: 'Medicine Ball Slams', sets: '4 sets', duration: '12 reps per set', rest: '60s' },
          { name: 'Box Jumps', sets: '4 sets', duration: '8 reps per set', rest: '60s' },
          { name: 'Standing Long Jump', sets: '4 sets', duration: '6 reps per set', rest: '45s' },
          { name: 'Resistance Band Power', sets: '4 sets', duration: '10 reps per set', rest: '45s' },
        ],
      },
      {
        name: 'Core Training',
        category: 'Core strength',
        exercises: [
          { name: 'Dead Bug', sets: '3 sets', duration: '12 reps per set', rest: '45s' },
          { name: 'Plank Hold', sets: '3 sets', duration: '45s per set', rest: '30s' },
          { name: 'Russian Twists', sets: '3 sets', duration: '20 reps per set', rest: '30s' },
          { name: 'Bird Dog', sets: '3 sets', duration: '10 reps per set', rest: '30s' },
        ],
      },
      {
        name: 'Comprehensive Coordination',
        category: 'Full coordination',
        exercises: [
          { name: 'Complex Training', sets: '3 sets', duration: '8min per set', rest: '60s' },
          { name: 'Core + Power', sets: '3 sets', duration: '5min per set', rest: '45s' },
          { name: 'Technique + Power', sets: '3 sets', duration: '6min per set', rest: '45s' },
          { name: 'Full Body Coordination', sets: '3 sets', duration: '7min per set', rest: '60s' },
        ],
      },
    ],
  },
};

// 中文版陆上训练动作库
const drylandExercisesZh = {
  endurance: {
    name: '耐力训练',
    sets: [
      {
        name: '耐力训练 A套',
        category: '心肺耐力',
        exercises: [
          { name: '波比跳', sets: '4组', duration: '每组10次', rest: '60秒' },
          { name: '登山者', sets: '4组', duration: '每组20次', rest: '30秒' },
          { name: '高抬腿', sets: '4组', duration: '每组30秒', rest: '20秒' },
          { name: '平板交替', sets: '3组', duration: '每组30秒', rest: '30秒' },
        ],
      },
      {
        name: '耐力训练 B套',
        category: '循环耐力',
        exercises: [
          { name: '跳绳', sets: '4组', duration: '每组1分钟', rest: '45秒' },
          { name: '开合跳', sets: '4组', duration: '每组30次', rest: '30秒' },
          { name: '弓步交替', sets: '4组', duration: '每组16次', rest: '30秒' },
          { name: '登山者', sets: '3组', duration: '每组25次', rest: '30秒' },
        ],
      },
      {
        name: '耐力训练 C套',
        category: '间歇耐力',
        exercises: [
          { name: '波比跳', sets: '5组', duration: '每组8次', rest: '45秒' },
          { name: '跳绳', sets: '4组', duration: '每组45秒', rest: '30秒' },
          { name: '深蹲跳', sets: '4组', duration: '每组12次', rest: '45秒' },
          { name: '开合跳', sets: '3组', duration: '每组40次', rest: '30秒' },
        ],
      },
    ],
  },
  speed: {
    name: '速度训练',
    sets: [
      {
        name: '爆发力训练 A套',
        category: '上肢爆发',
        exercises: [
          { name: '跳箱训练', sets: '4组', duration: '每组8次', rest: '60秒' },
          { name: '药球投掷', sets: '4组', duration: '每组10次', rest: '60秒' },
          { name: '阻力带划水', sets: '4组', duration: '每组15次', rest: '30秒' },
          { name: '快速俯卧撑', sets: '3组', duration: '每组10次', rest: '30秒' },
        ],
      },
      {
        name: '爆发力训练 B套',
        category: '全身爆发',
        exercises: [
          { name: '立定跳远', sets: '5组', duration: '每组6次', rest: '45秒' },
          { name: '药球旋转', sets: '4组', duration: '每组12次', rest: '45秒' },
          { name: '阻力带拉力', sets: '4组', duration: '每组12次', rest: '30秒' },
          { name: '快速登山者', sets: '3组', duration: '每组15次', rest: '30秒' },
        ],
      },
      {
        name: '爆发力训练 C套',
        category: '核心爆发',
        exercises: [
          { name: '跳箱训练', sets: '4组', duration: '每组6次', rest: '60秒' },
          { name: '药球下砸', sets: '4组', duration: '每组10次', rest: '45秒' },
          { name: '阻力带推举', sets: '4组', duration: '每组12次', rest: '30秒' },
          { name: '快速波比跳', sets: '3组', duration: '每组8次', rest: '45秒' },
        ],
      },
    ],
  },
  technique: {
    name: '技术训练',
    sets: [
      {
        name: '技术训练 A套',
        category: '划水技术',
        exercises: [
          { name: '单臂划水模仿', sets: '3组', duration: '每组15次', rest: '30秒' },
          { name: '拉伸带纠正', sets: '3组', duration: '每组12次', rest: '30秒' },
          { name: '肩部灵活性', sets: '3组', duration: '每组20秒', rest: '20秒' },
          { name: '自由泳腿模拟', sets: '3组', duration: '每组30秒', rest: '20秒' },
        ],
      },
      {
        name: '技术训练 B套',
        category: '身体协调',
        exercises: [
          { name: '双臂划水模仿', sets: '3组', duration: '每组12次', rest: '30秒' },
          { name: '拉伸带拉伸', sets: '3组', duration: '每组15次', rest: '30秒' },
          { name: '肩部旋转', sets: '3组', duration: '每组20次', rest: '20秒' },
          { name: '身体旋转训练', sets: '3组', duration: '每组10次', rest: '30秒' },
        ],
      },
      {
        name: '技术训练 C套',
        category: '整体技术',
        exercises: [
          { name: '单臂交替划水', sets: '3组', duration: '每组20次', rest: '30秒' },
          { name: '拉伸带拉伸', sets: '3组', duration: '每组15次', rest: '30秒' },
          { name: '肩部灵活性', sets: '3组', duration: '每组25秒', rest: '20秒' },
          { name: '全身协调训练', sets: '3组', duration: '每组30秒', rest: '30秒' },
        ],
      },
    ],
  },
  comprehensive: {
    name: '综合训练',
    sets: [
      {
        name: '协调性训练',
        category: '身体协调',
        exercises: [
          { name: '单腿硬拉触地', sets: '3组', duration: '每组8次', rest: '45秒' },
          { name: '平衡板训练', sets: '3组', duration: '每组30秒', rest: '30秒' },
          { name: '侧向移动', sets: '3组', duration: '每组20次', rest: '30秒' },
          { name: '脚踝灵活性', sets: '3组', duration: '每组15次', rest: '20秒' },
        ],
      },
      {
        name: '力量爆发训练',
        category: '爆发力',
        exercises: [
          { name: '药球下砸', sets: '4组', duration: '每组12次', rest: '60秒' },
          { name: '跳箱训练', sets: '4组', duration: '每组8次', rest: '60秒' },
          { name: '立定跳远', sets: '4组', duration: '每组6次', rest: '45秒' },
          { name: '阻力带爆发力', sets: '4组', duration: '每组10次', rest: '45秒' },
        ],
      },
      {
        name: '核心训练',
        category: '核心力量',
        exercises: [
          { name: '死虫式', sets: '3组', duration: '每组12次', rest: '45秒' },
          { name: '平板支撑', sets: '3组', duration: '每组45秒', rest: '30秒' },
          { name: '俄罗斯转体', sets: '3组', duration: '每组20次', rest: '30秒' },
          { name: '鸟狗式', sets: '3组', duration: '每组10次', rest: '30秒' },
        ],
      },
      {
        name: '综合协调训练',
        category: '全面协调',
        exercises: [
          { name: '复合训练', sets: '3组', duration: '每组8分钟', rest: '60秒' },
          { name: '核心+爆发', sets: '3组', duration: '每组5分钟', rest: '45秒' },
          { name: '技术+力量', sets: '3组', duration: '每组6分钟', rest: '45秒' },
          { name: '全身协调', sets: '3组', duration: '每组7分钟', rest: '60秒' },
        ],
      },
    ],
  },
};

interface GeneratedPlan {
  day: string;
  theme: string;
  totalDistance: string;
  intensity: string;
  waterTraining: { name: string; content: string; duration: string }[];
  drylandTraining?: { name: string; category: string; exercises: { name: string; sets: string; duration: string; rest: string }[] };
  restDay: boolean;
  trainingMode: string;
}

interface TrainingPlanGeneratorProps {
  onPlanGenerated?: (plan: GeneratedPlan[], recommendedCourse: any) => void;
}

export default function TrainingPlanGenerator({ onPlanGenerated }: TrainingPlanGeneratorProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    trainingDays: 6,
    goal: 'comprehensive',
    trainingMode: 'dryland',
  });
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedPlan[] | null>(null);
  const [recommendedCourse, setRecommendedCourse] = useState<any>(null);
  const { t, language } = useLanguage();
  const shareCardRef = useRef<HTMLDivElement>(null);
  const [isGeneratingShare, setIsGeneratingShare] = useState(false);

  // 生成分享图片
  const generateShareImage = async () => {
    if (!shareCardRef.current || !generatedPlan) {
      console.log('Share card ref or generated plan is missing');
      return;
    }

    setIsGeneratingShare(true);
    console.log('Starting to generate share image...');

    try {
      // 根据训练天数获取二维码尺寸
      const getQRCodeSize = (days: number) => {
        if (days <= 2) return 70;
        if (days <= 4) return 65;
        return 60;
      };

      const qrCodeSize = getQRCodeSize(formData.trainingDays);

      // 生成二维码
      const qrCanvas = document.getElementById('qrcode-canvas') as HTMLCanvasElement;
      if (qrCanvas) {
        console.log('Generating QR code with size:', qrCodeSize);
        try {
          await QRCode.toCanvas(qrCanvas, 'https://drylandswimlab.com', {
            width: qrCodeSize,
            margin: 1,
            color: {
              dark: '#000000',
              light: '#ffffff'
            }
          });
          console.log('QR code generated successfully');
        } catch (error) {
          console.error('Error generating QR code:', error);
        }
      }

      // 给更多时间让DOM完全渲染和二维码生成
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 获取实际的卡片元素
      const cardElement = shareCardRef.current.querySelector('div[style*="400px"]') as HTMLElement;
      if (!cardElement) {
        console.error('Card element not found');
        setIsGeneratingShare(false);
        alert(language === 'en' ? 'Card element not found' : '未找到卡片元素');
        return;
      }

      console.log('Card element found, dimensions:', cardElement.offsetWidth, cardElement.offsetHeight);

      // 强制重绘
      cardElement.offsetHeight; // 触发重排

      // 获取实际高度，限制最大高度为4000px
      const actualHeight = cardElement.offsetHeight;
      const maxHeight = 4000;
      const finalHeight = Math.min(actualHeight, maxHeight);

      console.log('Card dimensions:', cardElement.offsetWidth, actualHeight);
      console.log('Final dimensions for canvas:', 400, finalHeight);

      const htmlCanvas = await html2canvas(cardElement, {
        scale: 2, // 提高清晰度
        backgroundColor: null, // 不使用默认背景色，使用图片背景
        logging: true, // 启用日志用于调试
        useCORS: true,
        allowTaint: true,
        width: 400,
        height: finalHeight, // 使用实际高度，但限制最大4000px
        windowWidth: 400,
        windowHeight: finalHeight, // 窗口高度与实际高度一致
        foreignObjectRendering: false, // 禁用可能引起问题的功能
        imageTimeout: 10000, // 增加图片加载超时时间
        proxy: undefined, // 不使用代理
        scrollX: 0,
        scrollY: 0,
        onclone: (clonedDoc) => {
          // 确保克隆文档中的样式正确应用
          const clonedCard = clonedDoc.querySelector('div[style*="400px"]') as HTMLElement;
          if (clonedCard) {
            clonedCard.style.overflow = 'visible';
          }
        }
      });

      console.log('Canvas generated successfully, dimensions:', htmlCanvas.width, htmlCanvas.height);

      // 转换为图片并下载
      const dataUrl = htmlCanvas.toDataURL('image/png', 0.95);
      console.log('Data URL length:', dataUrl.length);

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `freestyle-training-plan-${formData.trainingDays}days.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log('Download completed');
      setIsGeneratingShare(false);

    } catch (error) {
      console.error('Error generating share image:', error);
      setIsGeneratingShare(false);
      // 显示错误提示给用户
      alert(language === 'en' ? 'Failed to generate share image. Please try again.' : '生成分享图片失败，请重试。');
    }
  };

  const handleGenerate = () => {
    // 根据语言选择训练计划模板
    const freestylePlans = language === 'en' ? freestylePlansEn : freestylePlansZh;
    const drylandExercises = language === 'en' ? drylandExercisesEn : drylandExercisesZh;

    const selectedPlans = freestylePlans.slice(0, formData.trainingDays);

    const plan: GeneratedPlan[] = selectedPlans.map((dayPlan, index) => {
      if (dayPlan.restDay) {
        return {
          ...dayPlan,
          restDay: true,
          trainingMode: formData.trainingMode,
        };
      }

      let drylandTraining = undefined;
      if (formData.trainingMode === 'dryland' || formData.trainingMode === 'both') {
        const exerciseSets = drylandExercises[formData.goal as keyof typeof drylandExercises].sets;
        drylandTraining = exerciseSets[index % exerciseSets.length];
      }

      return {
        day: dayPlan.day,
        theme: dayPlan.theme,
        totalDistance: dayPlan.totalDistance,
        intensity: dayPlan.intensity,
        waterTraining: formData.trainingMode === 'water' || formData.trainingMode === 'both' ? dayPlan.waterTraining : [],
        drylandTraining,
        restDay: false,
        trainingMode: formData.trainingMode,
      };
    });

    const freestyleCourse = lessons.find((l) => l.id === 'freestyle');

    setGeneratedPlan(plan);
    setRecommendedCourse(freestyleCourse);
    setStep(2);

    if (onPlanGenerated) {
      onPlanGenerated(plan, freestyleCourse);
    }
  };

  const resetForm = () => {
    setStep(1);
    setGeneratedPlan(null);
    setRecommendedCourse(null);
  };

  const getGoalText = (key: string, type: 'name' | 'description') => {
    if (language === 'en') {
      return t(`calc.goal.${key}.${type}`);
    }
    const zhGoals: Record<string, any> = {
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
    };
    return zhGoals[key]?.[type] || '';
  };

  const getModeText = (key: string, type: 'name' | 'description') => {
    if (language === 'en') {
      return t(`calc.mode.${key}.${type}`);
    }
    const zhModes: Record<string, any> = {
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
    };
    return zhModes[key]?.[type] || '';
  };

  const getIntensityLabel = (intensity: string) => {
    if (language === 'en') {
      if (intensity.includes('Low intensity')) return 'Low intensity';
      if (intensity.includes('Medium')) return 'Medium-high';
      if (intensity.includes('High intensity')) return 'High intensity';
    } else {
      if (intensity.includes('低')) return '低强度';
      if (intensity.includes('中')) return '中高强度';
      if (intensity.includes('高')) return '高强度';
    }
    return intensity;
  };

  const getStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">{t('calc.frequency.title')}</h2>
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {t('calc.frequency.label')} <span className="text-blue-600 font-bold">
                  {t('calc.frequency.days', { days: formData.trainingDays })}
                </span>
              </label>
              <input
                type="range"
                min="1"
                max="7"
                value={formData.trainingDays}
                onChange={(e) => setFormData({ ...formData, trainingDays: Number(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-4">
                <div className="text-center flex-1">
                  <div>{language === 'en' ? '1 day' : '1天'}</div>
                  <div className="text-[10px] text-gray-400">{language === 'en' ? 'Beginner' : '入门'}</div>
                </div>
                <div className="text-center flex-1">
                  <div>{language === 'en' ? '2 days' : '2天'}</div>
                  <div className="text-[10px] text-gray-400">{language === 'en' ? 'Light' : '轻量'}</div>
                </div>
                <div className="text-center flex-1">
                  <div>{language === 'en' ? '3 days' : '3天'}</div>
                  <div className="text-[10px] text-gray-400">{language === 'en' ? 'Regular' : '常规'}</div>
                </div>
                <div className="text-center flex-1">
                  <div>{language === 'en' ? '4 days' : '4天'}</div>
                  <div className="text-[10px] text-gray-400">{language === 'en' ? 'Moderate' : '中等'}</div>
                </div>
                <div className="text-center flex-1">
                  <div>{language === 'en' ? '5 days' : '5天'}</div>
                  <div className="text-[10px] text-gray-400">{language === 'en' ? 'High Intensity' : '高强度'}</div>
                </div>
                <div className="text-center flex-1">
                  <div>{language === 'en' ? '6 days' : '6天'}</div>
                  <div className="text-[10px] text-gray-400">{language === 'en' ? 'Professional' : '专业'}</div>
                </div>
                <div className="text-center flex-1">
                  <div>{language === 'en' ? '7 days' : '7天'}</div>
                  <div className="text-[10px] text-gray-400">{language === 'en' ? 'Extreme' : '极限'}</div>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-6 text-gray-900">{t('calc.mode.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {trainingModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setFormData({ ...formData, trainingMode: mode.id })}
                  className={`p-4 rounded-lg border-2 transition-all text-center ${
                    formData.trainingMode === mode.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="text-4xl mb-2">{mode.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-1">{getModeText(mode.id, 'name')}</h3>
                  <p className="text-xs text-gray-600">{getModeText(mode.id, 'description')}</p>
                </button>
              ))}
            </div>

            <h2 className="text-2xl font-bold mb-6 text-gray-900">{t('calc.goal.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trainingGoals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => setFormData({ ...formData, goal: goal.id })}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    formData.goal === goal.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <h3 className="font-semibold text-gray-900 mb-1">{getGoalText(goal.id, 'name')}</h3>
                  <p className="text-sm text-gray-600">{getGoalText(goal.id, 'description')}</p>
                </button>
              ))}
            </div>

            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-900">
                {t('calc.note')}
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">{t('calc.generated.title')}</h2>
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 mb-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-gray-600">{t('calc.generated.frequency')}</span>
                  <p className="font-bold text-gray-900">
                    {t('calc.generated.days', { days: formData.trainingDays })}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">{t('calc.generated.mode')}</span>
                  <p className="font-bold text-gray-900">
                    {getModeText(formData.trainingMode, 'name')}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">{t('calc.generated.goal')}</span>
                  <p className="font-bold text-gray-900">
                    {getGoalText(formData.goal, 'name')}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">{t('calc.generated.style')}</span>
                  <p className="font-bold text-gray-900">{language === 'en' ? 'Freestyle' : '自由泳'}</p>
                </div>
              </div>
            </div>

            {generatedPlan && (
              <div className="space-y-4 mb-8">
                {generatedPlan.map((day, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{day.day}</h3>
                        <p className="text-sm text-gray-600">{day.theme}</p>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium">
                          {day.restDay && (
                            <span className="bg-gray-100 text-gray-700">{language === 'en' ? 'Rest' : '休息'}</span>
                          )}
                          {!day.restDay && (
                            <span className={`${
                              day.intensity.includes('Low') ? 'bg-green-100 text-green-700' :
                              day.intensity.includes('Medium') ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {getIntensityLabel(day.intensity)}
                            </span>
                          )}
                        </span>
                      </div>
                    </div>

                    {!day.restDay && (
                      <>
                        <div className="flex gap-2 mb-3">
                          {day.trainingMode === 'water' && (
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                              🏊‍♂️ {language === 'en' ? 'Water Training' : '水下训练'}
                            </span>
                          )}
                          {day.trainingMode === 'dryland' && (
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                              💪 {language === 'en' ? 'Dryland Training' : '陆上训练'}
                            </span>
                          )}
                          {day.trainingMode === 'both' && (
                            <>
                              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                                🏊‍♂️ {language === 'en' ? 'Water Training' : '水下训练'}
                              </span>
                              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                                💪 {language === 'en' ? 'Dryland Training' : '陆上训练'}
                              </span>
                            </>
                          )}
                        </div>

                        <div className="space-y-2">
                          {(day.trainingMode === 'water' || day.trainingMode === 'both') && day.waterTraining.length > 0 && (
                            <>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">{t('calc.generated.distance')}</span>
                                <span className="font-medium">{day.totalDistance}</span>
                              </div>
                              <div className="border-t pt-2">
                                <p className="text-sm font-medium text-gray-700 mb-2">{t('calc.generated.water')}</p>
                                <div className="space-y-2">
                                  {day.waterTraining.map((water, wIndex) => (
                                    <div key={wIndex} className="bg-blue-50 p-2 rounded">
                                      <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                          <span className="font-medium text-blue-900">{water.name}</span>
                                          <p className="text-xs text-blue-800 mt-1">{water.content}</p>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </>
                          )}

                          {(day.trainingMode === 'dryland' || day.trainingMode === 'both') && day.drylandTraining && (
                            <div className={`${day.trainingMode === 'both' ? 'border-t pt-2 mt-2' : ''}`}>
                              <p className="text-sm font-medium text-gray-700 mb-2">
                                {t('calc.generated.dryland')} <span className="text-green-600">{day.drylandTraining.name}</span>
                              </p>
                              <div className="bg-green-50 p-2 rounded">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs font-medium">
                                    {day.drylandTraining.category}
                                  </span>
                                </div>
                                <div className="space-y-1">
                                  {day.drylandTraining.exercises.map((exercise, exIndex) => (
                                    <div key={exIndex} className="flex justify-between text-sm py-1 border-b border-green-100 last:border-0">
                                      <span className="text-green-800">{exercise.name}</span>
                                      <span className="text-green-600 text-xs">{exercise.sets} × {exercise.duration}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    )}

                    {day.restDay && (
                      <div className="bg-gray-50 p-3 rounded text-center">
                        <p className="text-gray-600">{t('calc.generated.rest')}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {recommendedCourse && (
              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">{t('calc.generated.recommend.title')}</h3>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-lg font-bold">{recommendedCourse.title}</h4>
                    <span className="text-2xl font-bold">{formatPrice(recommendedCourse.price)}</span>
                  </div>
                  <p className="mb-4 text-white/90">{recommendedCourse.description}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-white/20 px-3 py-1 rounded text-sm">
                      {t('calc.generated.recommend.sessions', {
                        sessions: recommendedCourse.sessions,
                        duration: recommendedCourse.sessionsDuration,
                      })}
                    </span>
                    <span className="bg-white/20 px-3 py-1 rounded text-sm">
                      {t('calc.generated.recommend.totalDuration', {
                        duration: formatDuration(recommendedCourse.video.duration),
                      })}
                    </span>
                  </div>
                  <a
                    href={`/paid/lesson/${recommendedCourse.id}`}
                    className="block w-full bg-white text-blue-600 text-center py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                  >
                    {t('calc.generated.recommend.viewDetails')}
                  </a>
                </div>
              </div>
            )}

            {/* 分享按钮 */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={generateShareImage}
                disabled={isGeneratingShare}
                className="flex-1 bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isGeneratingShare ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {language === 'en' ? 'Generating...' : '生成中...'}
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    {language === 'en' ? 'Share Plan' : '分享计划'}
                  </>
                )}
              </button>
            </div>

            <button
              onClick={resetForm}
              className="w-full mt-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {t('calc.generated.regenerate')}
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* 步骤内容 */}
      {getStepContent()}

      {/* 导航按钮 */}
      <div className="flex justify-between mt-8">
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {language === 'en' ? 'Previous' : '上一步'}
          </button>
        )}
        {step === 1 && (
          <button
            onClick={handleGenerate}
            className="ml-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {language === 'en' ? 'Generate Plan' : '生成计划'}
          </button>
        )}
      </div>

      {/* 隐藏的分享卡片 - 用于生成图片 */}
      {generatedPlan && (() => {
        // 根据训练天数自适应调整字号和间距
        const getStyles = (days: number) => {
          if (days <= 2) {
            return {
              brandFontSize: '24px',        // 放大主标题
              brandFontWeight: '800',       // 增加字重
              subFontSize: '12px',          // 副标题字号
              titleMargin: '4px',           // 缩小标题间距
              dayFontSize: '14px',          // 日期字号
              labelFontSize: '10px',        // 强度标签字号
              contentFontSize: '12px',      // 内容字号
              detailFontSize: '11px',       // 详细内容字号
              cardPadding: '12px',         // 增加卡片内边距
              cardGap: '8px',              // 增加卡片间距
              sectionGap: '6px',           // 模块标题与列表间距
              lineHeight: '1.5',           // 行高优化
              minHeight: '80px',           // 增加最小高度
              paramFontSize: '10px',      // 底部参数字号增大
              paramColor: 'rgba(255, 255, 255, 0.9)', // 柔和白色
              qrcodeSize: '60px'           // 二维码尺寸
            };
          } else if (days <= 4) {
            return {
              brandFontSize: '22px',        // 放大主标题
              brandFontWeight: '800',       // 增加字重
              subFontSize: '11px',          // 副标题字号
              titleMargin: '3px',           // 缩小标题间距
              dayFontSize: '13px',          // 日期字号
              labelFontSize: '9px',         // 强度标签字号
              contentFontSize: '11px',      // 内容字号
              detailFontSize: '10px',       // 详细内容字号
              cardPadding: '10px',         // 增加卡片内边距
              cardGap: '7px',              // 增加卡片间距
              sectionGap: '5px',           // 模块标题与列表间距
              lineHeight: '1.5',           // 行高优化
              minHeight: '70px',           // 增加最小高度
              paramFontSize: '9px',       // 底部参数字号增大
              paramColor: 'rgba(255, 255, 255, 0.9)', // 柔和白色
              qrcodeSize: '55px'           // 二维码尺寸
            };
          } else {
            return {
              brandFontSize: '20px',        // 放大主标题
              brandFontWeight: '800',       // 增加字重
              subFontSize: '10px',          // 副标题字号
              titleMargin: '2px',           // 缩小标题间距
              dayFontSize: '12px',          // 日期字号
              labelFontSize: '9px',         // 强度标签字号
              contentFontSize: '10px',      // 内容字号
              detailFontSize: '9px',        // 详细内容字号
              cardPadding: '10px',         // 增加卡片内边距
              cardGap: '6px',              // 增加卡片间距
              sectionGap: '5px',           // 模块标题与列表间距
              lineHeight: '1.5',           // 行高优化
              minHeight: '65px',           // 增加最小高度
              paramFontSize: '9px',       // 底部参数字号增大
              paramColor: 'rgba(255, 255, 255, 0.9)', // 柔和白色
              qrcodeSize: '50px'           // 二维码尺寸
            };
          }
        };

        const styles = getStyles(formData.trainingDays);

        return (
        <div ref={shareCardRef} className="fixed -top-[9999px] -left-[9999px]">
          <div
            style={{
              width: '400px',
              minHeight: '600px',
              maxHeight: '4000px', // 限制最大高度为4000px
              height: 'auto',
              backgroundImage: 'url(/background.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              fontFamily: 'Arial, sans-serif',
              position: 'relative',
              overflow: 'auto' // 内容超出时显示滚动条
            }}
          >
            {/* 品牌信息 */}
            <div style={{ textAlign: 'center', padding: '16px 12px 8px 12px', zIndex: 1 }}>
              <h2 style={{
                fontSize: styles.brandFontSize,
                fontWeight: styles.brandFontWeight,
                margin: 0,
                letterSpacing: '0.5px',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                lineHeight: '1.2'
              }}>
                DRYLAND SWIM LAB
              </h2>
              <p style={{
                fontSize: styles.subFontSize,
                opacity: 0.95,
                margin: `${styles.titleMargin} 0 0 0`,
                textShadow: '0 1px 3px rgba(0,0,0,0.3)',
                fontWeight: '500',
                letterSpacing: '0.3px'
              }}>
                {language === 'en' ? 'Freestyle Training Plan' : '自由泳训练计划'}
              </p>
            </div>

            {/* 训练计划内容 - 极简长图布局 */}
            <div
              style={{
                padding: '0 16px', // 增加左右留白
                zIndex: 1,
                textAlign: 'left' // 左对齐更现代
              }}
            >
              {/* 所有训练计划 */}
              {generatedPlan.map((day, index) => (
                <div key={index} style={{
                  padding: `${styles.cardPadding}px 0`,
                  borderBottom: index < generatedPlan.length - 1 ? '1px solid rgba(255, 255, 255, 0.15)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center',
                  minHeight: styles.minHeight
                }}>
                  {/* 极简基准线标题栏 */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px',
                    height: '24px'
                  }}>
                    {/* 左侧日期 - 纯白色大字加粗 */}
                    <div style={{
                      fontWeight: '700',
                      fontSize: styles.dayFontSize,
                      color: '#ffffff',
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                      letterSpacing: '0.5px',
                      minWidth: '50px',
                      textAlign: 'left'
                    }}>
                      {day.day}
                    </div>

                    {/* 右侧强度 - 极简微型胶囊或纯文本 */}
                    {!day.restDay && (
                      <div style={{
                        fontSize: styles.labelFontSize,
                        fontWeight: '500',
                        color: 'rgba(255, 255, 255, 0.85)',
                        letterSpacing: '0.3px',
                        textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                        padding: '0 8px',
                        background: day.intensity.includes('Low')
                          ? 'rgba(74, 222, 128, 0.1)'
                          : day.intensity.includes('Medium')
                          ? 'rgba(250, 204, 21, 0.1)'
                          : 'rgba(239, 68, 68, 0.1)',
                        borderRadius: '12px'
                      }}>
                        {getIntensityLabel(day.intensity)}
                      </div>
                    )}
                  </div>

                  {!day.restDay ? (
                    <div style={{ flex: 1, fontSize: styles.contentFontSize, opacity: 0.95, lineHeight: styles.lineHeight }}>
                      <p style={{ margin: '6px 0 3px 0', fontWeight: '700', letterSpacing: '0.3px', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
                        🎯 {day.theme}
                      </p>
                      <p style={{ margin: '3px 0 8px 0', opacity: 0.85, fontWeight: '500', letterSpacing: '0.2px' }}>
                        📊 {day.totalDistance}
                      </p>

                      {/* 兼顾训练模式 - 并排显示水下和陆上训练 */}
                      {day.trainingMode === 'both' && day.waterTraining.length > 0 && day.drylandTraining && (
                        <div style={{ display: 'flex', gap: '12px', marginTop: styles.sectionGap }}>
                          {/* 水下训练 */}
                          <div style={{ flex: 1, fontSize: styles.detailFontSize, opacity: 0.8 }}>
                            <div style={{ marginBottom: '6px', opacity: 0.6, fontWeight: '600', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                              🏊‍♂️ {language === 'en' ? 'Water' : '水下'}
                            </div>
                            {day.waterTraining.map((water, wIndex) => (
                              <div key={wIndex} style={{ marginBottom: '3px', lineHeight: '1.4', paddingLeft: '8px' }}>
                                • {water.name}: {water.content}
                              </div>
                            ))}
                          </div>
                          {/* 陆上训练 */}
                          <div style={{ flex: 1, fontSize: styles.detailFontSize, opacity: 0.8 }}>
                            <div style={{ marginBottom: '6px', opacity: 0.6, fontWeight: '600', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                              💪 {language === 'en' ? 'Dryland' : '陆上'}
                            </div>
                            {day.drylandTraining.exercises.slice(0, 3).map((exercise, exIndex) => (
                              <div key={exIndex} style={{ marginBottom: '3px', lineHeight: '1.4', paddingLeft: '8px' }}>
                                • {exercise.name} ({exercise.sets})
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 单一水下训练 */}
                      {day.trainingMode === 'water' && day.waterTraining.length > 0 && (
                        <div style={{ marginTop: styles.sectionGap, fontSize: styles.detailFontSize, opacity: 0.8 }}>
                          <div style={{ marginBottom: '6px', opacity: 0.6, fontWeight: '600', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                            🏊‍♂️ {language === 'en' ? 'Water Training' : '水下训练'}
                          </div>
                          {day.waterTraining.map((water, wIndex) => (
                            <div key={wIndex} style={{ paddingLeft: '8px', marginBottom: '3px', lineHeight: '1.4' }}>
                              • {water.name}: {water.content}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* 单一陆上训练 */}
                      {day.trainingMode === 'dryland' && day.drylandTraining && (
                        <div style={{ marginTop: styles.sectionGap, fontSize: styles.detailFontSize, opacity: 0.8 }}>
                          <div style={{ marginBottom: '6px', opacity: 0.6, fontWeight: '600', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                            💪 {day.drylandTraining.name}
                          </div>
                          {day.drylandTraining.exercises.map((exercise, exIndex) => (
                            <div key={exIndex} style={{ paddingLeft: '8px', marginBottom: '3px', lineHeight: '1.4' }}>
                              • {exercise.name} ({exercise.sets})
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div style={{
                      textAlign: 'center',
                      fontSize: styles.contentFontSize,
                      marginTop: '4px',
                      opacity: 0.7,
                      fontWeight: '500',
                      letterSpacing: '0.3px'
                    }}>
                      🏠 {language === 'en' ? 'Rest Day' : '休息日'}
                    </div>
                  )}
                </div>
              ))}

            </div>

            {/* 参数信息 - 放在下方，优化样式 */}
            <div style={{
              padding: '12px 16px',
              fontSize: styles.paramFontSize,
              textAlign: 'center',
              color: styles.paramColor,
              zIndex: 1,
              borderTop: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(0, 0, 0, 0.15)',
              backdropFilter: 'blur(8px)',
              fontWeight: '500',
              letterSpacing: '0.3px',
              marginTop: 'auto'
            }}>
              {language === 'en'
                ? `🏊 ${formData.trainingDays} days/week · ${getGoalText(formData.goal, 'name')} · ${getModeText(formData.trainingMode, 'name')} · Freestyle`
                : `🏊 ${formData.trainingDays}天/周 · ${getGoalText(formData.goal, 'name')} · ${getModeText(formData.trainingMode, 'name')} · 自由泳`
              }
            </div>

            {/* 底部区域 - 品牌名和二维码 */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              zIndex: 1,
              background: 'rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(8px)'
            }}>
              {/* 品牌名 */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '10px',
                  opacity: 0.6,
                  fontWeight: '500',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase'
                }}>
                  {language === 'en' ? 'PROFESSIONAL TRAINING' : '专业训练'}
                </div>
                <div style={{
                  fontSize: '8px',
                  opacity: 0.4,
                  marginTop: '2px',
                  letterSpacing: '0.3px'
                }}>
                  {language === 'en' ? 'CUSTOMIZE YOUR PLAN' : '定制你的专属计划'}
                </div>
              </div>

              {/* 二维码 */}
              <div style={{
                textAlign: 'center',
                marginLeft: '12px'
              }}>
                <canvas id="qrcode-canvas" style={{
                  width: styles.qrcodeSize,
                  height: styles.qrcodeSize,
                  display: 'block',
                  borderRadius: '4px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }} />
                <div style={{
                  fontSize: '7px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontWeight: '500',
                  marginTop: '4px',
                  textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                  lineHeight: '1.3',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.2px'
                }}>
                  {language === 'en' ? 'Scan to customize' : '扫码定制你的专属计划'}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      })()}
    </div>
  );
}

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}