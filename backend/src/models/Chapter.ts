import mongoose from 'mongoose';

const chapterSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  number: {
    type: Number,
    required: true,
    min: 1
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  publishedDate: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

chapterSchema.index({ bookId: 1, number: 1 }, { unique: true });

export default mongoose.model('Chapter', chapterSchema);
