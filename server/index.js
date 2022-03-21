import cookieParser from 'cookie-parser';
import express from 'express';
import { verifyJWT } from './middleware/verifyJWT.js';
import authRouter from './routes/auth/authRouter.js';
import userRouter from './routes/user/userRouter.js';

const app = express();
app.use(express.json());

app.use(cookieParser());

app.get('/', (req, res) => {
	res.send('Hello from Express!');
});

// Routes all authentication routes
app.use('/api/auth', authRouter);

// Routes any api calls
app.use('/api', verifyJWT, userRouter);

app.listen(process.env.PORT || 5000, () => console.log(`Server Running on Port: http://localhost:5000`));
