import pkg from '@prisma/client';
import bcrypt from 'bcryptjs';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export const signup = async (req, res, next) => {
	const { name, email, password, role } = req.body;
	try {
		const user = await prisma.user.findFirst({
			where: { name: name },
		});

		if (user) {
			res.send({ success: false, message: 'Email exists' });
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		await prisma.user.create({
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
		const hashedPassword = await prisma.user.findUnique({
			where: { email: email },
			select: { password: true },
		});

		const isMatch = await bcrypt.compare(password, hashedPassword.password);
		if (!isMatch) {
			res.send({ success: false, message: 'Login Failed' });
		}
		res.send(hashedPassword);
	} catch (error) {}
};
