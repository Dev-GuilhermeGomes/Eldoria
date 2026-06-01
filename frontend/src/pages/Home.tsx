import React from 'react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(245,216,132,0.24),_transparent_38%),linear-gradient(180deg,_#fffaf0_0%,_#ffffff_55%,_#fff8e8_100%)] dark:bg-[radial-gradient(circle_at_top,_rgba(245,216,132,0.12),_transparent_35%),linear-gradient(180deg,_#0f172a_0%,_#111827_55%,_#0b1220_100%)]">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center rounded-full border border-amber-200 bg-white/70 px-4 py-2 text-sm font-semibold text-amber-800 shadow-sm backdrop-blur dark:border-amber-700 dark:bg-slate-900/70 dark:text-amber-200">
              Leitura calma, design quente, acesso rápido
            </div>
            <h1 className="mt-6 text-5xl font-bold leading-tight text-slate-900 dark:text-white md:text-6xl font-serif">
              Bem-vindo ao <span className="text-amber-600 dark:text-amber-400">ViperBook</span>
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-slate-700 dark:text-slate-300">
              Descubra uma vasta coleção de livros curados especialmente para você. 
              Uma plataforma minimalista dedicada aos amantes de leitura.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/books"
                className="inline-flex items-center justify-center rounded-full bg-amber-200 px-8 py-3 font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-amber-300 dark:bg-amber-700 dark:text-white dark:hover:bg-amber-600"
              >
                Explorar Livros
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center rounded-full border-2 border-amber-200 px-8 py-3 font-semibold text-amber-900 transition hover:bg-amber-50 dark:border-amber-700 dark:text-amber-200 dark:hover:bg-slate-800"
              >
                Saber Mais
              </Link>
            </div>
          </div>
          <div className="text-center">
            <div className="mx-auto flex h-72 w-72 items-center justify-center rounded-[2rem] border border-amber-200 bg-white/70 shadow-2xl backdrop-blur dark:border-amber-700 dark:bg-slate-900/70">
              <div className="text-9xl animate-[float_5s_ease-in-out_infinite]">📚</div>
            </div>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
              Mergulhe no mundo dos livros
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="border-y border-amber-100 bg-white/80 py-20 dark:border-amber-900/60 dark:bg-slate-900/60">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-slate-900 dark:text-white font-serif">
            Por que ViperBook?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-base p-6 text-center border border-amber-100/70 dark:border-amber-900/50">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-white">Design Minimalista</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Interface limpa e intuitiva focada na experiência de leitura
              </p>
            </div>
            <div className="card-base p-6 text-center border border-amber-100/70 dark:border-amber-900/50">
              <div className="text-5xl mb-4">🌙</div>
              <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-white">Dark Mode</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Leia confortavelmente em qualquer altura do dia
              </p>
            </div>
            <div className="card-base p-6 text-center border border-amber-100/70 dark:border-amber-900/50">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-white">Responsivo</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Funciona perfeitamente em mobile, tablet e desktop
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-100 py-16 dark:from-amber-900 dark:via-slate-800 dark:to-amber-950">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white font-serif">
            Pronto para descobrir seu próximo grande livro?
          </h2>
          <Link
            to="/books"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-8 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-900"
          >
            Começar a Explorar
          </Link>
        </div>
      </div>
    </div>
  );
};
