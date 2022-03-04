import express from 'express';
import { getUser, getUsers } from '../../controllers/auth/userController.js';
import { verify } from '../../middleware/verifyToken.js';

const router = express.Router();

router.get('/users', verify, getUsers);
router.get('/user/:id', getUser);

export default router;
