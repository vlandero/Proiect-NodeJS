import { Review } from "../db/Review.model";

export class ReviewDTO {
  id!: number;
  rating!: number;
  descrtiption!: string;

  constructor(review: Review) {
    this.id = review.id;
    this.rating = review.rating;
    this.descrtiption = review.content;
  }
}
