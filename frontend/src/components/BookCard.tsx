import React from 'react';
import { Link } from 'react-router-dom';

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  views: number;
  rating: number;
}

export const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  author,
  coverImage,
  views,
  rating,
}) => {
  return (
    <div className="card-base overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <Link to={`/books/${id}`}>
        <div className="relative overflow-hidden bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900 dark:to-amber-950 h-64">
          {coverImage ? (
            <img
              src={coverImage}
              alt={title}
              className="h-full w-full object-cover transition duration-500 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-6xl">📖</span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/books/${id}`}>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white line-clamp-2 hover:text-amber-600 dark:hover:text-amber-400 transition">
            {title}
          </h3>
        </Link>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{author}</p>

        <div className="flex justify-between items-center mb-3 text-xs text-slate-500 dark:text-slate-400">
          <span>👁️ {views} visualizações</span>
          <span>⭐ {rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};
