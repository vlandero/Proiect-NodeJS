import { Request, Response } from "express";
import { Movie } from "../models/db/Movie.model";
import { GroupedCountResultItem, col, fn } from "sequelize";
import { MovieInListDTO } from "../models/dto/MovieInListDTO.model";
import { Review } from "../models/db/Review.model";

type FilterType = "date_added" | "top_rated" | "most_reviewed";

export const getMovies = async (req: Request, res: Response) => {
  const page: number = parseInt(req.query.page as string) || 1;
  const limit: number = parseInt(req.query.limit as string) || 10;
  const filter: FilterType = (req.query.filter as FilterType) || "date_added";
  const offset = (page - 1) * limit;

  let order: any;
  switch (filter) {
    case "top_rated":
      order = [[fn("AVG", col("reviews.rating")), "DESC NULLS LAST"]];
      break;
    case "most_reviewed":
      order = [[fn("COUNT", col("reviews.id")), "DESC"]];
      break;
    case "date_added":
    default:
      order = [["createdAt", "DESC"]];
      break;
  }
  try {
    const { rows: movies, count } = await Movie.findAndCountAll({
      limit,
      offset,
      include: [
        {
          model: Review,
          required: false,
          duplicating: false,
          subQuery: false,
        },
      ],
      order,
      group: ["Movie.id", "reviews.id"],
    });

    const toSend: MovieInListDTO[] = movies.map((m) => new MovieInListDTO(m));

    res.status(200).json({
      movies: toSend,
      currentPage: page,
      totalPages: Math.ceil(count.length / limit),
      totalMovies: count,
    });
  } catch (error: any) {
    res
      .status(400)
      .json({ message: "Error fetching movies", error: error.message });
  }
};
