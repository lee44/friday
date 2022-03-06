import { sendAccessToken } from '../utils/sendToken.js';

export const refreshToken = async (req, res, next) => {
	sendAccessToken({ id: req.id, role: req.role }, 200, res);
};
