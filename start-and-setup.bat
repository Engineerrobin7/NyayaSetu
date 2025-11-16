@echo off
echo ========================================
echo    NyayaSetu - PostgreSQL Setup
echo ========================================
echo.

echo Step 1: Starting PostgreSQL...
echo.

REM Add PostgreSQL to PATH
set PATH=%PATH%;C:\Program Files\PostgreSQL\17\bin

REM Start PostgreSQL server
echo Starting PostgreSQL server...
pg_ctl start -D "C:\Program Files\PostgreSQL\17\data" -l "C:\Program Files\PostgreSQL\17\data\logfile"

timeout /t 3 /nobreak >nul

echo.
echo Step 2: Creating database...
echo.

REM Set password
set PGPASSWORD=Robin2007

REM Create database
psql -U postgres -h localhost -p 5432 -d postgres -c "CREATE DATABASE nyayasetu;"

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo SUCCESS! Database created!
    echo ========================================
    echo.
    echo Now you can run: npm start
    echo.
) else (
    echo.
    echo Database might already exist or there was an error.
    echo Try running: npm start
    echo.
)

pause
