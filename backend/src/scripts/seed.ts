import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Book from '../models/Book';
import Chapter from '../models/Chapter';
import User from '../models/User';
import { hashPassword } from '../utils/auth';

dotenv.config();

const extractTitle = (content: string, number: number) => {
  const lines = content
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean);
  const chapterIndex = lines.findIndex(line => /capítulo\s+\d+/i.test(line));
  if (chapterIndex >= 0) {
    const nextLine = lines.slice(chapterIndex + 1).find(line =>
      !/^capítulo\b/i.test(line) && !/^eldoria$/i.test(line)
    );
    if (nextLine) return nextLine;
  }
  return `Capítulo ${number}`;
};

const seed = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI não está configurado');
  }

  await mongoose.connect(process.env.MONGODB_URI);

  const book = await Book.findOneAndUpdate(
    { title: 'Eldoria' },
    {
      slug: 'eldoria',
      title: 'Eldoria',
      synopsis: 'Uma saga fantástica original sobre um mundo marcado por magia, divindades, mortos e escolhas.',
      author: 'Guilherme Gomes',
      coverImage: '/cover-eldoria_01.svg',
      genres: ['Fantasia Épica', 'Ação', 'Aventura'],
      pages: 21,
      publishedDate: new Date('2024-06-01'),
      rating: 5
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  const chaptersDirectory = path.resolve(__dirname, '../../../frontend/public/chapters');
  const files = fs.readdirSync(chaptersDirectory)
    .filter(file => /^eldoria_cap\d{2}\.txt$/i.test(file))
    .sort();

  let imported = 0;
  for (const file of files) {
    const number = Number(file.match(/(\d{2})/)?.[1]);
    const content = fs.readFileSync(path.join(chaptersDirectory, file), 'utf8').trim();
    const title = extractTitle(content, number);

    await Chapter.findOneAndUpdate(
      { bookId: book._id, number },
      {
        bookId: book._id,
        number,
        title,
        content,
        excerpt: content.slice(0, 240).replace(/\s+/g, ' ').trim(),
        image: `/capitulo${number}.png`,
        publishedDate: new Date(`2024-06-${String(number).padStart(2, '0')}`)
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    imported += 1;
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminEmail && adminPassword) {
    const existingAdmin = await User.findOne({ email: adminEmail.toLowerCase() });
    if (!existingAdmin) {
      await User.create({
        name: 'Administrador',
        email: adminEmail,
        password: await hashPassword(adminPassword),
        role: 'admin'
      });
    } else {
      existingAdmin.role = 'admin';
      await existingAdmin.save();
    }
  }

  console.log(`✓ ${imported} capítulos importados para MongoDB`);
  await mongoose.disconnect();
};

seed().catch(error => {
  console.error(error);
  process.exit(1);
});
