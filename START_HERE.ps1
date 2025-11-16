# NyayaSetu - Complete Setup Script
# Run this file to start PostgreSQL and create the database

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "   NyayaSetu - PostgreSQL Setup" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Add PostgreSQL to PATH
$env:Path += ";C:\Program Files\PostgreSQL\17\bin"

# Step 1: Start PostgreSQL
Write-Host "Step 1: Starting PostgreSQL server..." -ForegroundColor Yellow
try {
    $startResult = & "C:\Program Files\PostgreSQL\17\bin\pg_ctl.exe" start -D "C:\Program Files\PostgreSQL\17\data" 2>&1
    Start-Sleep -Seconds 3
    Write-Host "[OK] PostgreSQL started!" -ForegroundColor Green
} catch {
    Write-Host "[INFO] PostgreSQL might already be running" -ForegroundColor Yellow
}

# Step 2: Create Database
Write-Host "`nStep 2: Creating database 'nyayasetu'..." -ForegroundColor Yellow
$env:PGPASSWORD = "Robin2007"

try {
    $createDb = & psql -U postgres -h localhost -p 5432 -d postgres -c "CREATE DATABASE nyayasetu;" 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[OK] Database created successfully!" -ForegroundColor Green
    } else {
        if ($createDb -like "*already exists*") {
            Write-Host "[OK] Database already exists!" -ForegroundColor Green
        } else {
            Write-Host "[ERROR] $createDb" -ForegroundColor Red
        }
    }
} catch {
    Write-Host "[ERROR] Failed to create database" -ForegroundColor Red
}

# Step 3: Verify
Write-Host "`nStep 3: Verifying connection..." -ForegroundColor Yellow
$verify = & psql -U postgres -h localhost -p 5432 -d nyayasetu -c "SELECT 'Connection successful!' as status;" 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] Database connection verified!" -ForegroundColor Green
} else {
    Write-Host "[ERROR] Could not connect to database" -ForegroundColor Red
}

Remove-Item Env:\PGPASSWORD

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "   Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "`nNext step: Run 'npm start' to start the server`n" -ForegroundColor Yellow

Read-Host "Press Enter to continue"
