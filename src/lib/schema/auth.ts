import { z } from 'zod/mini'

export const signupSchema = z.object({
	name: z.string().check(z.minLength(4, 'Name must be at least 4 characters long')),
	email: z.email('Invalid email address'),
	password: z.string().check(z.minLength(8, 'Password must be at least 8 characters long')),
})

export const loginSchema = z.object({
	email: z.email('Invalid email address'),
	password: z.string().check(z.minLength(8, 'Password must be at least 8 characters long')),
})