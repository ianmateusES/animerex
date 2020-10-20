import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const AnimeSchema = new mongoose.Schema({
  name: String,
  img_link: {
    type: String,
    default:
      'https://w7.pngwing.com/pngs/835/164/png-transparent-question-mark-emoji-sms-question-mark-angle-text-logo.png',
  },
  description: String,
  link_watch: String,
  season: { type: Number, default: 1 },
  episode: { type: Number, default: 1 },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

AnimeSchema.plugin(mongoosePaginate);

AnimeSchema.pre('save', function save(next) {
  const anime = this;
  anime.name = anime.name
    .toLowerCase()
    .replace(/\b(\w)/g, (s) => s.toUpperCase());
  next();
});

AnimeSchema.pre('findOneAndUpdate', function findOneAndUpdate(next) {
  const anime = this._update;

  anime.name = anime.name
    .toLowerCase()
    .replace(/\b(\w)/g, (s) => s.toUpperCase());
  next();
});

export default mongoose.model('Anime', AnimeSchema);
