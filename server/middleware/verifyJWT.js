import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

/**
 * * Middleware that verifies the JWT and passes the decoded user id and role to the next middleware
 */
export const verifyJWT = (req, res, next) => {
	const token = req?.cookies?.access_token ? req?.cookies?.access_token : req?.cookies?.refresh_token;

	if (!token) {
		console.log(token);
		return res.sendStatus(403);
	}
	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.sendStatus(403);
		}
		req.id = decoded.id;
		req.role = decoded.role;
		next();
	});
};
