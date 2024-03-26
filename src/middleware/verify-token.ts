import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserDTO } from '../models/dto/UserDTO.model';
import { EnrichedRequest } from '../models/requests/enriched-request';

const SECRET_KEY = process.env.JWT_SECRET!;

export const verifyToken = (req: EnrichedRequest, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).send({ message: 'A token is required for authentication' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as UserDTO;
    req.user = decoded;
  } catch (err) {
    return res.status(401).send({ message: 'Invalid Token' });
  }

  return next();
};
