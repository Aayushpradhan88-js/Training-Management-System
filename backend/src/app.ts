import express from 'express'
import authRouter from './modules/global/auth/authRouter';
import instituteRouter from './modules/features/institute/instituteRoutes';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);

// console.log("✅ step 2: INSTITUTE ROUTER")
app.use("/api/institute", instituteRouter);

export default app;