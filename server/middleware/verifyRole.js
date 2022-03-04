import dotenv from 'dotenv';

dotenv.config();

export const verifyRole = (permission) => {
	return async (req, res, next) => {
		if (!req?.roles) {
			return res.sendStatus(401);
		}

		if (!permission.description === req.role) {
			return res.sendStatus(401);
		}

		// User can only access his/her profile
		if (permission.description !== 'Admin' && req.id !== parseInt(req.params.id)) {
			return res.sendStatus(401);
		}

		next();
	};
};
