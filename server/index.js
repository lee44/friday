import cookieParser from 'cookie-parser';
import express from 'express';
import { verifyJWT } from './middleware/verifyJWT.js';
import authRouter from './routes/auth/authRouter.js';
import userRouter from './routes/user/userRouter.js';

const app = express();
app.use(express.json());

app.use(cookieParser());

// Routes all authentication routes
app.use('/api/auth', authRouter);

// Routes any api calls
app.use('/api', verifyJWT, userRouter);

app.listen(5000, () => console.log(`Server Running on Port: http://localhost:5000`));
