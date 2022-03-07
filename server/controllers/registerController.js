import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { prismaClient } from '../utils/loadPrismaClient.js';
import { sendToken } from '../utils/sendToken.js';

dotenv.config();

/**
 * Registers user by finding if user exists, if not it will create a new record in database
 * Hashes password before storing into database
 */
export const register = async (req, res, next) => {
	const { name, email, password, role } = req.body;
	try {
		const user = await prismaClient.user.findUnique({
			where: { email: email },
		});

		if (user) {
			res.send({ success: false, message: 'Email exists' });
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const newUser = await prismaClient.user.create({
			data: {
				name: name,
				email: email,
				password: hashedPassword,
				role: role,
			},
		});

		sendToken(newUser, 200, res);
	} catch (error) {
		next(error);
	}
};
