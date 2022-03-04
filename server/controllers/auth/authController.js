import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { prismaClient } from '../../utils/loadPrismaClient.js';

dotenv.config();

export const signup = async (req, res, next) => {
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

export const login = async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		// return next(new ErrorResponse('Please provide an email and password', 400));
	}

	try {
		const user = await prismaClient.user.findUnique({
			where: { email: email },
		});

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			res.send({ success: false, message: 'Login Failed' });
		}
		const accessToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);

		res.send({ success: true, role: user.role, accessToken: accessToken });
	} catch (error) {}
};
