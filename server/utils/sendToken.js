import { generateSignedJWT } from './generateSignedJWT.js';

const signedJWTAccessExpiration = '15m';
const signedJWTRefreshExpiration = '24h';

// cookie config for access token
const accessCookie = {
	maxAge: 15 * 60 * 1000, // 15 minutes
	httpOnly: true,
	secure: false,
	sameSite: true,
};

// cookie config for refresh token
const refreshCookie = {
	maxAge: 24 * 60 * 60 * 1000, // 24 hours
	httpOnly: true,
	secure: false,
	sameSite: true,
	path: '/api/refreshtoken',
};

/**
 * * Helper function to generate a access token and set it as a cookie header
 * @param {*} user contains id and role property that will be used to sign the token
 * @param {*} statusCode
 * @param {*} res
 */
export const sendAccessToken = (user, statusCode, res) => {
	const access_token = generateSignedJWT(user, signedJWTAccessExpiration);

	res.cookie('access_token', access_token, accessCookie);
	res.status(statusCode).send('Access token sent');
};

/**
 * * Helper function to generate a refresh token and set it as a cookie header
 * @param {*} user contains id and role property that will be used to sign the token
 * @param {*} statusCode
 * @param {*} res
 */
export const sendRefreshToken = (user, statusCode, res) => {
	const refresh_token = generateSignedJWT(user, signedJWTRefreshExpiration);

	res.cookie('refresh_token', refresh_token, refreshCookie);
	res.status(statusCode).send('Refresh token sent');
};

/**
 * * Helper function to generate a 2 signed JWT's and sets them as cookie headers
 * @param {*} user contains id and role property that will be used to sign the token
 * @param {*} statusCode
 * @param {*} res
 */
export const sendToken = (user, statusCode, res) => {
	const access_token = generateSignedJWT(user, signedJWTAccessExpiration);
	const refresh_token = generateSignedJWT(user, signedJWTRefreshExpiration);

	res.cookie('access_token', access_token, accessCookie);

	res.cookie('refresh_token', refresh_token, refreshCookie);

	//redux will store these properties
	res.status(statusCode).send({ id: user.id, name: user.name, role: user.role });
};
