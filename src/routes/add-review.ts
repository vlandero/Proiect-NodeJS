import { Response } from "express";
import { Review } from "../models/db/Review.model";
import { EnrichedRequest } from "../models/requests/enriched-request";

export const addReview = async (req: EnrichedRequest, res: Response) => {
  try { // TODO unique review per user per movie
    const userId = req.user!.id;
    const review = await Review.create({ ...req.body, userId });
    res.status(201).json(review);
  } catch (error: any) {
    res
      .status(400)
      .json({ message: "Error adding review", error: error.message });
  }
};
