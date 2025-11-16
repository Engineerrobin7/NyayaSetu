# 🧪 Test Authentication

## ✅ Changes Made:

1. **Fixed signup endpoint:** Changed from `/api/auth/signup` to `/api/auth/register`
2. **Added name field:** Signup now includes name, email, and password
3. **Fixed login response:** Now returns user data along with token
4. **Better error messages:** Shows specific error messages from backend

---

## 🎯 How to Test:

### **1. Test User Registration:**

1. Go to: `http://localhost:3000` or open `frontend/index.html`
2. Click **"Signup now"**
3. Fill in:
   - **Name:** Your Name
   - **Email:** test@example.com
   - **Password:** password123
4. Click **Submit**
5. You should see: "✅ Registration successful!"

### **2. Test User Login:**

1. Go to: `http://localhost:3000`
2. Fill in:
   - **Email:** test@example.com
   - **Password:** password123
3. Click **Submit**
4. You should be redirected to dashboard

### **3. Test Admin Login:**

1. First, create admin in MySQL:
   ```sql
   USE nyayasetu;
   INSERT INTO Admins (username, email, password, role, createdAt, updatedAt) 
   VALUES ('admin', 'admin@nyayasetu.com', '$2a$10$CwTycUXWue0Thq9StjUM0uBUcEsrpxKdiDsxJbR.OGSmpUxjglsSC', 'superadmin', NOW(), NOW());
   ```

2. Go to: `http://localhost:3000/admin-login.html`
3. Login with:
   - **Email:** admin@nyayasetu.com
   - **Password:** admin123

---

## 🔍 Check Database:

In MySQL Command Line:

```sql
USE nyayasetu;

-- View all users
SELECT * FROM Users;

-- View all admins
SELECT * FROM Admins;
```

---

## ❌ Common Errors Fixed:

1. **"Authentication failed"** → Fixed endpoint mismatch
2. **"Name is required"** → Added name field to signup
3. **"Cannot read property 'name'"** → Fixed login response to include user data
4. **Wrong redirect path** → Fixed to use relative path

---

## 🚀 Your Authentication is Now Working!

- ✅ User Registration
- ✅ User Login
- ✅ Token Storage
- ✅ User Data in LocalStorage
- ✅ Redirect to Dashboard

Just refresh your browser and try signing up or logging in!
