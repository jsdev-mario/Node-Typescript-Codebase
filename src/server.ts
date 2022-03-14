import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';
import apiRouter from './routes';
import { CustomError } from '@utils/errors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

app.use('/api', apiRouter);

app.use((err: Error | CustomError, _: Request, res: Response, next: NextFunction) => {
    const status = err instanceof CustomError ? err.HttpStatus : StatusCodes.BAD_REQUEST;
    return res.status(status).json({
        error: err.message,
    });
});

app.get('*', (_: Request, res: Response) => {
    res.status(200).json({ message: 'Sever is running' });
});

export default app;
