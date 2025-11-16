const sequelize = require('./src/config/db');

sequelize.sync({ alter: true })
    .then(() => {
        console.log("✅ Database Synced Successfully!");
        process.exit();  // Exit after completion
    })
    .catch(err => {
        console.error("❌ Sync Error:", err);
        process.exit(1);
    });
