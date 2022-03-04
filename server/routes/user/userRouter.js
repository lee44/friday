import express from 'express';
import { ADMIN, USER } from '../../config/roles.js';
import { getUser, getUsers } from '../../controllers/auth/userController.js';
import { verifyRole } from '../../middleware/verifyRole.js';

const router = express.Router();

router.get('/users', verifyRole(ADMIN), getUsers);
router.get('/user/:id', verifyRole(USER), getUser);

export default router;
