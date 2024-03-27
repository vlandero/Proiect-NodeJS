import { Request, Response } from "express";
import { Review } from "../models/db/Review.model";
import { Movie } from "../models/db/Movie.model";

export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const movieId = req.params.id;

    const movieToDelete = await Movie.findByPk(movieId, {
      include: [Review],
    });

    if (!movieToDelete) {
      return res.status(404).json({ message: "Movie not found" });
    }

    await Review.destroy({ where: { movieId } });

    await movieToDelete.destroy();

    res.status(204).send();
  } catch (error: any) {
    res
      .status(400)
      .json({ message: "Error deleting movie", error: error.message });
  }
};
