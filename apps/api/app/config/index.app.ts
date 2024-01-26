import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './router';

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  }),
);

console.info(`environment: ${process.env.NODE_ENV}`);
app.use(router);
export default app;
