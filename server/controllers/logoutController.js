// Clears all cookies that store access and refresh token
export const logout = (req, res, next) => {
	res.clearCookie('access_token');
	res.clearCookie('refresh_token', { path: '/api/refreshtoken' });
	res.sendStatus(200);
};
