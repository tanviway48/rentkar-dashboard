"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_model_1 = __importDefault(require("../models/User.model"));
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email & password required' });
        }
        // Find user
        const user = await User_model_1.default.findOne({ email });
        if (!user || !user.passwordHash) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Compare password
        const isValid = await bcryptjs_1.default.compare(password, user.passwordHash);
        if (!isValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Ensure JWT secret exists
        const secret = process.env.JWT_SECRET;
        if (!secret)
            throw new Error('JWT_SECRET not set in environment');
        // Prepare payload
        const payload = { id: user._id };
        // Prepare options with type-safe expiresIn
        const expiresInEnv = process.env.JWT_EXPIRES_IN;
        const options = {
            expiresIn: expiresInEnv || '7d', // default to '7d'
        };
        // Sign token
        const token = jsonwebtoken_1.default.sign(payload, secret, options);
        // Return token & user info
        return res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.login = login;
