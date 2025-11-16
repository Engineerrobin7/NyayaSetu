# 🐛 Debug Authentication Issues

## ✅ Changes Made:

1. **Fixed CORS** - Added multiple origins including localhost:3000
2. **Added request logging** - Server now logs all requests
3. **Created test page** - Simple page to test auth without other code

---

## 🧪 Test Authentication:

### **Step 1: Open Test Page**
Go to: `http://localhost:3000/test-auth.html`

This is a simple test page that will show you exactly what's happening.

### **Step 2: Test Registration**
1. Click **"Test Register"** button
2. Check the result message
3. Open browser console (F12) to see detailed logs

### **Step 3: Test Login**
1. After successful registration, click **"Test Login"**
2. Check if you get a token

---

## 🔍 Check Server Logs:

Look at your terminal where `npm start` is running. You should see:
```
POST /api/auth/register { name: 'Test User', email: 'test@example.com', password: 'password123' }
```

---

## ❌ Common Issues:

### **Issue 1: CORS Error**
**Error:** "Access to fetch has been blocked by CORS policy"
**Solution:** ✅ Fixed - Added multiple origins to CORS

### **Issue 2: Network Error**
**Error:** "Failed to fetch"
**Solution:** Make sure backend is running on port 5000

### **Issue 3: 400 Bad Request**
**Error:** "Email already exists"
**Solution:** Use a different email or check database

### **Issue 4: 500 Server Error**
**Solution:** Check server terminal for error logs

---

## 📊 Check Database:

```sql
USE nyayasetu;

-- See all users
SELECT * FROM Users;

-- Delete test user if needed
DELETE FROM Users WHERE email = 'test@example.com';
```

---

## 🎯 Next Steps:

1. Open `http://localhost:3000/test-auth.html`
2. Click "Test Register"
3. If it works, try the main login page
4. If it fails, check:
   - Browser console (F12)
   - Server terminal logs
   - Database content

---

## 📝 What to Look For:

**In Browser Console:**
- Request URL
- Request payload
- Response status
- Response data

**In Server Terminal:**
- Request method and path
- Request body
- Any error messages

Tell me what you see and I'll help fix it!
