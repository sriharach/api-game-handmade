import { Request, Response, NextFunction } from "express";

interface IError extends Error {
  statusCode?: number,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (err: IError, _req: Request, res: Response, _next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        error: {
            status_code: statusCode,
            message: err.message,
        },
    });

}