# PostgreSQL Setup Script for NyayaSetu

Write-Host "=== NyayaSetu Database Setup ===" -ForegroundColor Cyan

# Add PostgreSQL to PATH
$env:Path += ";C:\Program Files\PostgreSQL\17\bin"

# Database configuration from .env
$DB_NAME = "nyayasetu"
$DB_USER = "postgres"
$DB_PASS = "Robin2007"
$DB_HOST = "localhost"
$DB_PORT = "5432"

Write-Host "`n1. Testing PostgreSQL connection..." -ForegroundColor Yellow

# Set password environment variable
$env:PGPASSWORD = $DB_PASS

# Test connection
$testConnection = & psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d postgres -c "SELECT version();" 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ PostgreSQL is running!" -ForegroundColor Green
    
    Write-Host "`n2. Checking if database '$DB_NAME' exists..." -ForegroundColor Yellow
    
    # Check if database exists
    $dbExists = & psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'" 2>&1
    
    if ($dbExists -eq "1") {
        Write-Host "✓ Database '$DB_NAME' already exists!" -ForegroundColor Green
    } else {
        Write-Host "Creating database '$DB_NAME'..." -ForegroundColor Yellow
        & psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d postgres -c "CREATE DATABASE $DB_NAME;" 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ Database '$DB_NAME' created successfully!" -ForegroundColor Green
        } else {
            Write-Host "✗ Failed to create database!" -ForegroundColor Red
            exit 1
        }
    }
    
    Write-Host "`n3. Database is ready!" -ForegroundColor Green
    Write-Host "`nYou can now run: npm start" -ForegroundColor Cyan
    
} else {
    Write-Host "X PostgreSQL is not running or connection failed!" -ForegroundColor Red
    Write-Host "`nPlease start PostgreSQL service:" -ForegroundColor Yellow
    Write-Host "  Option 1: Open Services (services.msc) and start postgresql-x64-17" -ForegroundColor White
    Write-Host "  Option 2: Run as Administrator: net start postgresql-x64-17" -ForegroundColor White
    Write-Host "  Option 3: Use pgAdmin to start the server" -ForegroundColor White
    exit 1
}

# Clear password from environment
Remove-Item Env:\PGPASSWORD
