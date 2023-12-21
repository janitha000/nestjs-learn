import { NextFunction, Request, Response } from 'express';

export function ErrorLoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(res.statusMessage);
  next();
}
