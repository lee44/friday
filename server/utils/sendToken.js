import { generateSignedJWT } from './generateSignedJWT.js';

const signedJWTAccessExpiration = '30min';
const signedJWTRefreshExpiration = '24h';

const accessCookie = {
	maxAge: 60 * 60 * 1000, // 1 hour
	httpOnly: true,
	secure: false,
	sameSite: true,
};

const refreshCookie = {
	maxAge: 7 * 24 * 60 * 60 * 1000, // 1 Week
	httpOnly: true,
	secure: false,
	sameSite: true,
	path: '/api/auth/refresh_token',
};

export const sendAccessToken = (user, statusCode, res) => {
	const access_token = generateSignedJWT(user, signedJWTAccessExpiration);

	res.cookie('access_token', access_token, accessCookie);
	res.status(statusCode).send('Access token sent');
};

export const sendRefreshToken = (user, statusCode, res) => {
	const refresh_token = generateSignedJWT(user, signedJWTRefreshExpiration);

	res.cookie('refresh_token', refresh_token, refreshCookie);
	res.status(statusCode).send('Refresh token sent');
};

export const sendToken = (user, statusCode, res) => {
	const access_token = generateSignedJWT(user, signedJWTAccessExpiration);
	const refresh_token = generateSignedJWT(user, signedJWTRefreshExpiration);

	res.cookie('access_token', access_token, accessCookie);

	res.cookie('refresh_token', refresh_token, refreshCookie);

	res.status(statusCode).send({ id: user.id, name: user.name, role: user.role });
};
