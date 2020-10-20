import * as Yup from 'yup';
import Anime from '../models/Anime';

export default {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      img_link: Yup.string(),
      link_watch: Yup.string().required(),
      description: Yup.string().required(),
      season: Yup.number(),
      episode: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.user;
    Object.assign(req.body, { user_id: id });
    const anime = await Anime.create(req.body);

    return res.json(anime);
  },

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      img_link: Yup.string(),
      link_watch: Yup.string(),
      description: Yup.string(),
      season: Yup.number(),
      episode: Yup.number(),
    });

    const schemaId = Yup.object().shape({
      id: Yup.string().required(),
    });

    if (
      !(await schema.isValid(req.body)) ||
      !(await schemaId.isValid(req.params))
    ) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id: user_id } = req.user;
    const { id } = req.params;

    const anime = await Anime.findByIdAndUpdate(
      { _id: id, user_id },
      req.body,
      {
        new: true,
      }
    );

    return res.json(anime);
  },

  async show(req, res) {
    const { id } = req.user;
    const { page = 1 } = req.query;

    const animes = await Anime.paginate({ user_id: id }, { page, limit: 10 });

    return res.json(animes);
  },

  async index(req, res) {
    const { id } = req.params;

    const anime = await Anime.findById(id).populate('user_id');
    Object.assign(anime.user_id, { password: undefined });

    return res.json(anime);
  },

  async destroy(req, res) {
    const { id } = req.params;
    const { id: user_id } = req.user;
    const anime = await Anime.findById(id);

    if (anime && anime.user_id.equals(user_id)) {
      await anime.deleteOne();
    } else {
      return res.status(400).json({ error: 'Not delete anime' });
    }

    return res.status(200).json();
  },
};
