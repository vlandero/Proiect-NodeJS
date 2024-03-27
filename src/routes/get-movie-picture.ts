import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { Movie } from "../models/db/Movie.model";

export const getMoviePicture = async (req: Request, res: Response) => {
  try {
    const movieId = req.params.id;
    const movie = await Movie.findByPk(movieId);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const filename = movie.coverImage;

    if (!filename) {
      return res
        .status(404)
        .json({ message: "Cover image not found for the movie" });
    }

    const filePath = path.join(__dirname, "..", "uploads", filename);

    const base64Data = fs.readFileSync(filePath, { encoding: "base64" });

    res.contentType("image/jpeg").send(Buffer.from(base64Data, "base64"));

  } catch (error: any) {
    res
      .status(400)
      .json({
        message: "Error retrieving movie picture",
        error: error.message,
      });
  }
};
