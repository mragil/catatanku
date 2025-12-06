import type { Notes } from '$lib/types/notes';

import notes from './notes.json';

const database = {
  getById: (id: string): Notes | null => notes.find((note) => note.id === id) ?? null,
  getByTitle: (title: string): Notes | null => notes.find((note) => note.title === title) ?? null,
  list: (): Notes[] => notes,
  create: (data: Omit<Notes, 'id' | 'createdAt' | 'lastEditedAt'>): Notes => {
    const newNote: Notes = {
      id: Math.max(0, notes.length+1).toString(),
      createdAt: new Date().toISOString(),
      lastEditedAt: new Date().toISOString(),
      ...data,
    };
    notes.push(newNote);

    return newNote;
  }
};

export default database;