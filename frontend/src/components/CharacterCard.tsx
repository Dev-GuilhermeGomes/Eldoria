import React, { useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import { AiFillHeart } from 'react-icons/ai';
import { ChapterCharacter } from '../data/eldoriaChapters';

interface CharacterCardProps {
  character: ChapterCharacter;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const [liked, setLiked] = useState(false);
  const initial = character.name?.charAt(0).toUpperCase() || '?';

  return (
    <article className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-900">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_90%_10%,rgba(245,216,132,0.18),transparent_35%)]" />

      <div className="grid grid-cols-1 lg:grid-cols-[45%_55%]">
        <div className="relative min-h-[360px] overflow-hidden bg-gradient-to-br from-amber-100 via-orange-100 to-rose-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950">
          {character.imagePath ? (
            <img
              src={character.imagePath}
              alt={character.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-4 border-white/60 bg-white/20 text-6xl font-black text-slate-900 shadow-xl dark:text-amber-200">
                {initial}
              </div>
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-6 pb-5 pt-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Ficha de personagem</p>
            <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">{character.name}</h2>
          </div>

          <div className="absolute left-4 top-4 inline-flex rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-800 backdrop-blur dark:border-slate-500 dark:bg-slate-900/80 dark:text-slate-100">
            {character.class || 'Aventureiro'}
          </div>
        </div>

        <div className="relative p-6 md:p-7">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Perfil</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">{character.role || character.class || 'Guardião de Eldoria'}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-center dark:border-slate-700 dark:bg-slate-800/60">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">Idade</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{character.age || '-'}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">Aniversário</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{character.birthday || '-'}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">Altura</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{character.height || '-'}</p>
            </div>
          </div>

          <div className="mt-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Afinidade</p>
            <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-900 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-200">
              {character.affinity || 'Energia ancestral'}
            </p>
          </div>

          {character.abilities && character.abilities.length > 0 && (
            <div className="mt-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Habilidades</p>
              <div className="flex flex-wrap gap-2">
                {character.abilities.map((ability) => (
                  <span
                    key={ability}
                    className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
                  >
                    {ability}
                  </span>
                ))}
              </div>
            </div>
          )}

          {character.description && (
            <p className="mt-5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{character.description}</p>
          )}

          {character.quote && (
            <blockquote className="mt-4 border-l-4 border-amber-400 pl-3 text-sm italic text-slate-600 dark:text-slate-300">
              "{character.quote}"
            </blockquote>
          )}

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setLiked(!liked)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-red-300 hover:text-red-500 dark:border-slate-600 dark:text-slate-200"
            >
              {liked ? <AiFillHeart className="text-red-500" size={18} /> : <FiHeart size={18} />}
              {liked ? 'Favorito' : 'Curtir'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
