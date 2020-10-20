import * as Yup from 'yup';
import Anime from '../models/Anime';

const escapeRegex = (string) => {
  return string.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

export default {
  async show(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      page: Yup.number(),
    });

    if (!(await schema.isValid(req.query))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name } = req.query;
    const { page = 1 } = req.query;

    const regex = new RegExp(escapeRegex(name), 'gi');

    const animes = await Anime.paginate(
      { name: regex },
      { page, limit: 10, populate: 'user_id' }
    );

    animes.docs.map((anime) =>
      Object.assign(anime.user_id, { password: undefined, email: undefined })
    );

    return res.json(animes);
  },

  async index(req, res) {
    const { user_id } = req.params;
    const { page = 1 } = req.query;

    const anime = await Anime.paginate({ user_id }, { page, limit: 10 });

    return res.json(anime);
  },
};
