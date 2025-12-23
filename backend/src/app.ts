import express from 'express'
import authRouter from './modules/global/auth/authRouter';
import instituteRouter from './modules/features/institute/instituteRoutes';
import courseRouter from './modules/features/institute/course/courseRoutes';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// console.log("✅ step: AUTH ROUTER TRIGGERED")
app.use("/api/auth", authRouter);

// console.log("✅ step: INSTITUTE ROUTER TRIGGERED")
app.use("/api/institute", instituteRouter);

// console.log("✅ step: COURSE ROUTER TRIGGERED")
app.use("/api/institute/course", courseRouter);

// console.log("✅ step: CATEGORY ROUTER TRIGGERED")
app.use("/api/institute/category", courseRouter);

export default app;