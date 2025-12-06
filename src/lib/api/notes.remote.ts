import * as v from 'valibot';

import { invalid } from '@sveltejs/kit';

import { query, form } from '$app/server';
import db from '$lib/server/database';

export const getNotes = query(async () => {
	return db.list();
});

export const getNoteById = query(v.string(), async (id: string) => {
	const note = db.getById(id);

	if (!note) {
		throw new Error('Note not found');
	}

	return note;
});

export const createNote = form(
	v.object({ title: v.string(), content: v.string() }),
	async (data, issue) => {
		if(db.getByTitle(data.title)) {
			invalid(issue.title('Title already exists'));
		}
		console.log('Creating note with data:', data);
		db.create(data);
	}
);