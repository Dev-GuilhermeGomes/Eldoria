import React from 'react';
import { FiGithub, FiLinkedin, FiMail, FiExternalLink } from 'react-icons/fi';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-800 border-t border-amber-200 dark:border-amber-700 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-4">FalltoBook</h3>
            <p className="text-slate-600 dark:text-slate-400">
              O universo original de Guilherme Gomes, escrito para ser vivido capítulo a capítulo.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-white mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li><a href="/" className="hover:text-amber-600 dark:hover:text-amber-400 transition">Home</a></li>
              <li><a href="/books" className="hover:text-amber-600 dark:hover:text-amber-400 transition">Livros</a></li>
              <li><a href="/about" className="hover:text-amber-600 dark:hover:text-amber-400 transition">Sobre</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-white mb-4">Siga-nos</h4>
            <div className="flex gap-4">
              <a href="https://github.com/Dev-GuilhermeGomes" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition">
                <FiGithub size={24} />
              </a>
              <a href="https://www.linkedin.com/in/guilherme-gomes-devviper/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition">
                <FiLinkedin size={24} />
              </a>
              <a href="mailto:guilherme.fggomes07@gmail.com" aria-label="Email" className="text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition">
                <FiMail size={24} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-white mb-4">Portfólio</h4>
            <a href="https://dev-guilhermegomes.github.io/portfolio/" target="_blank" rel="noreferrer" aria-label="Abrir portfólio" className="text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition">
              <FiExternalLink size={24} />
            </a>
          </div>
        </div>
        <div className="border-t border-amber-200 dark:border-amber-700 pt-8">
          <p className="text-center text-slate-600 dark:text-slate-400">
            &copy; 2026 FalltoBook. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
