import { prismaClient } from '../utils/loadPrismaClient.js';

export const getUsers = async (req, res, next) => {
	try {
		const users = await prismaClient.user.findMany();
		return res.status(200).send(users);
	} catch (error) {
		return res.send('Failed to load users');
	}
};

export const getUser = async (req, res, next) => {
	try {
		const user = await prismaClient.user.findUnique({
			where: { id: parseInt(req.params.id) },
		});

		return res.status(200).send(user);
	} catch (error) {
		return res.send('Failed to load user');
	}
};
