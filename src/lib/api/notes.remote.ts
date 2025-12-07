import * as v from 'valibot';

import { invalid } from '@sveltejs/kit';

import { query, form } from '$app/server';

const db = [
  {
    "id": "1",
    "title": "My first note",
    "content": "This is the content of my first note.",
    "createdAt": "2025-12-05T12:00:00Z",
    "lastEditedAt": "2025-12-05T10:00:00Z"
  },
  {
    "id": "2",
    "title": "Shopping list",
    "content": "Milk, Bread, Eggs, Butter",
    "createdAt": "2025-12-02T15:30:00Z",
    "lastEditedAt": "2025-12-02T16:30:00Z"
  }
];

export const getNotes = query(async () => {
	return db;
});

export const getNoteById = query(v.string(), async (id: string) => {
	const note = db.find(n => n.id === id);

	if (!note) {
		throw new Error('Note not found');
	}

	return note;
});

export const createNote = form(
	v.object({ title: v.string(), content: v.string() }),
	async (data, issue) => {
		if(db.find(n => n.title === data.title)) {
			invalid(issue.title('Title already exists'));
		}
		db.push({...data, createdAt: new Date().toISOString(), lastEditedAt: new Date().toISOString(), id: String(db.length + 1)});
	}
);