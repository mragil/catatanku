import { z } from 'zod/mini'

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

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getNotes = query(async () => {
  delay(5000);
	return db;
});

export const getNoteById = query(z.string(), async (id: string) => {
	const note = db.find(n => n.id === id);

	if (!note) {
		throw new Error('Note not found');
	}

	return note;
});

export const createNote = form(
	z.object({ title: z.string(), content: z.string() }),
	async (data, issue) => {
		if(db.find(n => n.title === data.title)) {
			invalid(issue.title('Title already exists'));
		}
		db.push({...data, createdAt: new Date().toISOString(), lastEditedAt: new Date().toISOString(), id: String(db.length + 1)});
	}
);