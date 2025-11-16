const { Availability, Lawyer } = require('../models');

// Set Lawyer Availability
exports.setAvailability = async (req, res) => {
    try {
        const lawyerId = req.user.id;
        const { dayOfWeek, startTime, endTime, isAvailable } = req.body;
        
        const availability = await Availability.create({
            lawyerId,
            dayOfWeek,
            startTime,
            endTime,
            isAvailable
        });
        
        res.status(201).json({ message: 'Availability set successfully', availability });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get Lawyer Availability
exports.getAvailability = async (req, res) => {
    try {
        const { lawyerId } = req.params;
        const availability = await Availability.findAll({
            where: { lawyerId },
            order: [['dayOfWeek', 'ASC']]
        });
        res.json(availability);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update Availability
exports.updateAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        const { startTime, endTime, isAvailable } = req.body;
        
        await Availability.update(
            { startTime, endTime, isAvailable },
            { where: { id } }
        );
        
        res.json({ message: 'Availability updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete Availability
exports.deleteAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        await Availability.destroy({ where: { id } });
        res.json({ message: 'Availability deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
