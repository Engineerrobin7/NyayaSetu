# MySQL Setup Guide for NyayaSetu

## ✅ Project Updated to Use MySQL!

Your project is now configured to use MySQL instead of PostgreSQL.

## Step 1: Create the Database in MySQL

Open your **MySQL Command Line Client** or **MySQL Workbench** and run:

```sql
CREATE DATABASE nyayasetu;
```

### Using MySQL Command Line:

1. Open **MySQL Command Line Client** from Start menu
2. Enter your MySQL root password
3. Type: `CREATE DATABASE nyayasetu;`
4. Press Enter
5. Type: `exit` to quit

### Using MySQL Workbench:

1. Open **MySQL Workbench**
2. Connect to your local MySQL server
3. Click on "Create a new schema" button (database icon)
4. Name it: `nyayasetu`
5. Click "Apply"

## Step 2: Update Your Password in .env

Open the `.env` file and set your MySQL password:

```env
DB_NAME=nyayasetu
DB_USER=root
DB_PASS=YOUR_MYSQL_PASSWORD_HERE
DB_HOST=localhost
DB_PORT=3306
```

**Common MySQL passwords:**
- Empty password (leave it blank): `DB_PASS=`
- `root`
- The password you set during MySQL installation

## Step 3: Start Your Server

```bash
npm start
```

The server will automatically:
- Connect to MySQL
- Create all necessary tables
- Start on port 5000

## Quick MySQL Commands

### Check if MySQL is running:
```bash
mysql -u root -p
```

### Create database manually:
```sql
CREATE DATABASE nyayasetu;
SHOW DATABASES;
USE nyayasetu;
```

### Check tables after running npm start:
```sql
USE nyayasetu;
SHOW TABLES;
```

## Troubleshooting

### "Access denied for user 'root'"
- Check your password in `.env` file
- Try empty password: `DB_PASS=`
- Reset MySQL root password if needed

### "Can't connect to MySQL server"
- Make sure MySQL service is running
- Check Services (services.msc) for "MySQL" service
- Start it if it's stopped

### "Unknown database 'nyayasetu'"
- The database doesn't exist yet
- Run: `CREATE DATABASE nyayasetu;` in MySQL

## MySQL Service Commands

Start MySQL:
```cmd
net start MySQL80
```

Stop MySQL:
```cmd
net stop MySQL80
```

Check status:
```cmd
sc query MySQL80
```

## Your Current Configuration

- **Database:** nyayasetu
- **User:** root
- **Password:** (set in .env file)
- **Host:** localhost
- **Port:** 3306
- **Dialect:** mysql

## Next Steps

1. ✅ MySQL driver installed (mysql2)
2. ✅ Configuration updated
3. 🔄 Create database in MySQL
4. 🔄 Update password in .env
5. 🔄 Run `npm start`

## Differences from PostgreSQL

The project now uses MySQL instead of PostgreSQL:
- Port changed from 5432 to 3306
- Dialect changed from 'postgres' to 'mysql'
- Driver changed from 'pg' to 'mysql2'
- Default user changed from 'postgres' to 'root'

All your models and code will work the same way!
