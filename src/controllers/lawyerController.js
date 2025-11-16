const { Lawyer, Review, Availability } = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getAllLawyers = async (req, res) => {
    try {
        const { specialization, location, minRating, maxFees, search } = req.query;
        
        let whereClause = { isActive: true };
        
        if (specialization) {
            whereClause.specialization = { [Op.iLike]: `%${specialization}%` };
        }
        
        if (location) {
            whereClause.location = { [Op.iLike]: `%${location}%` };
        }
        
        if (minRating) {
            whereClause.rating = { [Op.gte]: parseFloat(minRating) };
        }
        
        if (maxFees) {
            whereClause.fees = { [Op.lte]: parseInt(maxFees) };
        }
        
        if (search) {
            whereClause[Op.or] = [
                { name: { [Op.iLike]: `%${search}%` } },
                { specialization: { [Op.iLike]: `%${search}%` } },
                { bio: { [Op.iLike]: `%${search}%` } }
            ];
        }

        const lawyers = await Lawyer.findAll({
            where: whereClause,
            attributes: { exclude: ['password'] },
            order: [['rating', 'DESC']]
        });

        res.status(200).json(lawyers);
    } catch (error) {
        console.error("❌ Error fetching lawyers:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.getLawyerById = async (req, res) => {
    try {
        const { id } = req.params;
        const lawyer = await Lawyer.findByPk(id, {
            attributes: { exclude: ['password'] },
            include: [
                { model: Review, include: [{ model: require('../models/User'), attributes: ['name'] }] },
                { model: Availability }
            ]
        });

        if (!lawyer) {
            return res.status(404).json({ message: 'Lawyer not found' });
        }

        res.json(lawyer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.lawyerRegister = async (req, res) => {
    try {
        const { name, email, password, phone, specialization, experience, location, fees, bio, barCouncilId } = req.body;

        const existingLawyer = await Lawyer.findOne({ where: { email } });
        if (existingLawyer) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const lawyer = await Lawyer.create({
            name,
            email,
            password: hashedPassword,
            phone,
            specialization,
            experience,
            location,
            fees,
            bio,
            barCouncilId,
            isVerified: false,
            isActive: false
        });

        res.status(201).json({ message: 'Lawyer registered successfully. Awaiting verification.', lawyer: { id: lawyer.id, email: lawyer.email } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.lawyerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const lawyer = await Lawyer.findOne({ where: { email } });
        if (!lawyer) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, lawyer.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if (!lawyer.isVerified) {
            return res.status(403).json({ message: 'Account not verified yet' });
        }

        const token = jwt.sign({ id: lawyer.id, role: 'lawyer' }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({
            token,
            lawyer: {
                id: lawyer.id,
                name: lawyer.name,
                email: lawyer.email,
                specialization: lawyer.specialization
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateLawyerProfile = async (req, res) => {
    try {
        const lawyerId = req.user.id;
        const { name, phone, bio, fees, location } = req.body;

        await Lawyer.update(
            { name, phone, bio, fees, location },
            { where: { id: lawyerId } }
        );

        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
