export const logout = (req, res, next) => {
	res.clearCookie('access_token');
	res.clearCookie('refresh_token', { path: '/api/refreshtoken' });
	res.sendStatus(200);
};
