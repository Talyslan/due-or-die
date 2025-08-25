import { Request, Response, NextFunction } from 'express';
import { APIError } from '../helpers/errors';

export function ErrorHandler(
    error: Error & Partial<APIError>,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const message = error.message || 'Internal server error!';
    const statusCode = error.statusCode || 500;

    console.log(error);

    return res.status(statusCode).json({ message });
}
