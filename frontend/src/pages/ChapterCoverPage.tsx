import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiPlay, FiHeart, FiCalendar, FiUser } from 'react-icons/fi';
import { AiFillHeart } from 'react-icons/ai';
import { eldoriaChapters, type Chapter } from '../data/eldoriaChapters';

export const ChapterCoverPage: React.FC = () => {
  const { id, chapterId } = useParams<{ id: string; chapterId?: string }>();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  const chapter = chapterId 
    ? eldoriaChapters.find(c => c.id === chapterId)
    : eldoriaChapters[0];

  if (!chapter) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-400">Capítulo não encontrado</p>
        </div>
      </div>
    );
  }

  const mainCharacters = chapter.characters?.filter(c => !c.class?.includes('Antagonista')) || [];
  const antagonists = chapter.characters?.filter(c => c.class?.includes('Antagonista')) || [];

  const handleStartReading = () => {
    navigate(`/read/${id}/${chapter.id}/content`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 dark:from-slate-900 dark:via-slate-950 dark:to-black">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur border-b border-amber-400/10 md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <Link
            to={`/books/${id}`}
            className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition"
          >
            <FiArrowLeft size={20} />
          </Link>
          <button
            onClick={() => setLiked(!liked)}
            className="p-2 hover:bg-slate-800 rounded transition"
          >
            {liked ? (
              <AiFillHeart className="text-red-500" size={20} />
            ) : (
              <FiHeart size={20} />
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 md:pt-0 min-h-screen flex items-center justify-center px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full items-center">
          {/* Cover Image */}
          <div className="flex justify-center md:justify-end order-2 md:order-1">
            <div className="relative w-full max-w-sm">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400/20 to-orange-600/20 blur-3xl -z-10"></div>

              {/* Cover */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-amber-400/30 aspect-[3/4]">
                {chapter.image ? (
                  <img
                    src={chapter.image}
                    alt={`Capítulo ${chapter.number}: ${chapter.title}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-200 dark:from-amber-900 dark:to-orange-900 flex items-center justify-center text-6xl">
                    📖
                  </div>
                )}

                {/* Corner badge */}
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-2">
                  <span className="text-white/80 text-sm font-semibold">Cap. {chapter.number}</span>
                </div>
              </div>

              {/* Like Button - Desktop */}
              <button
                onClick={() => setLiked(!liked)}
                className="hidden md:flex absolute -bottom-6 left-1/2 -translate-x-1/2 items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                {liked ? (
                  <>
                    <AiFillHeart size={20} />
                    Favorito
                  </>
                ) : (
                  <>
                    <FiHeart size={20} />
                    Curtir
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Info Section */}
          <div className="order-1 md:order-2 mt-16 md:mt-0">
            {/* Chapter Number and Title */}
            <div className="mb-8">
              <div className="inline-block px-3 py-1 rounded-full bg-amber-600/20 border border-amber-600/40 mb-4">
                <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider">
                  Capítulo {chapter.number}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">
                {chapter.title}
              </h1>

              <p className="text-amber-400 font-medium mb-6">{chapter.author || 'Eldoria'}</p>
            </div>

            {/* Meta Info */}
            <div className="grid grid-cols-2 gap-4 mb-8 pb-8 border-b border-slate-700">
              {chapter.publishedDate && (
                <div className="flex items-center gap-2 text-slate-300">
                  <FiCalendar size={18} className="text-amber-400" />
                  <span className="text-sm">
                    {new Date(chapter.publishedDate).toLocaleDateString('pt-PT', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2 text-slate-300">
                <FiUser size={18} className="text-amber-400" />
                <span className="text-sm">{chapter.author || 'Eldoria'}</span>
              </div>
            </div>

            {/* Excerpt/Synopsis */}
            {chapter.excerpt && (
              <div className="mb-8">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Sinopse
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {chapter.excerpt.substring(0, 200)}...
                </p>
              </div>
            )}

            {/* Main Characters */}
            {mainCharacters.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Personagens Principais
                </h3>
                <div className="flex flex-wrap gap-2">
                  {mainCharacters.slice(0, 3).map((char) => (
                    <span
                      key={char.name}
                      className="px-3 py-1 rounded-full bg-amber-600/20 border border-amber-600/40 text-amber-300 text-sm font-medium"
                    >
                      {char.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Antagonists */}
            {antagonists.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Antagonistas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {antagonists.map((char) => (
                    <span
                      key={char.name}
                      className="px-3 py-1 rounded-full bg-red-600/20 border border-red-600/40 text-red-300 text-sm font-medium"
                    >
                      {char.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Read Button */}
            <button
              onClick={handleStartReading}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl mt-8"
            >
              <FiPlay size={20} />
              Começar a Ler
            </button>
          </div>
        </div>
      </div>

      {/* Footer Navigation - Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/90 border-t border-slate-700 px-4 py-3">
        <Link
          to={`/books/${id}`}
          className="flex items-center justify-center gap-2 w-full px-4 py-2 text-slate-400 hover:text-white transition"
        >
          <FiArrowLeft size={18} />
          Voltar à Biblioteca
        </Link>
      </div>
    </div>
  );
};
