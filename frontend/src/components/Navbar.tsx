import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiMoon, FiSun } from 'react-icons/fi';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleNavClick = () => {
    setIsOpen(false);
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/books', label: 'Livros' },
    { to: '/characters', label: 'Personagens' },
    { to: '/about', label: 'Sobre e Contacto' },
  ];

  const linkClass = 'text-lg font-serif text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 transition';

  return (
    <>
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 border-b border-amber-200 dark:border-amber-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/" className="text-2xl font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 transition" onClick={handleNavClick}>
            ViperBook
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="inline-flex items-center justify-center rounded-lg border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-slate-800 p-2 text-slate-700 dark:text-slate-200"
              aria-label="Alternar tema"
            >
              {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-lg border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-slate-800 p-2 text-slate-700 dark:text-slate-200"
              aria-label="Abrir menu"
            >
              {isOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="border-t border-amber-200 dark:border-amber-700 bg-white dark:bg-slate-900 px-4 py-4 shadow-lg">
            <div className="flex flex-col gap-4">
              {navLinks.map((item) => (
                <Link key={item.to} to={item.to} className={linkClass} onClick={handleNavClick}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <nav className="hidden md:fixed md:left-0 md:top-0 md:flex md:h-screen md:w-64 md:flex-col md:justify-between md:border-r md:border-amber-200 md:bg-white md:px-6 md:py-8 md:shadow-lg dark:md:border-amber-700 dark:md:bg-slate-800 z-50 max-w-full">
        <div>
          <Link to="/" className="mb-12 block text-3xl font-bold text-amber-600 transition hover:text-amber-700 dark:text-amber-400" onClick={handleNavClick}>
            📚 ViperBook
          </Link>

          <ul className="space-y-6">
            {navLinks.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={linkClass} onClick={handleNavClick}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-amber-200 px-4 py-2 font-semibold transition hover:bg-amber-300 dark:bg-amber-700 dark:hover:bg-amber-600"
          >
            {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            {isDark ? 'Light' : 'Dark'}
          </button>
        </div>
      </nav>
    </>
  );
};
