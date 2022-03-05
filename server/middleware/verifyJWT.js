import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

// Ensures JWT is authentic
export const verifyJWT = (req, res, next) => {
	const token = req?.cookies?.access_token;

	if (!token) {
		return res.sendStatus(403);
	}
	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.sendStatus(403);
		}
		req.id = decoded.id;
		req.roles = decoded.role;
		next();
	});
};
