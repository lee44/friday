import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { prismaClient } from '../utils/loadPrismaClient.js';
import { sendToken } from '../utils/sendToken.js';

dotenv.config();

/**
 * Logs in user and uses bcrypt to compare hashed password to password provided by user
 */
export const login = async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).send('Email and password are required');
	}

	try {
		const user = await prismaClient.user.findFirst({
			where: { email: email },
		});

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			res.sendStatus(401);
		}

		sendToken(user, 200, res);
	} catch (error) {}
};
