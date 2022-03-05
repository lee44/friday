import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

// Ensures JWT is authentic
export const verifyJWT = (req, res, next) => {
	const authHeader = req.headers.authorization || req.headers.Authorization;
	if (!authHeader?.startsWith('Bearer ')) {
		return res.sendStatus(403);
	}
	const token = authHeader.split(' ')[1];
	jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
		if (err) {
			return res.sendStatus(403);
		}
		req.id = decoded.id;
		req.roles = decoded.role;
		next();
	});
};
