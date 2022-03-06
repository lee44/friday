import dotenv from 'dotenv';

dotenv.config();

// Ensures user can only access route based on permission
export const verifyRole = (permission) => {
	return async (req, res, next) => {
		if (!req?.role) {
			return res.sendStatus(401);
		}

		if (!permission.includes(req.role)) {
			return res.sendStatus(401);
		}

		// User can only access his/her profile
		if (req.role === 'User' && req.id !== parseInt(req.params.id)) {
			return res.sendStatus(401);
		}

		next();
	};
};
