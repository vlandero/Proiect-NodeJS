import { z } from 'zod';

export const updateReviewSchema = z.object({
  rating: z.number().optional(),
  content: z.string().optional(),
});

export const reviewUpdateSchema = updateReviewSchema.partial();
