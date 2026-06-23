const User = require('../../users/models/user.model');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { fullName, email, username, password, phone, birthday, gender } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            return res.status(400).json({ 
                message: userExists.email === email ? 'Email already exists' : 'Username already exists' 
            });
        }

        // Create new user
        const user = await User.create({
            fullName,
            email,
            username,
            password,
            phone,
            birthday,
            gender
        });

        if (user) {
            res.status(201).json({
                message: 'User registered successfully',
                user: {
                    _id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    username: user.username
                }
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.fullName,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

module.exports = {
    register,
    login
};
