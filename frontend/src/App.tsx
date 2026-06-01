import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Books } from './pages/Books';
import { BookDetail } from './pages/BookDetail';
import { About } from './pages/About';
import { ReaderPage } from './pages/ReaderPage';
import { ChapterCoverPage } from './pages/ChapterCoverPage';
import { CharactersPage } from './pages/CharactersPage';
import './styles/globals.css';

function AppContent() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />
      <div className="min-h-screen md:ml-64 pt-16 md:pt-0">
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/:id" element={<BookDetail />} />
            <Route path="/characters" element={<CharactersPage />} />
            <Route path="/read/:id" element={<ReaderPage />} />
            <Route path="/read/:id/:chapterId" element={<ChapterCoverPage />} />
            <Route path="/read/:id/:chapterId/content" element={<ReaderPage />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
