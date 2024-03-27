import { z } from 'zod';

export const movieSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  coverImage: z.string().optional(),
});

export const movieUpdateSchema = movieSchema.partial();
