import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { generateAccessToken } from '../utils/generateTokens.js';
import { prismaClient } from '../utils/loadPrismaClient.js';

dotenv.config();

export const login = async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).send('Email and password are required');
	}

	try {
		const user = await prismaClient.user.findUnique({
			where: { email: email },
		});

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			res.sendStatus(401);
		}
		const accessToken = generateAccessToken(user);

		res.send({ success: true, role: user.role, accessToken: accessToken });
	} catch (error) {}
};
