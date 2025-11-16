@echo off
echo === Starting PostgreSQL Service ===
echo.

REM Try to start PostgreSQL service
net start postgresql-x64-17

if %errorlevel% equ 0 (
    echo.
    echo PostgreSQL service started successfully!
    echo.
    pause
) else (
    echo.
    echo Failed to start PostgreSQL service.
    echo Please run this file as Administrator!
    echo.
    echo Right-click on start-postgres.bat and select "Run as administrator"
    echo.
    pause
)
