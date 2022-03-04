import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { prismaClient } from '../utils/loadPrismaClient.js';

dotenv.config();

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
		await prismaClient.user.create({
			data: {
				name: name,
				email: email,
				password: hashedPassword,
				role: role,
			},
		});

		res.send({ success: true });
	} catch (error) {
		next(error);
	}
};
