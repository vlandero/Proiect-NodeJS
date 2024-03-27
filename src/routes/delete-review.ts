import { Request, Response } from "express";
import { Review } from "../models/db/Review.model";

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const reviewId = req.params.id;
    const reviewToDelete = await Review.findByPk(reviewId);
    if (!reviewToDelete) {
      return res.status(404).json({ message: "Review not found" });
    }

    await reviewToDelete.destroy();

    res.status(204).send();
  } catch (error: any) {
    res
      .status(400)
      .json({ message: "Error deleting review", error: error.message });
  }
};
