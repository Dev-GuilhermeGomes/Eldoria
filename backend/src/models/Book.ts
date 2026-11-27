import mongoose from 'mongoose';

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  history: {
    type: String,
    required: true
  },
  powers: [{
    type: String
  }],
  class: {
    type: String,
    enum: ['Herói', 'Vilão', 'Neutro', 'Coadjuvante', 'Estelar']
  },
  imagePath: {
    type: String
  },
  iconicQuote: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const bookSchema = new mongoose.Schema({
  slug: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
    lowercase: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  synopsis: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  coverImage: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: false
  },
  contentFile: {
    type: String,
    required: false
  },
  characters: [characterSchema],
  genres: [{
    type: String
  }],
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 0
  },
  publishedDate: {
    type: Date
  },
  publisher: {
    type: String
  },
  pages: {
    type: Number
  },
  language: {
    type: String,
    default: 'Português'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

bookSchema.pre('save', function (this: mongoose.HydratedDocument<{ updatedAt: Date }>, next: mongoose.CallbackWithoutResultAndOptionalError) {
  this.updatedAt = new Date();
  next();
});

const Book = mongoose.model('Book', bookSchema);
export default Book;
