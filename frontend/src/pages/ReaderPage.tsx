import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiChevronLeft, FiChevronRight, FiBook, FiSettings, FiList } from 'react-icons/fi';
import { getBookById, type Book } from '../data/books';
import { eldoriaChapters, type Chapter } from '../data/eldoriaChapters';
import { CharacterCard } from '../components/CharacterCard';
import { api } from '../services/api';

export const ReaderPage: React.FC = () => {
  const { id, chapterId } = useParams<{ id: string; chapterId?: string }>();
  const navigate = useNavigate();
  const location = window.location.pathname;
  const isSingleChapterMode = location.includes('/content');

  const [book, setBook] = useState<Book | null>(null);
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [chapterContent, setChapterContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Reading preferences
  const [fontSize, setFontSize] = useState<number>(16);
  const [lineHeight, setLineHeight] = useState<number>(1.8);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showChapters, setShowChapters] = useState<boolean>(false);

  // Load book on mount
  useEffect(() => {
    const currentBook = getBookById(id);
    setBook(currentBook ?? null);

    // Set initial chapter (first chapter or specified one)
    const initialChapter =
      eldoriaChapters.find(c => c.id === chapterId) || eldoriaChapters[0];
    if (initialChapter) {
      setChapter(initialChapter);
    }
  }, [id, chapterId]);

  // Load chapter content
  useEffect(() => {
    if (!chapter) {
      setChapterContent(null);
      return;
    }

    let cancelled = false;
    setLoading(true);

    api.getChapter('eldoria', chapter.number)
      .then(result => {
        if (!cancelled) setChapterContent(result.chapter.content);
      })
      .catch(() => {
        fetch(`/chapters/${chapter.id}.txt`)
          .then(res => {
            if (!res.ok) throw new Error('fetch_failed');
            return res.text();
          })
          .then(text => {
            if (!cancelled) setChapterContent(text);
          })
          .catch(() => {
            if (!cancelled) setChapterContent(chapter.content ?? null);
          })
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [chapter]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPreviousChapter();
      if (e.key === 'ArrowRight') goToNextChapter();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [chapter]);

  const goToNextChapter = () => {
    if (!chapter) return;
    const currentIndex = eldoriaChapters.findIndex(c => c.id === chapter.id);
    if (currentIndex < eldoriaChapters.length - 1) {
      const nextChapter = eldoriaChapters[currentIndex + 1];
      navigate(`/read/${id}/${nextChapter.id}`);
      setChapter(nextChapter);
    }
  };

  const goToPreviousChapter = () => {
    if (!chapter) return;
    const currentIndex = eldoriaChapters.findIndex(c => c.id === chapter.id);
    if (currentIndex > 0) {
      const prevChapter = eldoriaChapters[currentIndex - 1];
      navigate(`/read/${id}/${prevChapter.id}`);
      setChapter(prevChapter);
    }
  };

  if (!book || !chapter) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📖</div>
          <p className="text-slate-600 dark:text-slate-400 mb-4">Carregando...</p>
        </div>
      </div>
    );
  }

  const currentIndex = eldoriaChapters.findIndex(c => c.id === chapter.id);
  const hasNext = currentIndex < eldoriaChapters.length - 1;
  const hasPrev = currentIndex > 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">

      {/* Header - Fixed */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 z-40 flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center gap-4">
          <Link to={`/books/${id}`} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">
            <FiArrowLeft size={20} />
            <span className="truncate max-w-md text-sm md:text-base">{book.title}</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {!isSingleChapterMode && (
            <button
              onClick={() => setShowChapters(!showChapters)}
              className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Ver todos os capítulos"
            >
              <FiList size={20} />
            </button>
          )}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title="Configurações"
          >
            <FiSettings size={20} />
          </button>
        </div>
      </div>

      {/* Chapters Panel */}
      {showChapters && !isSingleChapterMode && (
        <div className="fixed top-16 left-0 bottom-0 w-full max-w-2xl bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 p-6 overflow-y-auto z-30">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4">Todos os Capítulos de Eldoria</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {eldoriaChapters.map((ch) => (
              <button
                key={ch.id}
                onClick={() => {
                  navigate(`/read/${id}/${ch.id}`);
                  setShowChapters(false);
                }}
                className={`group relative overflow-hidden rounded-lg transition ${
                  ch.id === chapter?.id
                    ? 'ring-2 ring-amber-600'
                    : 'hover:shadow-lg'
                }`}
              >
                {ch.image ? (
                  <img
                    src={ch.image}
                    alt={ch.title}
                    className="w-full h-40 object-cover transform transition group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-40 bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900 dark:to-yellow-900 flex items-center justify-center text-3xl">
                    📖
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col items-end justify-end p-3">
                  <div className="text-white text-center w-full">
                    <p className="text-xs font-semibold">Cap. {ch.number}</p>
                    <p className="text-xs line-clamp-2">{ch.title}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Settings Panel */}
      {showSettings && (
        <div className="fixed top-16 right-6 bg-white dark:bg-slate-900 rounded-lg shadow-lg p-6 z-50 w-80 border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4">Preferências de Leitura</h3>

          <div className="space-y-4">
            {/* Font Size */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Tamanho da Fonte
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                  className="px-3 py-1 bg-slate-200 dark:bg-slate-700 rounded hover:bg-slate-300 dark:hover:bg-slate-600"
                >
                  −
                </button>
                <span className="text-sm font-semibold w-12 text-center">{fontSize}px</span>
                <button
                  onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                  className="px-3 py-1 bg-slate-200 dark:bg-slate-700 rounded hover:bg-slate-300 dark:hover:bg-slate-600"
                >
                  +
                </button>
              </div>
            </div>

            {/* Line Height */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Altura da Linha
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setLineHeight(Math.max(1.4, lineHeight - 0.2))}
                  className="px-3 py-1 bg-slate-200 dark:bg-slate-700 rounded hover:bg-slate-300 dark:hover:bg-slate-600"
                >
                  −
                </button>
                <span className="text-sm font-semibold w-16 text-center">{lineHeight.toFixed(1)}</span>
                <button
                  onClick={() => setLineHeight(Math.min(2.4, lineHeight + 0.2))}
                  className="px-3 py-1 bg-slate-200 dark:bg-slate-700 rounded hover:bg-slate-300 dark:hover:bg-slate-600"
                >
                  +
                </button>
              </div>
            </div>

            {/* Reset */}
            <button
              onClick={() => {
                setFontSize(16);
                setLineHeight(1.8);
              }}
              className="w-full px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded hover:bg-slate-300 dark:hover:bg-slate-600 text-sm font-medium"
            >
              Repor Padrões
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="pt-24 pb-32 px-4 md:px-0">
        <div className="max-w-3xl mx-auto">
          {/* Chapter Header */}
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center gap-2 text-amber-600 dark:text-amber-400 mb-4">
              <FiBook size={20} />
              <span className="text-sm font-medium">Capítulo {chapter.number}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-4">
              {chapter.title}
            </h1>
            <div className="h-1 w-12 bg-amber-600 mx-auto"></div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-slate-600 dark:text-slate-400">Carregando capítulo...</div>
            </div>
          )}

          {/* Chapter Content */}
          {chapterContent && !loading && (
            <article
              className="prose dark:prose-invert max-w-none mb-12"
              style={{
                fontSize: `${fontSize}px`,
                lineHeight: `${lineHeight}`,
              }}
            >
              <div
                className="bg-white dark:bg-slate-900 rounded-lg p-8 md:p-12 shadow-sm border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                style={{
                  fontSize: `${fontSize}px`,
                  lineHeight: `${lineHeight}`,
                }}
              >
                {/* Chapter hero image (se houver) */}
                {chapter.image && (
                  <div className="mb-6">
                    <img src={chapter.image} alt={chapter.title} className="w-full h-56 object-cover rounded-md" />
                  </div>
                )}

                {(() => {
                  const paragraphs = chapterContent
                    .split(/\n\s*\n+/)
                    .filter(text => text.trim())
                    .map(p => p.trim().split('\n').map(l => l.trim()).filter(Boolean).join('\n'));

                  // prepare character name map for quick lookup
                  const charMap = (chapter.characters || []).map(c => ({
                    name: c.name,
                    img: c.imagePath,
                  }));

                  return paragraphs.map((paragraph, idx) => {
                    const lower = paragraph.toLowerCase();
                    const matched = charMap.filter(c => c.name && lower.includes(c.name.toLowerCase()));

                    return (
                      <div key={idx} className="mb-6 last:mb-0">
                        {matched.length > 0 && (
                          <div className="flex items-center gap-4 mb-4">
                            {matched.map((m, i) => (
                              m.img ? (
                                <img key={i} src={m.img} alt={m.name} title={m.name} className="w-16 h-16 rounded-full object-cover border border-slate-200" />
                              ) : (
                                <div key={i} className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-sm text-slate-600">{m.name}</div>
                              )
                            ))}
                          </div>
                        )}

                        <p className="text-justify indent-8 first:indent-0">{paragraph}</p>
                      </div>
                    );
                  });
                })()}
              </div>
            </article>
          )}

          {/* Characters Section */}
          {chapter.characters && chapter.characters.length > 0 && (
            <div className="mb-12 mt-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-2">
                  Personagens
                </h2>
                <div className="h-1 w-12 bg-amber-600 mx-auto"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {chapter.characters.map((character, idx) => (
                  <CharacterCard key={idx} character={character} />
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 p-6 shadow-lg">
            <div className="max-w-3xl mx-auto px-4">
              {isSingleChapterMode ? (
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => navigate(`/read/${id}/${chapter.id}`)}
                    className="flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition"
                  >
                    <FiArrowLeft size={20} />
                    Voltar à Capa
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-4">
                  {/* Previous Button */}
                  <button
                    onClick={goToPreviousChapter}
                    disabled={!hasPrev}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
                      hasPrev
                        ? 'bg-amber-600 text-white hover:bg-amber-700'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <FiChevronLeft size={20} />
                    <span className="hidden sm:inline">Anterior</span>
                  </button>

                  {/* Chapter Info */}
                  <div className="text-center">
                    <p className="text-xs uppercase text-slate-600 dark:text-slate-400 font-semibold">
                      Capítulo {currentIndex + 1} de {eldoriaChapters.length}
                    </p>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      {chapter.title}
                    </p>
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={goToNextChapter}
                    disabled={!hasNext}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
                      hasNext
                        ? 'bg-amber-600 text-white hover:bg-amber-700'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <span className="hidden sm:inline">Próximo</span>
                    <FiChevronRight size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
