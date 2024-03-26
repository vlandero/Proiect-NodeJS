import User from "../models/db/User.model";
import { Request, Response } from 'express';

const UNIQUE_CONSTRAINT_ERROR = 'SequelizeUniqueConstraintError';

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  try {
    const newUser = await User.create({ email, password });
    res.status(201).send({ message: 'User registered successfully', userId: newUser.id });
  } catch (error: any) {
    if (error.name === UNIQUE_CONSTRAINT_ERROR) {
      return res.status(400).send({ message: 'Email already in use.' });
    }
    console.log(error)
    res.status(500).send({ message: 'Failed to register user.' });
  }
  };