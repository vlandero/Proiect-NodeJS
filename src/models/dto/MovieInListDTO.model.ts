import { Movie } from "../db/Movie.model";

export class MovieInListDTO {
  id!: number;
  title!: string;
  coverImage?: string;
  rating?: number;
  totalReviews?: number;

  constructor(movie: Movie) {
    this.id = movie.id;
    this.title = movie.title;
    this.coverImage = movie.coverImage;
    if (movie.reviews) {
      this.rating =
        movie.reviews.reduce((acc, review) => acc + review.rating, 0) /
        movie.reviews.length;
      this.totalReviews = movie.reviews.length;
    }
  }
}
