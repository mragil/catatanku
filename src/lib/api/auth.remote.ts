import { redirect, invalid } from '@sveltejs/kit'
import { form, getRequestEvent, query } from '$app/server'
import { auth } from '$lib/server/auth'
import { signupSchema, loginSchema } from '$lib/schema/auth'

export const signup = form(signupSchema, async (user) => {
	await auth.api.signUpEmail({ body: user });
	redirect(307, `/notes`);
});

export const login = form(loginSchema, async (user) => {
	const { request } = getRequestEvent();
	try {
		await auth.api.signInEmail({ body: user, headers: request.headers });
	} catch (e) {
		console.log(e);
		invalid('Invalid email or password');
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