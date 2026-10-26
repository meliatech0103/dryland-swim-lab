'use client';

import { useState, useRef } from 'react';
import { lessons, formatPrice } from '@/lib/lessons';
import { useLanguage } from '@/lib/LanguageContext';
import html2canvas from 'html2canvas';
import Icon, { type IconName } from '@/components/Icon';

// ─── 游泳分享摘要结构 ──────────────────────────────
type SwimPhase = 'warm-up' | 'main-set' | 'technique' | 'cool-down' | 'interval';

interface SwimShareBlock {
  phase: SwimPhase;
  label: string;       // 大写阶段标签，如 "MAIN SET"
  distance?: string;   // "2000m", "4 × 100m"
  stroke?: string;     // "Freestyle"
  details?: string[];  // 间歇/配速/休息分行
}

// 英文游泳每日分享摘要（按天索引 0=Mon ... 6=Sun）
const swimShareEn: SwimShareBlock[][] = [
  // Monday
  [
    { phase: 'main-set', label: 'MAIN SET', distance: '2000m', stroke: 'Freestyle', details: ['Steady pace'] },
  ],
  // Tuesday
  [
    { phase: 'main-set', label: 'MAIN SET', distance: '4 × (3 × 100m)', stroke: 'Freestyle', details: ['85% / 90% / 100% threshold pace', 'Rest = training time per set'] },
    { phase: 'technique', label: 'TECHNIQUE', distance: '4 × 50m + 4 × 50m', stroke: 'Pull buoy + flutter kick' },
  ],
  // Wednesday
  [
    { phase: 'main-set', label: 'MAIN SET', distance: '6 × 200m', stroke: 'Freestyle', details: ['Descending pace', '1 min rest between sets'] },
    { phase: 'technique', label: 'TECHNIQUE', distance: '4 × 50m', stroke: 'Flutter kick + flip turns + dive starts' },
  ],
  // Thursday
  [
    { phase: 'main-set', label: 'MAIN SET', distance: '400m + 300m + 400m + 300m', stroke: 'Freestyle + breaststroke/backstroke', details: ['Steady pace'] },
  ],
  // Friday
  [
    { phase: 'main-set', label: 'MAIN SET', stroke: 'Freestyle', details: ['1 × 400m · Threshold pace PB+10s · 2 min rest', '2 × 200m · Threshold pace PB+5s · 1 min rest', '4 × 100m · All-out sprint · 45 s rest'] },
  ],
  // Saturday
  [
    { phase: 'main-set', label: 'MAIN SET', distance: '3 × 400m', stroke: 'Freestyle', details: ['All-out', '3 min rest between sets', 'Record each set data'] },
    { phase: 'technique', label: 'TECHNIQUE', distance: '4 × 50m', stroke: 'Technique/pace alternating' },
  ],
  // Sunday
  [],
];

// 中文游泳每日分享摘要
const swimShareZh: SwimShareBlock[][] = [
  [ { phase: 'main-set', label: '主项', distance: '2000m', stroke: '自由泳', details: ['恒定配速'] } ],
  [ { phase: 'main-set', label: '主项', distance: '4 × (3 × 100m)', stroke: '自由泳', details: ['每组分别阈值配速85%/90%/100%', '休息时间=每组训练时间'] }, { phase: 'technique', label: '技术补偿', distance: '4 × 50m + 4 × 50m', stroke: '夹板划手+浮板打腿' } ],
  [ { phase: 'main-set', label: '主项', distance: '6 × 200m', stroke: '自由泳', details: ['配速递减', '组间休息1min'] }, { phase: 'technique', label: '技术补偿', distance: '4 × 50m', stroke: '浮板打腿+滚翻蹬边+跳发' } ],
  [ { phase: 'main-set', label: '主项', distance: '400m + 300m + 400m + 300m', stroke: '自由泳+蛙泳/仰泳', details: ['恒定配速'] } ],
  [ { phase: 'main-set', label: '主项', stroke: '自由泳', details: ['1 × 400m · 阈值配速PB+10s · 休息2min', '2 × 200m · 阈值配速PB+5s · 组间休息1min', '4 × 100m · 全力冲 · 组间休息45s'] } ],
  [ { phase: 'main-set', label: '主项', distance: '3 × 400m', stroke: '自由泳', details: ['全力游', '组间休息3min', '记录每组数据'] }, { phase: 'technique', label: '技术补偿', distance: '4 × 50m', stroke: '技术/节奏交替' } ],
  [],
];

// 训练目的选项
const trainingGoals = [
  { id: 'endurance', name: 'endurance', description: 'endurance' },
  { id: 'speed', name: 'speed', description: 'speed' },
  { id: 'technique', name: 'technique', description: 'technique' },
  { id: 'comprehensive', name: 'comprehensive', description: 'comprehensive' },
];

// 训练模式选项
const trainingModes = [
  { id: 'water', icon: 'water' as IconName },
  { id: 'dryland', icon: 'strength' as IconName },
  { id: 'both', icon: 'target' as IconName },
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

const posterTheme = {
  canvasWidth: 1024,
  canvasHeight: 1536,
  exportScale: 2, // 2048×3072 导出

  ink: '#071a33',
  glass: 'rgba(8, 43, 69, 0.62)',
  line: 'rgba(206, 245, 255, 0.72)',
  aqua: '#70e8e8',
  panelRadius: '22px',
  cardRadius: '15px',
  panelShadow: '0 14px 40px rgba(2, 12, 28, 0.22)',

  // 固定 MON–SUN 配色（不再按 index 循环）
  dayAccents: {
    mon: '#5de8e2',   // aqua/turquoise
    tue: '#ff9298',   // coral/pink
    wed: '#91c8ff',   // light blue
    thu: '#ffd06d',   // warm gold
    fri: '#5de8e2',   // aqua/turquoise
    sat: '#ce9cff',   // lavender/purple
    sun: '#a0b8d0',   // soft cool
  },
} as const;

// ─── 星期→配色映射 ────────────────────────────────
const dayKeyMap: Record<string, keyof typeof posterTheme.dayAccents> = {
  monday: 'mon', tuesday: 'tue', wednesday: 'wed', thursday: 'thu',
  friday: 'fri', saturday: 'sat', sunday: 'sun',
  '周一': 'mon', '周二': 'tue', '周三': 'wed', '周四': 'thu',
  '周五': 'fri', '周六': 'sat', '周日': 'sun',
};

function accentForDay(day: string): string {
  const key = dayKeyMap[day.toLowerCase()];
  return posterTheme.dayAccents[key ?? 'mon'];
}

// ─── 核心动作摘录（每天最多 3 项） ──────────────────
interface ShareHighlight {
  name: string;
  detail: string;
}

function shareHighlights(day: GeneratedPlan, lang: 'en' | 'zh'): ShareHighlight[] {
  if (day.restDay) return [];

  const excludePats = lang === 'en'
    ? ['warm-up', 'cool-down', 'warm up', 'cool down', 'technical compensation']
    : ['热身', '放松', '技术补偿'];
  const isExcluded = (name: string) =>
    excludePats.some(pat => name.toLowerCase().includes(pat));

  // 优先陆上训练
  if (day.drylandTraining) {
    const main = day.drylandTraining.exercises.filter(ex => !isExcluded(ex.name));
    const drylandItems = main.map(ex => ({
      name: ex.name,
      detail: compactDetail(ex.sets, ex.duration),
    }));
    if (drylandItems.length >= 3) return drylandItems.slice(0, 3);
    // 陆上不足 3 个，用水上非热身补位
    const waterCore = (day.waterTraining ?? [])
      .filter(w => !isExcluded(w.name))
      .map(w => ({ name: w.name, detail: w.content }));
    return [...drylandItems, ...waterCore].slice(0, 3);
  }

  // 纯水上：排除热身/放松，取前 3
  if (day.waterTraining && day.waterTraining.length > 0) {
    return day.waterTraining
      .filter(w => !isExcluded(w.name))
      .slice(0, 3)
      .map(w => ({ name: w.name, detail: w.content }));
  }

  return [];
}

// 紧凑训练量格式：'4 sets' + '10 reps per set' → '4 × 10 reps'
function compactDetail(sets: string, duration: string): string {
  const numFrom = (s: string) => s.match(/\d+/)?.[0] ?? '';
  const unitFrom = (s: string) => {
    const low = s.toLowerCase();
    if (low.includes('rep')) return 'reps';
    if (low.includes('min')) return 'min';
    if (low.includes('sec') || low.includes('s per')) return 's';
    return '';
  };
  const sNum = numFrom(sets);
  const dNum = numFrom(duration);
  const dUnit = unitFrom(duration);
  if (sNum && dNum && dUnit) return `${sNum} × ${dNum} ${dUnit}`;
  // 无法紧凑化时回退
  if (sNum && duration) return `${sNum} × ${duration}`;
  return `${sets} · ${duration}`;
}

// ─── 密度分级 ──────────────────────────────────────
type Density = 'generous' | 'standard' | 'compact';

function getDensity(dayCount: number): Density {
  if (dayCount <= 2) return 'generous';
  if (dayCount <= 4) return 'standard';
  return 'compact';
}

// ─── 网格布局 ──────────────────────────────────────
interface GridConfig {
  columns: number;
  lastCardCentered: boolean;  // 奇数天最后一张居中，等宽不跨列
  gap: string;
}

function getGridLayout(dayCount: number, density: Density): GridConfig {
  const lastCardCentered = dayCount >= 3 && dayCount % 2 === 1;
  const columns = 2; // 始终 2 列网格，1 天居中卡片宽度 ≈ 单列宽
  const gapMap: Record<Density, string> = {
    generous: '16px 16px',
    standard: '12px 12px',
    compact: '8px 8px',
  };
  return { columns, lastCardCentered, gap: gapMap[density] };
}

// ─── 间距/字号缩放表（适配 1024×1536 画布） ────────
const spacingScales: Record<Density, {
  panelPadding: string;
  cardPadding: string;
  cardMinHeight: string;
  cardTitleFontSize: string;
  cardDetailFontSize: string;
  cardDetailLineHeight: number;
  accentBarWidth: string;
  panelHeaderTitleSize: string;
  panelHeaderSubtitleSize: string;
  footerFontSize: string;
}> = {
  generous: {
    panelPadding: '24px 28px 20px',
    cardPadding: '16px 20px 16px 24px',
    cardMinHeight: '155px',
    cardTitleFontSize: '18px',
    cardDetailFontSize: '15px',
    cardDetailLineHeight: 1.45,
    accentBarWidth: '6px',
    panelHeaderTitleSize: '30px',
    panelHeaderSubtitleSize: '13px',
    footerFontSize: '13px',
  },
  standard: {
    panelPadding: '20px 26px 16px',
    cardPadding: '13px 17px 13px 22px',
    cardMinHeight: '128px',
    cardTitleFontSize: '16px',
    cardDetailFontSize: '14px',
    cardDetailLineHeight: 1.4,
    accentBarWidth: '5px',
    panelHeaderTitleSize: '27px',
    panelHeaderSubtitleSize: '12px',
    footerFontSize: '12px',
  },
  compact: {
    panelPadding: '16px 22px 14px',
    cardPadding: '10px 14px 10px 18px',
    cardMinHeight: '105px',
    cardTitleFontSize: '15px',
    cardDetailFontSize: '13px',
    cardDetailLineHeight: 1.35,
    accentBarWidth: '4px',
    panelHeaderTitleSize: '24px',
    panelHeaderSubtitleSize: '11px',
    footerFontSize: '11px',
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
    trainingDays: 3,
    experience: 'beginner',
    sessionMinutes: 45,
    goal: 'comprehensive',
    trainingMode: 'both',
  });
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedPlan[] | null>(null);
  const [recommendedCourse, setRecommendedCourse] = useState<any>(null);
  const { t, language } = useLanguage();
  const shareCardRef = useRef<HTMLDivElement>(null);
  const [isGeneratingShare, setIsGeneratingShare] = useState(false);

  // 生成分享图片（4:5 海报 800×1000，导出 1600×2000）
  const generateShareImage = async () => {
    if (!shareCardRef.current || !generatedPlan) return;

    setIsGeneratingShare(true);

    try {
      // 等待背景图和海报 DOM 渲染完成
      await new Promise(resolve => setTimeout(resolve, 300));

      const cardElement = shareCardRef.current.querySelector(
        '[data-training-share-poster]'
      ) as HTMLElement;
      if (!cardElement) {
        setIsGeneratingShare(false);
        alert(language === 'en' ? 'Card element not found' : '未找到卡片元素');
        return;
      }

      // 强制重排
      cardElement.offsetHeight;

      const htmlCanvas = await html2canvas(cardElement, {
        scale: posterTheme.exportScale,
        backgroundColor: null,
        logging: false,
        useCORS: true,
        allowTaint: true,
        width: posterTheme.canvasWidth,
        height: posterTheme.canvasHeight,
        windowWidth: posterTheme.canvasWidth,
        windowHeight: posterTheme.canvasHeight,
        foreignObjectRendering: false,
        imageTimeout: 10000,
        scrollX: 0,
        scrollY: 0,
        onclone: (clonedDoc) => {
          const clonedCard = clonedDoc.querySelector(
            '[data-training-share-poster]'
          ) as HTMLElement;
          if (clonedCard) {
            clonedCard.style.overflow = 'hidden';
          }
        },
      });

      const dataUrl = htmlCanvas.toDataURL('image/png', 0.95);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `freestyle-training-plan-${formData.trainingDays}days.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsGeneratingShare(false);
    } catch (error) {
      console.error('Error generating share image:', error);
      setIsGeneratingShare(false);
      alert(
        language === 'en'
          ? 'Failed to generate share image. Please try again.'
          : '生成分享图片失败，请重试。'
      );
    }
  };

  const handleGenerate = () => {
    // 根据语言选择训练计划模板
    const freestylePlans = language === 'en' ? freestylePlansEn : freestylePlansZh;
    const drylandExercises = language === 'en' ? drylandExercisesEn : drylandExercisesZh;
    const activeTemplates = freestylePlans.filter((day) => !day.restDay);
    const scheduleByFrequency: Record<number, number[]> = {
      1: [2],
      2: [1, 4],
      3: [0, 2, 4],
      4: [0, 1, 3, 5],
      5: [0, 1, 2, 4, 5],
      6: [0, 1, 2, 3, 4, 5],
    };
    const selectedWeekdays = new Set(scheduleByFrequency[formData.trainingDays] ?? scheduleByFrequency[3]);
    const timeFactor = formData.sessionMinutes === 30 ? 0.7 : formData.sessionMinutes === 60 ? 1.25 : 1;
    const experienceVolume = formData.experience === 'beginner' ? 0.85 : formData.experience === 'intermediate' ? 1 : 1.1;
    const waterVolumeFactor = timeFactor * experienceVolume;
    const setFactor = formData.experience === 'beginner' ? 0.6 : formData.experience === 'intermediate' ? 0.8 : 1;
    const maxExercises = formData.sessionMinutes === 30 ? 3 : 4;
    const scaleDistance = (value: string) => value.replace(/(\d+)m(?![a-z])/gi, (_match, rawDistance: string) => {
      const distance = Number(rawDistance);
      return `${Math.max(50, Math.round((distance * waterVolumeFactor) / 50) * 50)}m`;
    });
    const scaleSetCount = (value: string) => value.replace(/(^|[^\d])(\d+)(\s*sets|\s*组)/i, (_match, prefix: string, rawCount: string, unit: string) => {
      const count = Math.max(1, Math.round(Number(rawCount) * setFactor));
      return `${prefix}${count}${unit}`;
    });

    let trainingSlot = 0;
    const plan: GeneratedPlan[] = freestylePlans.map((calendarDay, weekdayIndex) => {
      if (!selectedWeekdays.has(weekdayIndex) || calendarDay.restDay) {
        return {
          day: calendarDay.day,
          theme: language === 'en' ? 'Recovery and mobility' : '恢复与灵活性练习',
          totalDistance: '',
          intensity: '',
          waterTraining: [],
          restDay: true,
          trainingMode: formData.trainingMode,
        };
      }

      const templateIndex = formData.trainingDays === 1
        ? Math.floor(activeTemplates.length / 2)
        : Math.round((trainingSlot * (activeTemplates.length - 1)) / (formData.trainingDays - 1));
      const template = activeTemplates[templateIndex];
      trainingSlot += 1;

      let drylandTraining: GeneratedPlan['drylandTraining'];
      if (formData.trainingMode === 'dryland' || formData.trainingMode === 'both') {
        const exerciseSets = drylandExercises[formData.goal as keyof typeof drylandExercises].sets;
        const exerciseSet = exerciseSets[(trainingSlot - 1) % exerciseSets.length];
        drylandTraining = {
          ...exerciseSet,
          exercises: exerciseSet.exercises.slice(0, maxExercises).map((exercise) => ({
            ...exercise,
            sets: scaleSetCount(exercise.sets),
          })),
        };
      }

      const includeWater = formData.trainingMode === 'water' || formData.trainingMode === 'both';
      return {
        day: calendarDay.day,
        theme: formData.trainingMode === 'dryland'
          ? (language === 'en' ? 'Dryland Training' : '陆上训练')
          : template.theme,
        totalDistance: formData.trainingMode === 'dryland' ? '' : scaleDistance(template.totalDistance ?? ''),
        intensity: template.intensity ?? '',
        waterTraining: includeWater
          ? (template.waterTraining ?? []).map((item) => ({ ...item, content: scaleDistance(item.content) }))
          : [],
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
                max="6"
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
                  <div className="text-[10px] text-gray-400">{language === 'en' ? 'Advanced' : '进阶'}</div>
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
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700"><Icon name={mode.icon} className="h-6 w-6" /></div>
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
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
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
                            <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                              <Icon name="water" className="h-3.5 w-3.5" />
                              {language === 'en' ? 'Water Training' : '水下训练'}
                            </span>
                          )}
                          {day.trainingMode === 'dryland' && (
                            <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                              <Icon name="strength" className="h-3.5 w-3.5" />
                              {language === 'en' ? 'Dryland Training' : '陆上训练'}
                            </span>
                          )}
                          {day.trainingMode === 'both' && (
                            <>
                              <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                                <Icon name="water" className="h-3.5 w-3.5" />
                                {language === 'en' ? 'Water Training' : '水下训练'}
                              </span>
                              <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                                <Icon name="strength" className="h-3.5 w-3.5" />
                                {language === 'en' ? 'Dryland Training' : '陆上训练'}
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
                    <h4 className="text-lg font-bold">{typeof recommendedCourse.title === 'string' ? recommendedCourse.title : recommendedCourse.title[language]}</h4>
                    <span className="text-2xl font-bold">{formatPrice(recommendedCourse.price)}</span>
                  </div>
                  <p className="mb-4 text-white/90">{typeof recommendedCourse.description === 'string' ? recommendedCourse.description : recommendedCourse.description[language]}</p>
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

      {/* 分享海报：2:3 画布 1024×1536，下半部训练面板，数据与样式分离 */}
      {generatedPlan && (() => {
        // Keep the saved poster layout focused on workout sessions; the on-page plan still shows recovery days.
        const posterDays = generatedPlan.filter((day) => !day.restDay);
        const dayCount = posterDays.length;
        const density = getDensity(dayCount);
        const grid = getGridLayout(dayCount, density);
        const sp = spacingScales[density];

        // 中英文短标签
        const shortDay = (day: string) => {
          if (/[一-鿿]/.test(day)) return day;
          return day.length > 3 ? day.slice(0, 3).toUpperCase() : day.toUpperCase();
        };

        // 面板标题（双语）
        const weekTitle = language === 'en'
          ? `YOUR WEEK / ${formData.trainingDays} SESSIONS`
          : `训练周 / ${formData.trainingDays} 次训练`;

        // 副标题按训练模式
        const isSwimMode = formData.trainingMode === 'water' || formData.trainingMode === 'both';
        const subtitle = language === 'en'
          ? (isSwimMode ? 'FREESTYLE · SWIM TRAINING' : 'FREESTYLE · DRYLAND · COMPREHENSIVE IMPROVEMENT')
          : (isSwimMode ? '自由泳 · 水下训练' : '自由泳 · 陆上 · 综合提升');

        // 获取游泳摘要数据
        const swimShareData = language === 'en' ? swimShareEn : swimShareZh;

        // 休息日判断
        const hasRestDay = generatedPlan.some(d => d.restDay);
        const restLabel = hasRestDay
          ? (language === 'en' ? 'SUN · RECOVER & RESET' : '周日 · 恢复与重置')
          : (language === 'en' ? 'RECOVERY COUNTS' : '恢复同样重要');
        const footerLabel = language === 'en'
          ? 'Save this week · Share your swim'
          : '保存这周 · 分享你的游泳';

        // 奇数天或 1 天：拆分前后两组
        const isOddLast = grid.lastCardCentered;
        const isSingleDay = dayCount === 1;
        const frontDays = isOddLast ? posterDays.slice(0, -1) : posterDays;
        const lastDay = (isOddLast || isSingleDay) ? posterDays[posterDays.length - 1] : null;
        // 1 天时 frontDays 为空（全走居中卡片），奇数天时前面满 2 列
        const effectiveFrontDays = isSingleDay ? [] : frontDays;

        // 渲染单张卡片
        const renderCard = (day: GeneratedPlan, index: number, isCenteredLast = false) => {
          const accent = accentForDay(day.day);
          const highlights = shareHighlights(day, language);

          return (
            <article key={`${day.day}-${index}`} style={{
              position: 'relative',
              minHeight: day.restDay ? 'auto' : sp.cardMinHeight,
              padding: sp.cardPadding,
              overflow: 'hidden', boxSizing: 'border-box',
              border: '1px solid rgba(211,242,255,0.40)',
              borderRadius: posterTheme.cardRadius,
              background: `linear-gradient(160deg, rgba(10,38,68,0.75), rgba(8,30,55,0.82) 50%, rgba(6,26,48,0.88))`,
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
              ...(isCenteredLast ? { maxWidth: isSingleDay ? '65%' : '48%', margin: '0 auto' } : {}),
            }}>
              {/* 左 accent 色条 */}
              <span style={{
                position: 'absolute', top: '8px', bottom: '8px', left: 0,
                width: sp.accentBarWidth, borderRadius: '0 6px 6px 0',
                background: accent,
              }} />

              {/* 卡片标题行 */}
              <div style={{
                position: 'relative',
                display: 'flex', alignItems: 'center', gap: '10px',
                marginBottom: '8px',
              }}>
                <span style={{
                  display: 'inline-flex', justifyContent: 'center', alignItems: 'center',
                  minWidth: '68px', height: '30px', padding: '0 10px',
                  boxSizing: 'border-box',
                  borderRadius: '16px 16px 16px 4px',
                  color: '#0e2a40', background: accent,
                  fontSize: sp.cardTitleFontSize, lineHeight: 1,
                  fontWeight: 700, letterSpacing: '0.5px',
                }}>
                  {shortDay(day.day)}
                </span>
                {!day.restDay && (
                  <span style={{
                    color: 'rgba(190,220,240,0.80)',
                    fontSize: density === 'compact' ? '10px' : '11px',
                    lineHeight: 1.2, fontWeight: 500,
                    letterSpacing: '0.3px', textTransform: 'uppercase',
                  }}>
                    {day.drylandTraining?.category || day.theme} · {getIntensityLabel(day.intensity)}
                  </span>
                )}
              </div>

              {/* 训练内容：游泳模式按阶段纵向排版，陆上模式按动作列表 */}
              {day.restDay ? (
                <div style={{
                  position: 'relative', margin: '12px 4px',
                  color: 'rgba(255,255,255,0.90)', fontSize: sp.cardDetailFontSize,
                }}>
                  {day.theme}
                </div>
              ) : isSwimMode ? (
                /* 游泳阶段块：MAIN SET 优先，然后 TECHNIQUE */
                <div style={{ position: 'relative' }}>
                  {(() => {
                    // 从预定义摘要取当天数据，按 day index
                    const dayIdx = generatedPlan.indexOf(day);
                    const blocks = dayIdx >= 0 && dayIdx < swimShareData.length
                      ? swimShareData[dayIdx] : [];
                    if (blocks.length === 0) {
                      // 回退：使用 shareHighlights
                      return highlights.map((hl, hlIdx) => (
                        <div key={hlIdx} style={{
                          margin: '4px 0', fontSize: sp.cardDetailFontSize,
                          lineHeight: sp.cardDetailLineHeight,
                          color: 'rgba(250,253,255,0.90)',
                        }}>{hl.name} · {hl.detail}</div>
                      ));
                    }
                    return blocks.map((block, bIdx) => (
                      <div key={bIdx} style={{
                        marginBottom: bIdx < blocks.length - 1 ? '8px' : '0',
                        paddingTop: bIdx > 0 ? '6px' : '0',
                        borderTop: bIdx > 0 ? '1px solid rgba(180,220,255,0.12)' : 'none',
                      }}>
                        {/* 阶段标签 */}
                        <div style={{
                          fontSize: density === 'compact' ? '9px' : '10px',
                          fontWeight: 700, letterSpacing: '1.2px',
                          color: 'rgba(180,230,255,0.70)',
                          textTransform: 'uppercase', marginBottom: '3px',
                        }}>
                          {block.label}
                        </div>
                        {/* 距离 + 泳姿 */}
                        {block.distance && (
                          <div style={{
                            fontSize: sp.cardDetailFontSize,
                            fontWeight: 700, lineHeight: 1.3,
                            color: 'rgba(120,232,236,0.95)',
                          }}>
                            {block.distance}{block.stroke ? ` · ${block.stroke}` : ''}
                          </div>
                        )}
                        {/* 仅泳姿（无距离时） */}
                        {!block.distance && block.stroke && (
                          <div style={{
                            fontSize: sp.cardDetailFontSize,
                            fontWeight: 700, lineHeight: 1.3,
                            color: 'rgba(120,232,236,0.95)',
                          }}>
                            {block.stroke}
                          </div>
                        )}
                        {/* 间歇/配速/休息细节 */}
                        {block.details && block.details.map((line, lIdx) => (
                          <div key={lIdx} style={{
                            fontSize: density === 'compact' ? '11px' : '12px',
                            lineHeight: 1.35,
                            color: 'rgba(210,235,255,0.82)',
                            marginTop: '2px',
                          }}>
                            {line}
                          </div>
                        ))}
                      </div>
                    ));
                  })()}
                </div>
              ) : (
                /* 陆上动作列表：名称左对齐，训练量右对齐 */
                <div style={{ position: 'relative' }}>
                  {highlights.map((hl, hlIdx) => (
                    <div key={hlIdx} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                      gap: '10px', margin: '6px 0',
                      fontSize: sp.cardDetailFontSize,
                      lineHeight: sp.cardDetailLineHeight,
                      color: 'rgba(250,253,255,0.94)',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flex: '1 1 auto', minWidth: 0 }}>
                        <span style={{
                          width: '7px', height: '7px', minWidth: '7px',
                          borderRadius: '50%', background: accent,
                          display: 'inline-block', flexShrink: 0,
                        }} />
                        <span style={{ fontWeight: 600, overflow: 'visible' }}>{hl.name}</span>
                      </div>
                      <span style={{ opacity: 0.78, whiteSpace: 'nowrap', flexShrink: 0, textAlign: 'right' }}>{hl.detail}</span>
                    </div>
                  ))}
                </div>
              )}
            </article>
          );
        };

        return (
          <div ref={shareCardRef} className="fixed -top-[9999px] -left-[9999px]" aria-hidden="true">
            <div data-training-share-poster style={{
              width: `${posterTheme.canvasWidth}px`,
              height: `${posterTheme.canvasHeight}px`,
              position: 'relative', overflow: 'hidden', boxSizing: 'border-box',
              color: '#fff', fontFamily: 'Arial, Helvetica, sans-serif',
              backgroundImage: 'url(/background.png)',
              backgroundSize: 'cover', backgroundPosition: 'center top', backgroundRepeat: 'no-repeat',
            }}>
              {/* 无 header — 品牌/标语/泳者已在 background.png 中 */}

              {/* 训练信息面板：下半部玻璃质感 */}
              <section style={{
                position: 'absolute', top: '720px', left: '4%', width: '92%', zIndex: 2,
                padding: sp.panelPadding, boxSizing: 'border-box',
                borderRadius: posterTheme.panelRadius,
                border: `1.5px solid ${posterTheme.line}`,
                background: 'linear-gradient(135deg, rgba(12,48,76,0.78), rgba(5,28,52,0.84))',
                boxShadow: posterTheme.panelShadow,
              }}>
                {/* 面板标题 */}
                <div style={{ padding: '0 4px 14px', borderBottom: '1px solid rgba(219,246,255,0.22)' }}>
                  <div style={{
                    fontSize: sp.panelHeaderTitleSize, lineHeight: 1.15,
                    fontWeight: 700, letterSpacing: '0.6px',
                  }}>
                    {weekTitle}
                  </div>
                  <div style={{
                    marginTop: '8px', fontSize: sp.panelHeaderSubtitleSize,
                    letterSpacing: '2px', color: 'rgba(211,244,250,0.88)',
                  }}>
                    {subtitle}
                  </div>
                </div>

                {/* 日卡片网格 */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: grid.columns === 1 ? '1fr' : 'repeat(2, minmax(0, 1fr))',
                  gap: grid.gap,
                  marginTop: '12px',
                }}>
                  {effectiveFrontDays.map((day, index) => renderCard(day, index))}
                </div>

                {/* 奇数天最后一张卡片：居中、等宽 */}
                {lastDay && (
                  <div style={{ marginTop: grid.gap.split(' ')[0], display: 'flex', justifyContent: 'center' }}>
                    {renderCard(lastDay, posterDays.length - 1, true)}
                  </div>
                )}

                {/* 面板底栏 */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  minHeight: '38px', marginTop: '14px',
                  padding: '5px 14px', boxSizing: 'border-box',
                  border: '1px solid rgba(211,242,255,0.35)',
                  borderRadius: '18px',
                  background: 'rgba(30,80,115,0.40)',
                  fontSize: sp.footerFontSize, letterSpacing: '0.2px',
                }}>
                  <span style={{ color: '#ffe5a6', fontSize: '18px' }}>☼</span>
                  <span style={{ whiteSpace: 'nowrap' }}>{restLabel}</span>
                  <span style={{ opacity: 0.45 }}>|</span>
                  <span>{footerLabel}</span>
                </div>
              </section>

              {/* 页脚 */}
              <footer style={{
                position: 'absolute', bottom: 0, width: '100%',
                textAlign: 'center', padding: '10px 0 16px',
                fontSize: '12px', letterSpacing: '1.7px',
                color: 'rgba(255,255,255,0.82)',
                textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                zIndex: 1,
              }}>
                DRYLANDSWIMLAB.COM
              </footer>
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
