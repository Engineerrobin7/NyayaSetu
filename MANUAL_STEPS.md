# Manual Steps to Start PostgreSQL and Create Database

## The Issue
PostgreSQL appears to be running, but the password in your `.env` file might not match the actual PostgreSQL password.

## Solution - Follow These Steps:

### Step 1: Find Your PostgreSQL Password

Your PostgreSQL password was set when you installed PostgreSQL. Common passwords are:
- The password you set during installation
- `postgres`
- `admin`
- `root`

### Step 2: Start PostgreSQL (if not running)

**Option A: Using pgAdmin (Easiest)**
1. Open **pgAdmin 4** from your Start menu
2. It will ask for your PostgreSQL password
3. Once connected, PostgreSQL is running!

**Option B: Using Services**
1. Press `Win + R`
2. Type `services.msc` and press Enter
3. Look for a service with "PostgreSQL" in the name
4. Right-click → Start (if it's not already running)

### Step 3: Create the Database

**Option A: Using pgAdmin (Recommended)**
1. Open **pgAdmin 4**
2. Enter your PostgreSQL password
3. In the left panel, right-click on **Databases**
4. Select **Create** → **Database**
5. Name it: `nyayasetu`
6. Click **Save**

**Option B: Using Command Line**
1. Open Command Prompt
2. Run:
   ```cmd
   cd "C:\Program Files\PostgreSQL\17\bin"
   psql -U postgres
   ```
3. Enter your PostgreSQL password when prompted
4. In the PostgreSQL prompt, type:
   ```sql
   CREATE DATABASE nyayasetu;
   \q
   ```

### Step 4: Update Your .env File

Open the `.env` file in your project and update the password:
```
DB_NAME=nyayasetu
DB_USER=postgres
DB_PASS=YOUR_ACTUAL_PASSWORD_HERE
DB_HOST=localhost
DB_PORT=5432
```

### Step 5: Start Your Server

```bash
npm start
```

## Quick Test

To test if PostgreSQL is running and what your password is:

1. Open **pgAdmin 4**
2. Try to connect - it will tell you if the password is wrong
3. Once you can connect in pgAdmin, use that same password in your `.env` file

## Alternative: Reset PostgreSQL Password

If you forgot your password:

1. Open Command Prompt as Administrator
2. Navigate to PostgreSQL bin:
   ```cmd
   cd "C:\Program Files\PostgreSQL\17\bin"
   ```
3. Edit `pg_hba.conf` to allow trust authentication temporarily
4. Restart PostgreSQL
5. Change the password using:
   ```sql
   ALTER USER postgres PASSWORD 'Robin2007';
   ```
6. Restore `pg_hba.conf` settings

## Need Help?

The easiest way is to:
1. Open **pgAdmin 4** (it's installed with PostgreSQL)
2. Use it to create the database
3. Note the password you use to connect
4. Update that password in your `.env` file
