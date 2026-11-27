import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

interface Chapter {
  _id: string;
  number: number;
  title: string;
  image?: string;
}

export const Admin: React.FC = () => {
  const [token, setToken] = useState(() => localStorage.getItem('falltobook-token') || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({ number: 1, title: '', content: '', image: '' });
  const [bookId, setBookId] = useState('');

  useEffect(() => {
    if (!token) return;
    api.getProfile(token)
      .then(profile => {
        if (profile.role !== 'admin') throw new Error('Esta conta não é administradora.');
        setAuthorized(true);
        loadBookAndChapters();
      })
      .catch(() => {
        localStorage.removeItem('falltobook-token');
        setToken('');
        setAuthorized(false);
      });
  }, [token]);

  const loadBookAndChapters = async () => {
    try {
      const books = await api.getBooks();
      const eldoria = books.books?.find((book: { title: string }) => book.title === 'Eldoria');
      if (!eldoria?._id) throw new Error('A obra Eldoria ainda não foi importada.');
      setBookId(eldoria._id);
      await loadChapters(eldoria._id);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Erro ao carregar a obra.');
    }
  };

  const loadChapters = async (id: string = bookId) => {
    try {
      const result = await api.getChapters(id);
      setChapters(result.chapters || []);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Erro ao carregar capítulos.');
    }
  };

  const login = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    try {
      const result = await api.login(email, password);
      localStorage.setItem('falltobook-token', result.token);
      setToken(result.token);
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Erro ao iniciar sessão.');
    }
  };

  const createChapter = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    try {
      await api.createChapter(token, bookId, form);
      setForm({ number: form.number + 1, title: '', content: '', image: '' });
      setSuccess('Capítulo criado com sucesso.');
      await loadChapters();
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : 'Erro ao criar capítulo.');
    }
  };

  const removeChapter = async (id: string) => {
    if (!window.confirm('Remover este capítulo?')) return;
    try {
      await api.deleteChapter(token, id);
      await loadChapters();
    } catch (removeError) {
      setError(removeError instanceof Error ? removeError.message : 'Erro ao remover capítulo.');
    }
  };

  if (!authorized) {
    return (
      <div className="mx-auto max-w-md px-6 py-16">
        <form onSubmit={login} className="card-base space-y-4 p-6">
          <h1 className="text-3xl font-serif font-bold">Administração</h1>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <input className="w-full rounded border p-3" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input className="w-full rounded border p-3" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button className="w-full rounded bg-slate-950 px-4 py-3 font-semibold text-white" type="submit">Entrar</button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-serif font-bold">Gerir Eldoria</h1>
      {error && <p className="mb-4 text-red-600">{error}</p>}
      {success && <p className="mb-4 text-green-700">{success}</p>}
      <form onSubmit={createChapter} className="card-base mb-10 grid gap-4 p-6 md:grid-cols-2">
        <input className="rounded border p-3" type="number" min="1" value={form.number} onChange={e => setForm({ ...form, number: Number(e.target.value) })} required />
        <input className="rounded border p-3" placeholder="Título" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
        <input className="rounded border p-3 md:col-span-2" placeholder="URL da imagem" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
        <textarea className="min-h-64 rounded border p-3 md:col-span-2" placeholder="Conteúdo do capítulo" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required />
        <button className="rounded bg-amber-600 px-6 py-3 font-semibold text-white md:col-span-2" type="submit">Adicionar capítulo</button>
      </form>
      <div className="space-y-3">
        {chapters.map(chapter => (
          <div key={chapter._id} className="card-base flex items-center justify-between p-4">
            <span>Capítulo {chapter.number}: {chapter.title}</span>
            <button className="rounded border border-red-300 px-3 py-2 text-red-700" type="button" onClick={() => removeChapter(chapter._id)}>Remover</button>
          </div>
        ))}
      </div>
    </div>
  );
};
