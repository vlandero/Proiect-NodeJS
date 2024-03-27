import { Response, NextFunction } from 'express';
import { EnrichedRequest } from '../models/requests/enriched-request';

export const isAdmin = (req: EnrichedRequest, res: Response, next: NextFunction) => {
  const isAdmin = req.user?.admin;

  console.log(req.user);
  if (!isAdmin) {
    return res.status(403).send({ message: 'You are not authorized to perform this action' });
  }

  return next();
};
