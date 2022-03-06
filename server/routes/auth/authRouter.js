import express from 'express';
import { login } from '../../controllers/loginController.js';
import { logout } from '../../controllers/logoutController.js';
import { register } from '../../controllers/registerController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

export default router;
