# 🔐 Admin Login - Complete Guide

## 🎯 Step 1: Create Admin Account in MySQL

### Open MySQL Command Line Client and run:

```sql
USE nyayasetu;

-- Delete old admin if exists
DELETE FROM Admins WHERE email = 'admin@nyayasetu.com';

-- Create new admin
INSERT INTO Admins (username, email, password, role, createdAt, updatedAt) 
VALUES (
    'admin', 
    'admin@nyayasetu.com', 
    '$2b$10$aTsinroB7AHF6mkWfLcqkexcVOW.E0l4oFLA1Hw67ddfKjnx8unxG', 
    'superadmin',
    NOW(),
    NOW()
);

-- Verify
SELECT * FROM Admins;
```

---

## 🔑 Step 2: Login Credentials

**Admin Login Page:** `http://localhost:3000/admin-login.html`

**Credentials:**
- **Email:** `admin@nyayasetu.com`
- **Password:** `admin123`

---

## ✅ Step 3: Verify Admin Was Created

In MySQL:
```sql
USE nyayasetu;
SELECT id, username, email, role FROM Admins;
```

You should see:
```
+----+----------+----------------------+------------+
| id | username | email                | role       |
+----+----------+----------------------+------------+
|  1 | admin    | admin@nyayasetu.com  | superadmin |
+----+----------+----------------------+------------+
```

---

## 🚀 Step 4: Login

1. Go to: `http://localhost:3000/admin-login.html`
2. Enter:
   - Email: `admin@nyayasetu.com`
   - Password: `admin123`
3. Click **Login**
4. You'll be redirected to admin dashboard!

---

## 🐛 Troubleshooting

### "Invalid credentials" error:

**Solution 1: Make sure you ran the SQL command**
```sql
SELECT * FROM Admins WHERE email = 'admin@nyayasetu.com';
```
If no results, run the INSERT command again.

**Solution 2: Check the password hash**
The password in database should be:
```
$2b$10$aTsinroB7AHF6mkWfLcqkexcVOW.E0l4oFLA1Hw67ddfKjnx8unxG
```

**Solution 3: Clear browser cache and try again**

**Solution 4: Check server logs**
Look at your terminal where `npm start` is running for any errors.

---

## 📝 Alternative: Create Admin via Node.js

Create a file `create-admin-simple.js`:

```javascript
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

async function createAdmin() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '', // Your MySQL password
        database: 'nyayasetu'
    });
    
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    await connection.execute(
        'INSERT INTO Admins (username, email, password, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())',
        ['admin', 'admin@nyayasetu.com', hashedPassword, 'superadmin']
    );
    
    console.log('✅ Admin created!');
    console.log('Email: admin@nyayasetu.com');
    console.log('Password: admin123');
    
    await connection.end();
}

createAdmin();
```

Run: `node create-admin-simple.js`

---

## 🎉 Success!

Once logged in, you can:
- View all users
- Manage lawyers
- Approve/reject lawyer registrations
- View all bookings
- See dashboard statistics

---

## 📞 Still Having Issues?

Check:
1. ✅ MySQL is running
2. ✅ Database 'nyayasetu' exists
3. ✅ Table 'Admins' exists
4. ✅ Admin record exists in database
5. ✅ Backend server is running on port 5000
6. ✅ Frontend is accessible on port 3000

Run this to verify everything:
```sql
USE nyayasetu;
SHOW TABLES;
SELECT * FROM Admins;
```
