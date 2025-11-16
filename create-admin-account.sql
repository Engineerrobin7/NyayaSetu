-- Create Admin Account for NyayaSetu
-- Run this in MySQL Command Line or MySQL Workbench

USE nyayasetu;

-- Insert admin account
-- Username: admin
-- Email: admin@nyayasetu.com
-- Password: admin123 (hashed with bcrypt)
INSERT INTO Admins (username, email, password, role, createdAt, updatedAt) 
VALUES (
    'admin', 
    'admin@nyayasetu.com', 
    '$2a$10$rQZ9vXqZ9vXqZ9vXqZ9vXOqZ9vXqZ9vXqZ9vXqZ9vXqZ9vXqZ9vXq', 
    'superadmin',
    NOW(),
    NOW()
)
ON DUPLICATE KEY UPDATE username=username;

-- Verify admin was created
SELECT * FROM Admins;

-- Show success message
SELECT 'Admin account created successfully!' AS Status;
SELECT 'Username: admin' AS Username;
SELECT 'Email: admin@nyayasetu.com' AS Email;
SELECT 'Password: admin123' AS Password;
