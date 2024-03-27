import { z } from 'zod';

export const updateMovieSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional()
});

export const movieUpdateSchema = updateMovieSchema.partial();
