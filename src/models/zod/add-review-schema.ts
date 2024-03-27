import { z } from 'zod';

export const reviewSchema = z.object({
  rating: z.number().min(1, { message: 'Rating must be at least 1' }).max(10, { message: 'Rating must be at most 5' }),
  content: z.string().min(1),
  movieId: z.number()
});

export const reviewUpdateSchema = reviewSchema.partial();
