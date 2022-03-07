import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

/**
 * * Generates a signed JWT
 * @param {*} user contains id and role property that will be signed in the JWT
 * @param {*} expiresIn expiration time of the JWT
 * @returns a signed JWT
 */
export const generateSignedJWT = (user, expiresIn) => {
	return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: expiresIn });
};
