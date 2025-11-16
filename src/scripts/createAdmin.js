const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const bcrypt = require('bcryptjs');
const { Admin } = require('../models');
const sequelize = require('../config/db');

const createAdmin = async () => {
    try {
        await sequelize.sync();
        
        const existingAdmin = await Admin.findOne({ where: { email: 'admin@nyayasetu.com' } });
        
        if (existingAdmin) {
            console.log('❌ Admin already exists');
            process.exit(0);
        }
        
        const hashedPassword = await bcrypt.hash('admin123', 10);
        
        await Admin.create({
            username: 'admin',
            email: 'admin@nyayasetu.com',
            password: hashedPassword,
            role: 'superadmin'
        });
        
        console.log('✅ Admin created successfully');
        console.log('Email: admin@nyayasetu.com');
        console.log('Password: admin123');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating admin:', error);
        process.exit(1);
    }
};

createAdmin();
