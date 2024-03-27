import { Movie } from "../db/Movie.model";
import { ReviewDTO } from "./ReviewDTO.model";

export class MovieDTO {
    id!: number;
    title!: string;
    coverImage?: string;
    rating?: number;
    totalReviews?: number;
    reviews?: ReviewDTO[];
    date_added!: Date;
    date_updated!: Date;

    constructor(movie: Movie){
        this.id = movie.id;
        this.title = movie.title;
        this.coverImage = movie.coverImage;
        this.reviews = movie.reviews?.map(review => new ReviewDTO(review));
        this.date_added = movie.createdAt;
        this.date_updated = movie.updatedAt;
        if (this.reviews) {
            this.rating = this.reviews.reduce((acc, review) => acc + review.rating, 0) / this.reviews.length;
            this.totalReviews = this.reviews.length;
        }
    }
  }
  