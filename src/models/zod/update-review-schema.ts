import { z } from 'zod';

export const updateReviewSchema = z.object({
  rating: z.number().min(1, { message: 'Rating must be at least 1' }).max(10, { message: 'Rating must be at most 5' }),
  content: z.string().min(1),
});

export const reviewUpdateSchema = updateReviewSchema.partial();
