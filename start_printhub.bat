@echo off
title PrintHub Starter

echo ==========================================
echo Starting PrintHub Servers...
echo ==========================================

echo 1. Starting Django Backend...
start "PrintHub Backend" cmd /k "cd /d "C:\Users\AHUMUZA JOHN BAPTIST\Desktop\printlink\backend" && venv\Scripts\activate && python manage.py runserver"

echo 2. Starting React Frontend...
start "PrintHub Frontend" cmd /k "cd /d "C:\Users\AHUMUZA JOHN BAPTIST\Desktop\printlink\frontend" && npm run dev"

echo.
echo Both servers are launching in new windows!
echo You can close this window.
timeout /t 5