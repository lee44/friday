import express from 'express';
import { ROLES } from '../../config/roles.js';
import { getUser, getUsers } from '../../controllers/userController.js';
import { verifyRole } from '../../middleware/verifyRole.js';

const router = express.Router();

router.get('/users', verifyRole(ROLES.ADMIN), getUsers);
router.get('/user/:id', verifyRole(ROLES.USER), getUser);

export default router;
