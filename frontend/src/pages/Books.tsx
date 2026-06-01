import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { eldoriaChapters, type Chapter } from '../data/eldoriaChapters';
import { FiSearch, FiHeart } from 'react-icons/fi';
import { AiFillHeart } from 'react-icons/ai';

export const Books: React.FC = () => {
  const [filteredChapters, setFilteredChapters] = useState<Chapter[]>(eldoriaChapters);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('number');
  const [likedChapters, setLikedChapters] = useState<Set<string>>(new Set());

  useEffect(() => {
    applyFilters(search, sort);
  }, [sort]);

  const applyFilters = (searchValue: string, sortValue: string) => {
    let nextChapters = [...eldoriaChapters];

    if (sortValue === 'title') {
      nextChapters.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      nextChapters.sort((a, b) => a.number - b.number);
    }

    if (searchValue.trim()) {
      const searchTerm = searchValue.toLowerCase();
      nextChapters = nextChapters.filter(
        (chapter) =>
          chapter.title.toLowerCase().includes(searchTerm) ||
          chapter.number.toString().includes(searchTerm) ||
          chapter.excerpt.toLowerCase().includes(searchTerm)
      );
    }

    setFilteredChapters(nextChapters);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    applyFilters(value, sort);
  };

  const toggleLike = (chapterId: string, e: React.MouseEvent) => {
    e.preventDefault();
    const newLiked = new Set(likedChapters);
    if (newLiked.has(chapterId)) {
      newLiked.delete(chapterId);
    } else {
      newLiked.add(chapterId);
    }
    setLikedChapters(newLiked);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8 text-slate-900 dark:text-white font-serif">
          Biblioteca de Livros
        </h1>

        {/* Search and Sort */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2 relative">
            <FiSearch className="absolute left-3 top-3 text-amber-600" size={20} />
            <input
              type="text"
              placeholder="Procurar por título ou capítulo..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-amber-200 dark:border-amber-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-600"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-3 border-2 border-amber-200 dark:border-amber-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-600"
          >
            <option value="number">Ordem dos Capítulos</option>
            <option value="title">Por Título</option>
          </select>
        </div>

        {filteredChapters.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">😢</div>
            <p className="text-slate-600 dark:text-slate-400">Nenhum capítulo encontrado</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              {filteredChapters.length} capítulo{filteredChapters.length !== 1 ? 's' : ''} encontrado{filteredChapters.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChapters.map(chapter => (
                <Link key={chapter.id} to={`/read/eldoria_01/${chapter.id}`}>
                  <div className="card-base overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer h-full flex flex-col">
                    <div className="relative overflow-hidden bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900 dark:to-amber-950 h-64">
                      {chapter.image ? (
                        <img
                          src={chapter.image}
                          alt={`Capítulo ${chapter.number}`}
                          className="h-full w-full object-cover transition duration-500 hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-6xl">📖</span>
                        </div>
                      )}
                      {/* Like button */}
                      <button
                        onClick={(e) => toggleLike(chapter.id, e)}
                        className="absolute top-3 right-3 p-2 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:scale-110 transition"
                      >
                        {likedChapters.has(chapter.id) ? (
                          <AiFillHeart className="text-red-500" size={20} />
                        ) : (
                          <FiHeart className="text-slate-400 hover:text-red-500" size={20} />
                        )}
                      </button>
                    </div>

                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white line-clamp-2 hover:text-amber-600 dark:hover:text-amber-400 transition">
                        Capítulo {chapter.number}: {chapter.title}
                      </h3>
                      <p className="text-sm font-medium text-amber-600 dark:text-amber-400 mb-2">
                        {chapter.author || "Eldoria"}
                      </p>

                      <div className="flex justify-between items-center mb-3 text-xs text-slate-500 dark:text-slate-400">
                        <span>{chapter.publishedDate ? new Date(chapter.publishedDate).toLocaleDateString('pt-PT') : '2024-06-01'}</span>
                        {chapter.characters && chapter.characters.length > 0 && (
                          <span className="flex items-center gap-1">
                            👥 {chapter.characters.length}
                          </span>
                        )}
                      </div>

                      {chapter.characters && chapter.characters.length > 0 && (
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          <p className="font-semibold mb-1">Personagens:</p>
                          <div className="flex flex-wrap gap-1">
                            {chapter.characters.map((char, idx) => (
                              <span key={idx} className="inline-block px-2 py-1 bg-amber-100 dark:bg-amber-900 rounded text-amber-900 dark:text-amber-100">
                                {char.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
