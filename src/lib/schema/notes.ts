import { z } from 'zod/mini';

export const createNoteSchema = z.object({ title: z.string(), content: z.string()});