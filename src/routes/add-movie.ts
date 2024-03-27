import { Request, Response } from 'express';
import { Movie } from '../models/db/Movie.model';

export const addMovie = async (req: Request, res: Response) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (error: any) {
    res.status(400).json({ message: 'Error adding movie', error: error.message });
  }
};
