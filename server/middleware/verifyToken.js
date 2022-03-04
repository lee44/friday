import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { prismaClient } from '../utils/loadPrismaClient.js';

dotenv.config();

export const verify = async (req, res, next) => {
	const authHeader = req.header.authorization;

	if (authHeader) {
		const token = authHeader.split(' ')[1];

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			const user = await prismaClient.user.findUnique({ where: { id: decoded.id } });

			if (!user) {
				return res.status(403).json('No user found with this id');
			}

			req.user = user;

			next();
		} catch (err) {
			return res.status(401).json('Not authorized to access the resource');
		}
	} else {
		return res.status(401).json('Not authorized to access the resource');
	}
};
