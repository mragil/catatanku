import { z } from 'zod/mini'

import { redirect } from '@sveltejs/kit';

import { query, form, getRequestEvent } from '$app/server';
import { db } from '$lib/server/db'
import * as table from '$lib/server/db/schema';
import { and, eq } from 'drizzle-orm';
import { createNoteSchema } from '$lib/schema/notes';

function requireAuth() {
	const { locals } = getRequestEvent()

	if (!locals.user) {
		redirect(307, '/auth/login')
	}

	return locals.user
}

export const getNotes = query(async () => {
  const user = requireAuth();
	return db.select().from(table.notes).where(eq(table.notes.userId, user.id));
});

export const getNoteById = query(z.number(), async (id: number) => {
  const user = requireAuth();
	const note = await db.select().from(table.notes).where(and(
    eq(table.notes.id, id),
    eq(table.notes.userId, user.id)
  )).then((res) => res[0]);

	if (!note) {
		throw new Error('Note not found');
	}

	return note;
});

export const createNote = form(createNoteSchema,
	async (data) => {
    const user = requireAuth();
    const note = await db.insert(table.notes).values({
      ...data,
      userId: user.id,
    }).returning().then((res) => res[0]);

    throw redirect(303, `/notes/${note.id}`);
	}
);