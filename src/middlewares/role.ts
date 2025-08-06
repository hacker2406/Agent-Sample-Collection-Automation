import { Request, Response, NextFunction } from 'express';

export const hospitalOnly = (req: any, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'HOSPITAL') {
    return res.status(403).json({ message: 'Access denied. Hospital only.' });
  }
  next();
};
