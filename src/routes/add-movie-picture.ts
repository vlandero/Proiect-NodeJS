import { Request, Response } from 'express';
import { Movie } from '../models/db/Movie.model';

export const addMoviePicture = async (req: Request, res: Response) => {
  try {
    const pic = req.file;
    if(pic?.fieldname !== 'coverImage'){
        return res.status(400).json({ message: 'Wrong field name' });
    }
    const movieToUpdate = await Movie.findByPk(req.params.id);
    if (!movieToUpdate) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    await movieToUpdate.update({ ...movieToUpdate, coverImage: pic?.filename });
    res.status(200).json(movieToUpdate);
  } catch (error: any) {
    res.status(400).json({ message: 'Error changing movie picture', error: error.message });
  }
};