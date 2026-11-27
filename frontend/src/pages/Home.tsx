import React from 'react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(201,160,73,0.22),_transparent_30%),linear-gradient(180deg,_#faf7ef_0%,_#ffffff_58%,_#f7f1df_100%)] dark:bg-[radial-gradient(circle_at_top_right,_rgba(201,160,73,0.12),_transparent_35%),linear-gradient(180deg,_#111827_0%,_#17191e_55%,_#0b1220_100%)]">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center rounded-full border border-amber-300/70 bg-white/80 px-4 py-2 text-sm font-semibold text-amber-800 shadow-sm backdrop-blur dark:border-amber-700/70 dark:bg-slate-900/70 dark:text-amber-200">
              Saga fantástica original
            </div>
            <h1 className="mt-6 text-5xl font-bold leading-[1.05] text-slate-950 dark:text-white md:text-7xl font-serif">
              Entre no universo de <span className="text-amber-600 dark:text-amber-400">Eldoria</span>
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-slate-700 dark:text-slate-300">
              Uma jornada escrita por Guilherme Gomes, onde cada capítulo revela um mundo maior,
              personagens marcantes e escolhas que moldam a história.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/books"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-8 py-3.5 font-semibold text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-amber-700 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400"
              >
                Ler a Saga
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center rounded-full border-2 border-slate-950/15 px-8 py-3.5 font-semibold text-slate-900 transition hover:bg-white/70 dark:border-white/15 dark:text-white dark:hover:bg-slate-800"
              >
                Conhecer a saga
              </Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-8 rounded-full bg-amber-300/20 blur-3xl"></div>
            <img
              src="/cover-eldoria_01.svg"
              alt="Capa de Eldoria"
              className="relative mx-auto aspect-[4/5] w-[78%] rounded-[1.5rem] object-cover shadow-[0_30px_80px_rgba(76,55,24,0.25)]"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="border-y border-amber-100 bg-white/80 py-20 dark:border-amber-900/60 dark:bg-slate-900/60">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-slate-900 dark:text-white font-serif">
            Uma leitura feita para acompanhar a história
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-base p-6 text-center border border-amber-100/70 dark:border-amber-900/50">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-white">21 capítulos</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Percorra toda a saga pela ordem da história.
              </p>
            </div>
            <div className="card-base p-6 text-center border border-amber-100/70 dark:border-amber-900/50">
              <div className="text-5xl mb-4">🌙</div>
              <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-white">Leitura confortável</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Tema claro ou escuro e tamanho de texto ajustável.
              </p>
            </div>
            <div className="card-base p-6 text-center border border-amber-100/70 dark:border-amber-900/50">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-white">Personagens vivos</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Conheça os protagonistas e o seu papel em Eldoria.
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
