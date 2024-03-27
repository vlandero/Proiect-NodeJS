import { Request, Response } from 'express';
import { Movie } from '../models/db/Movie.model';

export const addMovie = async (req: Request, res: Response) => {
  try {
    const movieToCreate = req.body;
    const movie = await Movie.create(movieToCreate);
    res.status(201).json(movie);
  } catch (error: any) {
    res.status(400).json({ message: 'Error adding movie', error: error.message });
  }
};
