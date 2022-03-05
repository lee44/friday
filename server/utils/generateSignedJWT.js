import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const generateSignedJWT = (user, expiresIn) => {
	return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: expiresIn });
};
