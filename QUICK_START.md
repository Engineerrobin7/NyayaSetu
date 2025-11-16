# 🚀 Quick Start Guide - NyayaSetu

## Current Status
✅ PostgreSQL 17 is installed  
❌ PostgreSQL service is NOT running  
❌ Database 'nyayasetu' does NOT exist  
❌ Server is NOT running  

## Follow These Steps (In Order):

### Step 1: Start PostgreSQL Service ⚡

**Choose ONE method:**

#### Method A: Using Batch File (Easiest)
1. Right-click on `start-postgres.bat`
2. Select **"Run as administrator"**
3. Wait for success message

#### Method B: Using Services
1. Press `Win + R`
2. Type `services.msc` and press Enter
3. Find `postgresql-x64-17`
4. Right-click → **Start**

#### Method C: Command Line
Open Command Prompt as Administrator and run:
```cmd
net start postgresql-x64-17
```

---

### Step 2: Create Database 🗄️

After PostgreSQL is running, open PowerShell and run:
```powershell
powershell -ExecutionPolicy Bypass -File setup-db-simple.ps1
```

You should see:
```
PostgreSQL is running!
Creating database nyayasetu...
Database setup complete!
```

---

### Step 3: Start the Server 🌐

```bash
npm start
```

You should see:
```
✅ Database Synced!
🚀 Server running on port 5000
```

---

### Step 4: Access the Application 🎯

Open in your browser:
- **User Portal:** `frontend/index.html` or http://localhost:3000
- **Admin Portal:** `frontend/admin-login.html`
- **Lawyer Portal:** `frontend/lawyer-register.html`

---

## 🔍 Check Status Anytime

Run this to see what's working:
```powershell
powershell -ExecutionPolicy Bypass -File check-status.ps1
```

---

## 🆘 Troubleshooting

### "Access Denied" when starting PostgreSQL
→ Right-click and select **"Run as administrator"**

### "Database already exists" error
→ This is OK! Just run `npm start`

### "Connection refused" error
→ PostgreSQL is not running. Go back to Step 1

### Server won't start
→ Check if port 5000 is already in use:
```powershell
netstat -ano | findstr :5000
```

---

## 📝 Your Database Credentials

From `.env` file:
- **Database:** nyayasetu
- **User:** postgres
- **Password:** Robin2007
- **Host:** localhost
- **Port:** 5432

---

## 🎓 Next Steps

1. **Create Admin Account:**
   ```bash
   node src/scripts/createAdmin.js
   ```

2. **Read Full Documentation:**
   - `DATABASE_SETUP_GUIDE.md` - Detailed database setup
   - `API_DOCUMENTATION.md` - API endpoints
   - `DEPLOYMENT.md` - Production deployment
   - `TESTING.md` - Running tests

---

## 📞 Need More Help?

See `DATABASE_SETUP_GUIDE.md` for detailed troubleshooting and alternative methods.
