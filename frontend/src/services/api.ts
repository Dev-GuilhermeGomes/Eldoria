const API_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') || '';

export const api = {
  async sendContactMessage(payload: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) {
    const response = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Não foi possível enviar a mensagem.');
    }

    return response.json();
  },

  async login(email: string, password: string) {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error('Email ou password inválidos.');
    return response.json();
  },

  async getProfile(token: string) {
    const response = await fetch(`${API_URL}/api/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Sessão inválida.');
    return response.json();
  },

  async getBooks() {
    const response = await fetch(`${API_URL}/api/books`);
    if (!response.ok) throw new Error('Não foi possível carregar os livros.');
    return response.json();
  },

  async getChapters(bookId: string) {
    const response = await fetch(`${API_URL}/api/books/${bookId}/chapters`);
    if (!response.ok) throw new Error('Não foi possível carregar os capítulos.');
    return response.json();
  },

  async getChapter(bookId: string, number: number) {
    const response = await fetch(`${API_URL}/api/books/${bookId}/chapters/${number}`);
    if (!response.ok) throw new Error('Capítulo não encontrado.');
    return response.json();
  },

  async createChapter(token: string, bookId: string, payload: {
    number: number;
    title: string;
    content: string;
    image?: string;
  }) {
    const response = await fetch(`${API_URL}/api/admin/books/${bookId}/chapters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => null);
      throw new Error(error?.message || 'Não foi possível criar o capítulo.');
    }
    return response.json();
  },

  async deleteChapter(token: string, id: string) {
    const response = await fetch(`${API_URL}/api/admin/chapters/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Não foi possível remover o capítulo.');
    return response.json();
  }
};
