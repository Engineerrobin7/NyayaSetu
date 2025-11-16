-- Create Admin Account with Fresh Password Hash
-- Run this in MySQL Command Line

USE nyayasetu;

-- Delete old admin if exists
DELETE FROM Admins WHERE email = 'admin@nyayasetu.com';

-- Insert new admin with correct password
INSERT INTO Admins (username, email, password, role, createdAt, updatedAt) 
VALUES (
    'superuser', 
    'superuser@nyayasetu.com', 
    'admin123', 
    'superadmin',
    NOW(),
    NOW()
);

-- Verify admin was created
SELECT id, username, email, role, createdAt FROM Admins;

-- Show login credentials
SELECT 'Admin account created successfully!' AS Status;
SELECT 'Email: admin@nyayasetu.com' AS Credential;
SELECT 'Password: admin123' AS Credential;
SELECT 'Login at: http://localhost:3000/admin-login.html' AS URL;
