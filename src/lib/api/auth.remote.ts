import { redirect, invalid } from '@sveltejs/kit'
import { form, getRequestEvent, query } from '$app/server'
import { auth } from '$lib/server/auth'
import { signupSchema, loginSchema } from '$lib/schema/auth'
import { APIError } from "better-auth";


export const signup = form(signupSchema, async (user) => {
	try {
		await auth.api.signUpEmail({ body: user });
	} catch (error) {
		console.log('ini err: ',error);
		let errorMessage = 'Failed to create account';
		if(error instanceof APIError) {
			errorMessage = error.message;
		}
		invalid(errorMessage);
	}
	redirect(307, `/notes`);
});

export const login = form(loginSchema, async (user) => {
	const { request } = getRequestEvent();
	try {
		await auth.api.signInEmail({ body: user, headers: request.headers });
	} catch (error) {
		console.log(error);
		let errorMessage = 'Invalid email or password';
		if(error instanceof APIError) {
			errorMessage = error.message;
		}
		invalid(errorMessage);
	}
	redirect(303, '/notes');
});

export const signout = form(async () => {
	const { request } = getRequestEvent();
	await auth.api.signOut({ headers: request.headers });
	redirect(303, '/');
});

export const getUser = query(async () => {
	const { locals } = getRequestEvent();
	if (!locals.user) {
		redirect(307, '/auth/login');
	}
	return locals.user;
});