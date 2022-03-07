import dotenv from 'dotenv';

dotenv.config();

/**
 * * Middleware that ensures user can only access route based on permissions
 * @param {*} permission array containing roles that have permission to access route
 */
export const verifyRole = (permission) => {
	return async (req, res, next) => {
		if (!req?.role) {
			return res.sendStatus(401);
		}

		if (!permission.includes(req.role)) {
			return res.sendStatus(401);
		}

		// Ensures users with User Role can only access their profile
		if (req.role === 'User' && req.id !== parseInt(req.params.id)) {
			return res.sendStatus(401);
		}

		next();
	};
};
