import express from 'express'
import authRouter from './modules/global/auth/authRouter';
const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);

export default app;