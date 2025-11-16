# Simple PostgreSQL Database Setup
$env:Path += ";C:\Program Files\PostgreSQL\17\bin"
$env:PGPASSWORD = "Robin2007"

Write-Host "Testing PostgreSQL connection..." -ForegroundColor Yellow

$result = psql -U postgres -h localhost -p 5432 -d postgres -c "SELECT 1;" 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "PostgreSQL is running!" -ForegroundColor Green
    
    Write-Host "Creating database nyayasetu..." -ForegroundColor Yellow
    psql -U postgres -h localhost -p 5432 -d postgres -c "CREATE DATABASE nyayasetu;" 2>&1
    
    Write-Host "Database setup complete!" -ForegroundColor Green
} else {
    Write-Host "PostgreSQL is NOT running!" -ForegroundColor Red
    Write-Host "Please start PostgreSQL service first" -ForegroundColor Yellow
}

Remove-Item Env:\PGPASSWORD
