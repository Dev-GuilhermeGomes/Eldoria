import React from 'react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-800 border-t border-amber-200 dark:border-amber-700 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-4">ViperBook</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Uma plataforma de biblioteca de livros minimalista e moderna.
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
              <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition">
                <FiGithub size={24} />
              </a>
              <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition">
                <FiLinkedin size={24} />
              </a>
              <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition">
                <FiMail size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-amber-200 dark:border-amber-700 pt-8">
          <p className="text-center text-slate-600 dark:text-slate-400">
            &copy; 2026 ViperBook. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
