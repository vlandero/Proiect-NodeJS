import { Request, Response } from "express";
import { Movie } from "../models/db/Movie.model";
import { MovieDTO } from "../models/dto/MovieDTO.model";

export const getMovie = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const movie = await Movie.findByPk(id, { include: ["reviews"] });
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.status(200).json(new MovieDTO(movie));
  } catch (error: any) {
    res
      .status(400)
      .json({ message: "Error fetching movie", error: error.message });
  }
};
