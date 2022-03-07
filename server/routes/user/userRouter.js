import express from 'express';
import { ROLES } from '../../config/roles.js';
import { refreshToken } from '../../controllers/refreshTokenController.js';
import { deleteUser, getUser, getUsers, updateUser } from '../../controllers/userController.js';
import { verifyRole } from '../../middleware/verifyRole.js';

const router = express.Router();

// Gets all users
router.get('/users', verifyRole(ROLES.ADMIN), getUsers);

// Gets a user with id that matches the parameter id
router.get('/user/:id', verifyRole([ROLES.ADMIN, ROLES.USER]), getUser);

// Deletes a user with id that matches the parameter id
router.delete('/user/:id', verifyRole([ROLES.ADMIN, ROLES.USER]), deleteUser);

// Updates a user with id that matches the parameter id
router.put('/user/:id', verifyRole([ROLES.ADMIN, ROLES.USER]), updateUser);

// Refreshes the access token
router.get('/refreshtoken', verifyRole([ROLES.ADMIN, ROLES.USER]), refreshToken);

export default router;
