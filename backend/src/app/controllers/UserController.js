import * as Yup from 'yup';
import User from '../models/User';

export default {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    user = await User.create(req.body);
    user.password = undefined;

    return res.json(user);
  },

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, oldPassword } = req.body;
    const { id } = req.user;
    let user = await User.findById(id);

    if (email && email !== user.email) {
      const userExist = await User.findOne({ email });
      if (userExist) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    if (oldPassword && !(await user.comparePassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    user = await User.findByIdAndUpdate({ _id: id }, req.body, { new: true });
    user.password = undefined;

    return res.json(user);
  },
};
