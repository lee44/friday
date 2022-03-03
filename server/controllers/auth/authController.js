export const signup = async (req, res, next) => {
	const { username, email, password } = req.body;
	try {
		// const user = await User.findOne({ email });
		// if (user) {
		// 	res.send({ success: false, message: 'Email exists' });
		// }
		// user = new User({ username, email, password });
		// console.log('User Registered');
		// const token = user.getSignedJwtToken();
		// const refreshToken = user.getSignedRefreshToken();
		// user.refreshToken.push({ refreshToken });
		// await user.save();
		// res.cookie('refreshToken', refreshToken, cookieOptions);
		// res.send({ success: true, username: username, token: token });
	} catch (err) {
		next(err);
	}
};

export const login = (req, res, next) => {};

export const logout = (req, res, next) => {
	const { signedCookies = {} } = req;
	const { refreshToken } = signedCookies;
	// User.findById(req.user._id).then(
	// 	(user) => {
	// 		const tokenIndex = user.refreshToken.findIndex((item) => item.refreshToken === refreshToken);

	// 		if (tokenIndex !== -1) {
	// 			user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove();
	// 			user.save((err, user) => {
	// 				if (err) {
	// 					res.statusCode = 500;
	// 					res.send(err);
	// 				} else {
	// 					res.clearCookie('refreshToken', cookieOptions);
	// 					res.send({ success: true });
	// 				}
	// 			});
	// 		} else {
	// 			res.send('Already Logged Out');
	// 		}
	// 	},
	// 	(err) => next(err)
	// );
};
