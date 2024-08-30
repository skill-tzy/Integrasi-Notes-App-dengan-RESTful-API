const API_URL = 'https://notes-api.dicoding.dev/v2';

export const API_ENDPOINT = {
  notes: `${API_URL}/notes`,
  archived: `${API_URL}/notes/archived`,
  detail: (id) => `${API_URL}/notes/${id}`,
  addArchive: (id) => `${API_URL}/notes/${id}/archive`,
  addUnArchive: (id) => `${API_URL}/notes/${id}/unarchive`,
  delete: (id) => `${API_URL}/notes/${id}`,
};
