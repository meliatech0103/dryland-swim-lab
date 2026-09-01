import Image from 'next/image';

export default function SimpleHeroTest() {
  const images = [
    '/images/hero/hero-1.jpg',
    '/images/hero/hero-2.jpg',
    '/images/hero/hero-3.jpg',
    '/images/hero/hero-4.jpg',
  ];

  return (
    <div className="relative w-full h-[600px] bg-blue-600">
      {/* 测试：直接显示第一张图片 */}
      <div className="absolute inset-0 z-0">
        <img
          src={images[0]}
          alt="Test hero image"
          className="w-full h-full object-cover"
        />
        {/* 浅色遮罩 - 更透明 */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-blue-50/50 to-cyan-50/40" />
      </div>

      {/* 内容 - 深色文字 */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-gray-900">
          <h1 className="text-4xl font-bold mb-4">Test Hero Section</h1>
          <p className="text-xl">If you can see a background image here, the image path is working!</p>
        </div>
      </div>

      {/* 调试信息 */}
      <div className="absolute top-4 left-4 bg-blue-900/70 text-white px-4 py-2 rounded z-50">
        <p>Direct Image Test</p>
        <p className="text-sm">Image: {images[0]}</p>
      </div>
    </div>
  );
}
