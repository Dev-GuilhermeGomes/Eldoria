import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { getBookById, getMoreFromAuthor, type Book, type Character } from '../data/books';
import { eldoriaChapters, type Chapter } from '../data/eldoriaChapters';

export const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [moreFromAuthor, setMoreFromAuthor] = useState<Book[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [selectedChapterContent, setSelectedChapterContent] = useState<string | null>(null);
  const [loadingChapter, setLoadingChapter] = useState<boolean>(false);
  const chapterCacheRef = React.useRef<Record<string, string>>({});

  const [readingMode, setReadingMode] = useState<boolean>(false);

  // helper: format raw chapter text into clean paragraphs
  const formatChapterText = (text: string) => {
    if (!text) return [] as string[];
    // split on empty line (one or more) -> paragraphs
    return text
      .split(/\n\s*\n+/)
      .map(p => p.replace(/\n+/g, ' ').trim())
      .filter(Boolean);
  };

  useEffect(() => {
    const currentBook = getBookById(id);
    setBook(currentBook ?? null);
    setMoreFromAuthor(currentBook ? getMoreFromAuthor(currentBook) : []);
  }, [id]);

  useEffect(() => {
    if (!selectedChapter) {
      setSelectedChapterContent(null);
      setLoadingChapter(false);
      return;
    }
    const cached = chapterCacheRef.current[selectedChapter.id];
    if (cached) {
      setSelectedChapterContent(cached);
      setLoadingChapter(false);
      return;
    }

    let cancelled = false;
    setLoadingChapter(true);
    fetch(`/chapters/${selectedChapter.id}.txt`)
      .then((res) => {
        if (!res.ok) throw new Error('fetch_failed');
        return res.text();
      })
      .then((text) => {
        if (!cancelled) {
          chapterCacheRef.current[selectedChapter.id] = text;
          setSelectedChapterContent(text);
        }
      })
      .catch(() => {
        if (!cancelled) setSelectedChapterContent(selectedChapter.content ?? null);
      })
      .finally(() => {
        if (!cancelled) setLoadingChapter(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedChapter]);

  // keyboard navigation for chapter modal
  useEffect(() => {
    if (!selectedChapter) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedChapter(null);
        return;
      }
      if (e.key === 'ArrowLeft') {
        const idx = eldoriaChapters.findIndex(c => c.id === selectedChapter.id);
        if (idx > 0) setSelectedChapter(eldoriaChapters[idx - 1]);
      }
      if (e.key === 'ArrowRight') {
        const idx = eldoriaChapters.findIndex(c => c.id === selectedChapter.id);
        if (idx < eldoriaChapters.length - 1) setSelectedChapter(eldoriaChapters[idx + 1]);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedChapter]);

  if (!book) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😢</div>
          <p className="text-slate-600 dark:text-slate-400 mb-4">Livro não encontrado</p>
          <Link to="/books" className="text-amber-600 dark:text-amber-400 hover:underline font-semibold">
            Voltar para livros
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header / Hero */}
      <div className="relative">
        <div
          className="h-56 md:h-72 lg:h-96 bg-center bg-cover rounded-b-lg"
          style={{ backgroundImage: `url(${book.coverImage ?? '/capitulo1.png'})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
          <div className="max-w-6xl mx-auto px-6 h-full flex items-end">
            <div className="py-6 text-white">
              <Link to="/books" className="flex items-center gap-2 text-white hover:underline mb-2 font-semibold">
                <FiArrowLeft size={20} />
                Voltar
              </Link>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold leading-tight">
                {book.title}
              </h1>
              <p className="text-sm md:text-base text-amber-200 font-medium">por {book.author}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Book Cover and Info */}
          <div className="md:sticky md:top-24">
            <div className="card-base overflow-hidden mb-6 rounded-lg shadow-lg">
              {book.coverImage ? (
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-96 object-cover"
                />
              ) : (
                <div className="w-full h-96 bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900 dark:to-yellow-900 flex items-center justify-center text-6xl">
                  📖
                </div>
              )}
            </div>

            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center justify-between">
                <div>👁️ {book.views} visualizações</div>
                <div className="font-semibold text-slate-800 dark:text-white">⭐ {book.rating.toFixed(1)}</div>
              </div>
              <div className="mt-2">
                <Link to={`/read/${id}`} className="block w-full px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition text-center font-semibold">
                  Começar a Ler
                </Link>
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-2 text-slate-900 dark:text-white font-serif">
              {book.title}
            </h1>
            <p className="text-xl text-amber-600 dark:text-amber-400 font-semibold mb-6">
              por {book.author}
            </p>

            <div className="card-base p-6 mb-6">
              <h2 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Sinopse</h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {book.synopsis}
              </p>
            </div>

            {/* Excerpt removed as requested */}

            <div className="grid grid-cols-2 gap-4 card-base p-6">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Data de Realização</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">{new Date(book.publishedDate).toLocaleDateString('pt-PT')}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Quem fez</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{book.author}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Géneros</p>
                <div className="flex flex-wrap gap-2">
                  {book.genres.map(genre => (
                    <span
                      key={genre}
                      className="px-3 py-1 bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-100 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Characters Section */}
        {book.characters && book.characters.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white font-serif">
              Personagens Importantes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {book.characters.map(character => (
                <div
                  key={character._id}
                  className="group relative bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                >
                  <div className="relative h-56 overflow-hidden">
                    {character.imagePath ? (
                      <img
                        src={character.imagePath}
                        alt={character.name}
                        className="w-full h-full object-cover transform transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900 dark:to-yellow-900 flex items-center justify-center text-4xl">
                        🧝‍♀️
                      </div>
                    )}

                    {character.iconicQuote && (
                      <div className="absolute top-3 left-3 bg-amber-600 text-white px-3 py-1 rounded-full text-xs italic max-w-xs truncate">
                        "{character.iconicQuote}"
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                      <div>
                        <h3 className="text-white text-lg font-bold leading-tight">{character.name}</h3>
                        <p className="text-amber-200 text-sm">{character.class}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-3">{character.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedCharacter(character)}
                        className="px-3 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition"
                      >
                        Ver personagem
                      </button>
                      <div className="text-sm text-slate-500">{character.powers.length} poderes</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chapters Section */}
        {eldoriaChapters.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white font-serif">
              Todos os Capítulos de Eldoria
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {eldoriaChapters.map(chapter => (
                <Link
                  key={chapter.id}
                  to={`/read/${id}/${chapter.id}`}
                  className="group relative overflow-hidden rounded-lg shadow hover:shadow-lg transition"
                >
                  {chapter.image ? (
                    <img
                      src={chapter.image}
                      alt={`Capítulo ${chapter.number}`}
                      className="w-full h-48 object-cover transform transition group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900 dark:to-yellow-900 flex items-center justify-center text-4xl">
                      📖
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col items-center justify-end p-3">
                    <p className="text-white text-center text-sm font-bold">
                      Capítulo {chapter.number}
                    </p>
                    <p className="text-amber-200 text-xs text-center line-clamp-2">
                      {chapter.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        {selectedCharacter && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6" onClick={() => setSelectedCharacter(null)}>
            <div className="max-w-3xl w-full bg-white dark:bg-slate-900 rounded-lg overflow-hidden shadow-lg" onClick={e => e.stopPropagation()}>
              {selectedCharacter.imagePath && (
                <div className="h-56 overflow-hidden">
                  <img src={selectedCharacter.imagePath} alt={selectedCharacter.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              )}
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-3xl font-bold mb-1 text-slate-900 dark:text-white">{selectedCharacter.name}</h3>
                    <p className="text-lg text-amber-600 dark:text-amber-400 font-semibold">{selectedCharacter.class}</p>
                  </div>
                  <button className="px-3 py-2 bg-amber-600 text-white rounded-md" onClick={() => setSelectedCharacter(null)}>Fechar</button>
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-6">{selectedCharacter.history}</p>
                {selectedCharacter.powers.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">Poderes</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCharacter.powers.map((power, idx) => (
                        <span key={idx} className="px-3 py-1 bg-amber-100 dark:bg-amber-900 rounded-full text-sm">{power}</span>
                      ))}
                    </div>
                  </div>
                )}
                {selectedCharacter.iconicQuote && (
                  <blockquote className="italic text-slate-600 dark:text-slate-400 border-l-4 border-amber-600 pl-4">"{selectedCharacter.iconicQuote}"</blockquote>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Chapter Reader Modal */}
        {selectedChapter && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-start justify-center z-50 p-6 pt-20" onClick={() => setSelectedChapter(null)}>
            <div className="card-base max-w-4xl w-full max-h-[80vh] overflow-y-auto p-8" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">{`Capítulo ${selectedChapter.number}: ${selectedChapter.title}`}</h3>
                    <div className="text-sm text-slate-500">{`Capítulo ${selectedChapter.number} de ${eldoriaChapters.length}`}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      title="Alternar modo leitura"
                      onClick={() => setReadingMode(r => !r)}
                      className={readingMode ? 'px-3 py-2 rounded-md bg-amber-600 text-white' : 'px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-800'}
                    >{readingMode ? 'Modo Leitura' : 'Ver Normal'}</button>
                    <button
                      className="px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-md hover:opacity-90"
                      onClick={() => {
                        const idx = eldoriaChapters.findIndex(c => c.id === selectedChapter.id);
                        if (idx > 0) setSelectedChapter(eldoriaChapters[idx - 1]);
                      }}
                    >Anterior</button>
                    <button
                      className="px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-md hover:opacity-90"
                      onClick={() => {
                        const idx = eldoriaChapters.findIndex(c => c.id === selectedChapter.id);
                        if (idx < eldoriaChapters.length - 1) setSelectedChapter(eldoriaChapters[idx + 1]);
                      }}
                    >Próximo</button>
                    <button className="px-3 py-2 bg-amber-600 text-white rounded-md" onClick={() => setSelectedChapter(null)}>Fechar</button>
                  </div>
                </div>
              <div className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200">
                <div className="mb-4 text-sm text-slate-500">{`Capítulo ${selectedChapter.number} de ${eldoriaChapters.length}`}</div>
                {loadingChapter ? (
                  <p className="italic">Carregando capítulo...</p>
                ) : (
                  <article className={`mx-auto font-serif ${readingMode ? 'max-w-4xl text-lg leading-loose px-2' : 'prose lg:prose-lg max-w-prose'} dark:prose-invert`}>
                    {formatChapterText(selectedChapterContent ?? selectedChapter.content).map((para, idx) => (
                      <p key={idx} className={idx === 0 ? 'first-letter:text-6xl first-letter:font-serif first-letter:float-left first-letter:mr-4 first-letter:leading-none' : ''}>{para}</p>
                    ))}
                  </article>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
