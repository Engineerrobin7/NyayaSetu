# Check PostgreSQL and NyayaSetu Status

Write-Host "`n=== NyayaSetu System Status Check ===" -ForegroundColor Cyan

# Check PostgreSQL installation
Write-Host "`n1. PostgreSQL Installation:" -ForegroundColor Yellow
if (Test-Path "C:\Program Files\PostgreSQL\17") {
    Write-Host "   [OK] PostgreSQL 17 is installed" -ForegroundColor Green
} else {
    Write-Host "   [X] PostgreSQL not found!" -ForegroundColor Red
}

# Check if PostgreSQL is running
Write-Host "`n2. PostgreSQL Service:" -ForegroundColor Yellow
$env:Path += ";C:\Program Files\PostgreSQL\17\bin"
$env:PGPASSWORD = "Robin2007"
$test = psql -U postgres -h localhost -p 5432 -d postgres -c "SELECT 1;" 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "   [OK] PostgreSQL is RUNNING" -ForegroundColor Green
} else {
    Write-Host "   [X] PostgreSQL is NOT running" -ForegroundColor Red
    Write-Host "   --> Run: start-postgres.bat (as Administrator)" -ForegroundColor Yellow
}

# Check if database exists
Write-Host "`n3. Database 'nyayasetu':" -ForegroundColor Yellow
$dbCheck = psql -U postgres -h localhost -p 5432 -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname='nyayasetu'" 2>&1
if ($dbCheck -eq "1") {
    Write-Host "   [OK] Database exists" -ForegroundColor Green
} else {
    Write-Host "   [X] Database does NOT exist" -ForegroundColor Red
    Write-Host "   --> Run: powershell -ExecutionPolicy Bypass -File setup-db-simple.ps1" -ForegroundColor Yellow
}

# Check if server is running
Write-Host "`n4. NyayaSetu Server:" -ForegroundColor Yellow
$serverCheck = netstat -ano | findstr ":5000"
if ($serverCheck) {
    Write-Host "   [OK] Server is running on port 5000" -ForegroundColor Green
} else {
    Write-Host "   [X] Server is NOT running" -ForegroundColor Red
    Write-Host "   --> Run: npm start" -ForegroundColor Yellow
}

Write-Host "`n=== Status Check Complete ===" -ForegroundColor Cyan
Write-Host ""

Remove-Item Env:\PGPASSWORD
