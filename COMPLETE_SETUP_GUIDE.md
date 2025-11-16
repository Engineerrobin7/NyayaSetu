# 🚀 Complete Setup Guide - NyayaSetu with MySQL

## ✅ Files Created:
1. `.env` - Environment configuration
2. `setup-complete-database.sql` - Complete database setup with all tables

---

## 📋 Step-by-Step Instructions

### Step 1: Open MySQL Command Line Client

1. Press `Win` key and search for **"MySQL Command Line Client"** or **"MySQL 8.0 Command Line Client"**
2. Click to open it
3. Enter your MySQL root password when prompted
4. You should see: `mysql>`

---

### Step 2: Run the Complete Setup SQL

**Option A: Copy and Paste (Easiest)**

Copy and paste these commands one by one into MySQL:

```sql
CREATE DATABASE IF NOT EXISTS nyayasetu;
USE nyayasetu;
```

Then copy and paste the entire content from `setup-complete-database.sql` file.

**Option B: Run the SQL File Directly**

In MySQL Command Line, type:
```sql
source C:/Users/ROBIN/OneDrive/Desktop/NyayaSetu/setup-complete-database.sql
```

**Option C: Use MySQL Workbench**

1. Open MySQL Workbench
2. Connect to your local server
3. Click **File** → **Open SQL Script**
4. Select `setup-complete-database.sql`
5. Click the lightning bolt icon to execute

---

### Step 3: Verify Database Creation

In MySQL, run:
```sql
USE nyayasetu;
SHOW TABLES;
```

You should see these tables:
- Admins
- Availabilities
- Bookings
- Chats
- Documents
- Lawyers
- Notifications
- Reviews
- Users

---

### Step 4: Update .env File with Your MySQL Password

Open the `.env` file and update the password:

```env
DB_NAME=nyayasetu
DB_USER=root
DB_PASS=YOUR_MYSQL_PASSWORD_HERE
DB_HOST=localhost
DB_PORT=3306
```

**Common scenarios:**
- If you have NO password: Leave it empty → `DB_PASS=`
- If you have a password: Enter it → `DB_PASS=mypassword`

---

### Step 5: Start Your Server! 🎉

Open terminal in your project folder and run:

```bash
npm start
```

You should see:
```
✅ Database Connected!
✅ Database Synced!
🚀 Server running on port 5000
```

---

## 🌐 Access Your Application

Once the server is running:

1. **User Portal:** Open `frontend/index.html` in your browser
2. **Admin Portal:** Open `frontend/admin-login.html` in your browser
3. **Lawyer Portal:** Open `frontend/lawyer-register.html` in your browser

**API Server:** http://localhost:5000

---

## 🔑 Default Admin Credentials

After running the SQL setup, you can login to admin panel with:
- **Username:** admin
- **Email:** admin@nyayasetu.com
- **Password:** admin123

(You should change this password after first login!)

---

## 🐛 Troubleshooting

### "Access denied for user 'root'"
→ Wrong password in `.env` file. Update `DB_PASS` with your actual MySQL password

### "Unknown database 'nyayasetu'"
→ Database not created. Run the SQL commands in Step 2 again

### "Can't connect to MySQL server"
→ MySQL is not running. Start MySQL service:
```cmd
net start MySQL80
```

### "Table already exists"
→ This is OK! The SQL script uses `IF NOT EXISTS` so it won't break

### Port 5000 already in use
→ Another app is using port 5000. Change `PORT=5001` in `.env` file

---

## 📝 Quick MySQL Commands Reference

```sql
-- Show all databases
SHOW DATABASES;

-- Use nyayasetu database
USE nyayasetu;

-- Show all tables
SHOW TABLES;

-- Show table structure
DESCRIBE Users;
DESCRIBE Lawyers;

-- Show all users
SELECT * FROM Users;

-- Show all lawyers
SELECT * FROM Lawyers;

-- Exit MySQL
exit
```

---

## 🎓 Next Steps

1. ✅ Database created with all tables
2. ✅ .env file configured
3. ✅ Server ready to start
4. 🔄 Run `npm start`
5. 🔄 Open frontend files in browser
6. 🔄 Register users and lawyers
7. 🔄 Test the application!

---

## 📞 Need Help?

If you encounter any issues:
1. Check MySQL is running: `sc query MySQL80`
2. Verify database exists: `SHOW DATABASES;`
3. Check tables exist: `USE nyayasetu; SHOW TABLES;`
4. Verify .env password matches your MySQL password

---

## 🎉 You're All Set!

Your NyayaSetu project is now fully configured with MySQL. Just run `npm start` and start building! 🚀
