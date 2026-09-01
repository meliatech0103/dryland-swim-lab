@echo off
echo ========================================
echo   Dryland Swim Lab 开发服务器
echo ========================================
echo.
echo 正在启动开发服务器...
echo.
echo 网站地址: http://localhost:3001
echo 按 Ctrl+C 停止服务器
echo.
echo ========================================

REM 设置 Node.js 路径
set PATH=E:\cc for test\nodejs;%PATH%

REM 进入项目目录并启动
cd /d "E:\cc for test\dryland-swim-lab"
npm run dev

pause