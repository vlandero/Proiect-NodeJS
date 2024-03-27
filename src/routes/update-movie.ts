import { Request, Response } from "express";
import { Movie } from "../models/db/Movie.model";

export const updateMovie = async (req: Request, res: Response) => {
  try {
    const movieId = req.params.id;

    const movieToUpdate = await Movie.findByPk(movieId);

    if (!movieToUpdate) {
      return res.status(404).json({ message: "Movie not found" });
    }
    await movieToUpdate.update({ ...movieToUpdate, ...req.body });

    res.status(200).json(movieToUpdate);
  } catch (error: any) {
    res
      .status(400)
      .json({ message: "Error updating movie", error: error.message });
  }
};
