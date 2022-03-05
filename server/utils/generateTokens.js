import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const generateAccessToken = (user) => {
	return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
};
export const generateRefreshToken = (user) => {
	return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_REFRESH_SECRET, { expiresIn: '24h' });
};
