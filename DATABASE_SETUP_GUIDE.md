# PostgreSQL Database Setup Guide for NyayaSetu

## Step 1: Start PostgreSQL Service

### Method 1: Using Services (Recommended)
1. Press `Win + R` to open Run dialog
2. Type `services.msc` and press Enter
3. Find service named `postgresql-x64-17` in the list
4. Right-click on it and select **Start**
5. (Optional) Right-click again and select **Properties** → Set **Startup type** to **Automatic**

### Method 2: Using Command Prompt (As Administrator)
1. Right-click on **Command Prompt** and select **Run as administrator**
2. Run this command:
   ```cmd
   net start postgresql-x64-17
   ```

### Method 3: Using the Batch File
1. Right-click on `start-postgres.bat` in this folder
2. Select **Run as administrator**

### Method 4: Using pgAdmin
1. Open **pgAdmin 4** from Start menu
2. Connect to your PostgreSQL server
3. The server should start automatically

## Step 2: Create the Database

Once PostgreSQL is running, you have two options:

### Option A: Automatic Setup (Recommended)
Run this PowerShell script:
```powershell
powershell -ExecutionPolicy Bypass -File setup-db-simple.ps1
```

### Option B: Manual Setup
1. Open **Command Prompt** or **PowerShell**
2. Run these commands:
   ```cmd
   cd "C:\Program Files\PostgreSQL\17\bin"
   psql -U postgres
   ```
3. Enter your password: `Robin2007`
4. In the PostgreSQL prompt, run:
   ```sql
   CREATE DATABASE nyayasetu;
   \q
   ```

### Option C: Using pgAdmin
1. Open **pgAdmin 4**
2. Connect to PostgreSQL server (password: `Robin2007`)
3. Right-click on **Databases** → **Create** → **Database**
4. Enter database name: `nyayasetu`
5. Click **Save**

## Step 3: Verify Database Connection

Run this command to test:
```powershell
powershell -ExecutionPolicy Bypass -File setup-db-simple.ps1
```

You should see: "PostgreSQL is running!" and "Database setup complete!"

## Step 4: Start the NyayaSetu Server

Once the database is created, start your application:
```bash
npm start
```

The server will automatically:
- Connect to the database
- Create all necessary tables
- Start listening on port 5000

## Troubleshooting

### PostgreSQL Service Won't Start
- Check if port 5432 is already in use
- Check PostgreSQL logs at: `C:\Program Files\PostgreSQL\17\data\log`
- Try restarting your computer

### Database Already Exists Error
This is fine! It means the database was already created. Just run `npm start`

### Connection Refused Error
- Make sure PostgreSQL service is running (check Services)
- Verify the password in `.env` file matches your PostgreSQL password
- Check if firewall is blocking port 5432

## Your Database Configuration

From your `.env` file:
- **Database Name:** nyayasetu
- **Username:** postgres
- **Password:** Robin2007
- **Host:** localhost
- **Port:** 5432

## Quick Commands Reference

```bash
# Check if PostgreSQL is running
Get-Service | Where-Object {$_.Name -like "*postgres*"}

# Start PostgreSQL
net start postgresql-x64-17

# Stop PostgreSQL
net stop postgresql-x64-17

# Connect to database
psql -U postgres -d nyayasetu

# Create database manually
psql -U postgres -c "CREATE DATABASE nyayasetu;"
```

## Next Steps After Database Setup

1. **Create Admin Account:**
   ```bash
   node src/scripts/createAdmin.js
   ```

2. **Access the Application:**
   - User Portal: http://localhost:3000 or open `frontend/index.html`
   - Admin Portal: Open `frontend/admin-login.html` in browser
   - Lawyer Portal: Open `frontend/lawyer-register.html` in browser

3. **API Endpoints:**
   - Server runs on: http://localhost:5000
   - API Documentation: See `API_DOCUMENTATION.md`

## Need Help?

If you're still having issues:
1. Check if PostgreSQL is installed: `C:\Program Files\PostgreSQL\17`
2. Verify the service name in Services (services.msc)
3. Check PostgreSQL logs for errors
4. Make sure your password is correct in `.env` file
