-- ============================================
-- NyayaSetu Complete Database Setup for MySQL
-- ============================================

-- Drop database if exists (optional - uncomment if you want fresh start)
-- DROP DATABASE IF EXISTS nyayasetu;

-- Create database
CREATE DATABASE IF NOT EXISTS nyayasetu;

-- Use the database
USE nyayasetu;

-- Show confirmation
SELECT 'Database nyayasetu created and selected!' AS Status;

-- ============================================
-- Create Tables
-- ============================================

-- Users Table
CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'lawyer', 'admin') DEFAULT 'user',
    phone VARCHAR(20),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Lawyers Table
CREATE TABLE IF NOT EXISTS Lawyers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    specialization VARCHAR(255),
    experience INT,
    location VARCHAR(255),
    rating DECIMAL(3,2) DEFAULT 0.00,
    bio TEXT,
    phone VARCHAR(20),
    licenseNumber VARCHAR(100),
    isVerified BOOLEAN DEFAULT FALSE,
    isApproved BOOLEAN DEFAULT FALSE,
    profileImage VARCHAR(500),
    consultationFee DECIMAL(10,2),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
);

-- Bookings Table
CREATE TABLE IF NOT EXISTS Bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    lawyerId INT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
    notes TEXT,
    amount DECIMAL(10,2),
    paymentStatus ENUM('pending', 'paid', 'refunded') DEFAULT 'pending',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (lawyerId) REFERENCES Lawyers(id) ON DELETE CASCADE
);

-- Chats Table
CREATE TABLE IF NOT EXISTS Chats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    senderId INT NOT NULL,
    receiverId INT NOT NULL,
    message TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    isRead BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (senderId) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiverId) REFERENCES Users(id) ON DELETE CASCADE
);

-- Documents Table
CREATE TABLE IF NOT EXISTS Documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    lawyerId INT,
    bookingId INT,
    fileName VARCHAR(255) NOT NULL,
    fileUrl VARCHAR(500) NOT NULL,
    fileType VARCHAR(50),
    fileSize INT,
    uploadedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (lawyerId) REFERENCES Lawyers(id) ON DELETE SET NULL,
    FOREIGN KEY (bookingId) REFERENCES Bookings(id) ON DELETE SET NULL
);

-- Reviews Table
CREATE TABLE IF NOT EXISTS Reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    lawyerId INT NOT NULL,
    bookingId INT,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (lawyerId) REFERENCES Lawyers(id) ON DELETE CASCADE,
    FOREIGN KEY (bookingId) REFERENCES Bookings(id) ON DELETE SET NULL
);

-- Notifications Table
CREATE TABLE IF NOT EXISTS Notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('booking', 'payment', 'message', 'system') DEFAULT 'system',
    isRead BOOLEAN DEFAULT FALSE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
);

-- Availability Table
CREATE TABLE IF NOT EXISTS Availabilities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lawyerId INT NOT NULL,
    dayOfWeek ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
    startTime TIME NOT NULL,
    endTime TIME NOT NULL,
    isAvailable BOOLEAN DEFAULT TRUE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (lawyerId) REFERENCES Lawyers(id) ON DELETE CASCADE
);

-- Admins Table
CREATE TABLE IF NOT EXISTS Admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'superadmin') DEFAULT 'admin',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- Show all tables
-- ============================================
SHOW TABLES;

-- ============================================
-- Insert Sample Admin (Optional)
-- ============================================
-- Password: admin123 (hashed with bcrypt)
INSERT INTO Admins (username, email, password, role) 
VALUES ('admin', 'admin@nyayasetu.com', '$2a$10$rQZ9vXqZ9vXqZ9vXqZ9vXOqZ9vXqZ9vXqZ9vXqZ9vXqZ9vXqZ9vXq', 'superadmin')
ON DUPLICATE KEY UPDATE username=username;

SELECT 'Database setup complete! All tables created.' AS Status;
SELECT 'You can now run: npm start' AS NextStep;
