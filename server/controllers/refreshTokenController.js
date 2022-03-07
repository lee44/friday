import { sendAccessToken } from '../utils/sendToken.js';

// sends a new access token
export const refreshToken = async (req, res, next) => {
	sendAccessToken({ id: req.id, role: req.role }, 200, res);
};
