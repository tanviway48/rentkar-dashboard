"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_model_1 = __importDefault(require("../models/User.model"));
const auth = async (req, res, next) => {
    const header = req.headers.authorization;
    if (!header)
        return res.status(401).json({ message: 'Missing token' });
    const token = header.split(' ')[1];
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await User_model_1.default.findById(payload.id);
        if (!user)
            return res.status(401).json({ message: 'Invalid token' });
        req.user = user;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
exports.auth = auth;
const requireRole = (role) => (req, res, next) => {
    if (!req.user)
        return res.status(401).json({ message: 'No user' });
    if (req.user.role !== role)
        return res.status(403).json({ message: 'Forbidden' });
    next();
};
exports.requireRole = requireRole;
