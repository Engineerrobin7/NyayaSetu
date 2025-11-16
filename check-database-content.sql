-- Check Database Content
-- Run this in MySQL to see all data

USE nyayasetu;

-- Show all tables
SHOW TABLES;

-- Count records in each table
SELECT 'Admins' AS TableName, COUNT(*) AS RecordCount FROM Admins
UNION ALL
SELECT 'Users', COUNT(*) FROM Users
UNION ALL
SELECT 'Lawyers', COUNT(*) FROM Lawyers
UNION ALL
SELECT 'Bookings', COUNT(*) FROM Bookings
UNION ALL
SELECT 'Reviews', COUNT(*) FROM Reviews
UNION ALL
SELECT 'Documents', COUNT(*) FROM Documents
UNION ALL
SELECT 'Chats', COUNT(*) FROM Chats
UNION ALL
SELECT 'Notifications', COUNT(*) FROM Notifications
UNION ALL
SELECT 'Availabilities', COUNT(*) FROM Availabilities;

-- View all admins
SELECT 'ADMINS TABLE:' AS Info;
SELECT id, username, email, role, createdAt FROM Admins;

-- View all users
SELECT 'USERS TABLE:' AS Info;
SELECT id, name, email, role, createdAt FROM Users;

-- View all lawyers
SELECT 'LAWYERS TABLE:' AS Info;
SELECT id, name, email, specialization, isApproved, createdAt FROM Lawyers;
