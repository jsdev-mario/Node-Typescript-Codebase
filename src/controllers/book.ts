import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

const { OK } = StatusCodes;

const find = (req: Request, res: Response) => {
    return res.status(OK).json({});
};

export default {
    find,
} as const;
