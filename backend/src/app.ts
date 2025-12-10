import express from 'express'
import authRouter from './modules/global/auth/authRouter';
import instituteRouter from './modules/features/institute/instituteRoutes';
const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/institute", instituteRouter);

export default app;