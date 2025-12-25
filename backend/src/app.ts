import express from 'express'
import authRouter from './modules/global/auth/authRouter';
import instituteRouter from './modules/features/institute/instituteRoutes';
import courseRouter from './modules/features/institute/course/courseRoutes';
import categoryRoute from './modules/features/institute/category/categoryRoute';
import teacherRouter from './modules/features/institute/teacher/teacherRoutes';
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
app.use("/api/institute/category", categoryRoute);

// console.log("✅ step: TEACHER ROUTER TRIGGERED")
app.use("/api/institute/teacher", teacherRouter);

export default app;