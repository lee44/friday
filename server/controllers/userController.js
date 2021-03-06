import { prismaClient } from '../utils/loadPrismaClient.js';

/**
 * Updates a user
 * TODO: Might need to check if name exists
 * @returns OK status code
 */
export const updateUser = async (req, res) => {
	try {
		await prismaClient.user.update({
			where: { id: parseInt(req.params.id) },
			data: { name: req.body.name },
		});
		return res.sendStatus(200);
	} catch (error) {
		return res.status(404).send('Failed to update user');
	}
};

/**
 * Deletes a user
 * @returns OK status code
 */
export const deleteUser = async (req, res) => {
	try {
		await prismaClient.user.delete({
			where: { id: parseInt(req.params.id) },
		});
		return res.sendStatus(200);
	} catch (error) {
		return res.status(404).send('Failed to delete user');
	}
};

/**
 * Fetches all users
 * @returns users
 */
export const getUsers = async (req, res) => {
	try {
		const users = await prismaClient.user.findMany({
			select: { id: true, name: true, email: true, role: true },
		});
		return res.status(200).send(users);
	} catch (error) {
		return res.status(404).send('Failed to load users');
	}
};

/**
 * Fetches a user
 * @returns a user
 */
export const getUser = async (req, res) => {
	try {
		const user = await prismaClient.user.findUnique({
			where: { id: parseInt(req.params.id) },
			select: { id: true, name: true, email: true, role: true },
		});
		let userArray = [];
		userArray.push(user);
		return res.status(200).send(userArray);
	} catch (error) {
		return res.status(404).send('Failed to load user');
	}
};
