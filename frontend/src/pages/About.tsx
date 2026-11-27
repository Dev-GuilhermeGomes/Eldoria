import React, { useCallback, useState } from 'react';
import { api } from '../services/api';

export const About: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await api.sendContactMessage(formData);
      setSubmitted(true);
      resetForm();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Erro ao enviar a mensagem.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Sobre Section */}
          <div className="card-base p-8">
            <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white font-serif">Sobre Eldoria</h2>
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
              <p>
                Eldoria é uma obra literária original criada por Guilherme Gomes. Este site reúne
                a história, personagens e capítulos numa experiência digital pensada para a leitura.
              </p>
              <p>
                A experiência de leitura inclui:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>Capítulos organizados pela ordem da história</li>
                <li>Tema claro ou escuro</li>
                <li>Controlos de tamanho e espaçamento do texto</li>
                <li>Informações sobre as personagens</li>
              </ul>
              <p>
                Explore o universo de Eldoria e acompanhe a história capítulo a capítulo.
              </p>
            </div>
          </div>

          {/* Formulário de Contacto */}
          <div className="card-base p-8">
            <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white font-serif">Entre em Contacto</h2>
            
            {submitted && (
              <div className="mb-4 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">
                ✓ Mensagem enviada com sucesso! Obrigado pelo contacto.
              </div>
            )}

            {error && (
              <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg">
                ✗ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-white">Nome</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-amber-200 bg-white px-4 py-2 text-slate-900 focus:border-amber-600 focus:outline-none dark:border-amber-700 dark:bg-slate-800 dark:text-white dark:focus:border-amber-400"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-white">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-amber-200 bg-white px-4 py-2 text-slate-900 focus:border-amber-600 focus:outline-none dark:border-amber-700 dark:bg-slate-800 dark:text-white dark:focus:border-amber-400"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-white">Assunto</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-amber-200 bg-white px-4 py-2 text-slate-900 focus:border-amber-600 focus:outline-none dark:border-amber-700 dark:bg-slate-800 dark:text-white dark:focus:border-amber-400"
                  placeholder="Assunto da mensagem"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-white">Mensagem</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full resize-none rounded-lg border border-amber-200 bg-white px-4 py-2 text-slate-900 focus:border-amber-600 focus:outline-none dark:border-amber-700 dark:bg-slate-800 dark:text-white dark:focus:border-amber-400"
                  placeholder="Sua mensagem..."
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-amber-200 px-4 py-2 font-semibold text-slate-900 transition hover:bg-amber-300 dark:bg-amber-700 dark:text-white dark:hover:bg-amber-600"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
