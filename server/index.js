import express from 'express';
import authRouter from './routes/auth/authRouter.js';
import userRouter from './routes/user/userRouter.js';

const app = express();
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api', userRouter);

app.listen(5000, () => console.log(`Server Running on Port: http://localhost:5000`));
