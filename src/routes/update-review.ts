import { Response } from "express";
import { Review } from "../models/db/Review.model";
import { EnrichedRequest } from "../models/requests/enriched-request";

export const updateReview = async (req: EnrichedRequest, res: Response) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user!.id;
    
    const reviewToUpdate = await Review.findByPk(reviewId);

    if (!reviewToUpdate) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (reviewToUpdate.userId !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this review" });
    }

    await reviewToUpdate.update(req.body);

    res.status(200).json(reviewToUpdate);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error updating review", error: error.message });
  }
};