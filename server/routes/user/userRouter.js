import express from 'express';
import { ROLES } from '../../config/roles.js';
import { refreshToken } from '../../controllers/refreshTokenController.js';
import { deleteUser, getUser, getUsers, updateUser } from '../../controllers/userController.js';
import { verifyRole } from '../../middleware/verifyRole.js';

const router = express.Router();

router.get('/users', verifyRole(ROLES.ADMIN), getUsers);
router.get('/user/:id', verifyRole([ROLES.ADMIN, ROLES.USER]), getUser);
router.delete('/user/:id', verifyRole([ROLES.ADMIN, ROLES.USER]), deleteUser);
router.put('/user/:id', verifyRole([ROLES.ADMIN, ROLES.USER]), updateUser);

router.get('/refreshtoken', verifyRole([ROLES.ADMIN, ROLES.USER]), refreshToken);

export default router;
