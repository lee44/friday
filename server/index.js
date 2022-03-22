import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { verifyJWT } from './middleware/verifyJWT.js';
import authRouter from './routes/auth/authRouter.js';
import userRouter from './routes/user/userRouter.js';

const app = express();
app.use(express.json());

const whitelist = ['https://phenomenal-cupcake-76dcc9.netlify.app'];
const corsOptions = {
	credentials: true, // This is important.
	origin: (origin, callback) => {
		if (whitelist.includes(origin)) return callback(null, true);

		callback(new Error('Not allowed by CORS'));
	},
};

app.use(cors(corsOptions));
app.use(cookieParser());

// Routes all authentication routes
app.use('/api/auth', authRouter);

// Routes any api calls
app.use('/api', verifyJWT, userRouter);

app.listen(process.env.PORT || 5000, () => console.log(`Server Running on Port: http://localhost:5000`));
