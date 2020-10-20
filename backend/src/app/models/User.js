import mongoose from 'mongoose';
import passwordEncrypt from '../../utils/passwordEncrypt';

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    trim: true,
    unique: true,
    required: 'Email required',
  },
  password: {
    type: String,
    required: 'Password required',
  },
});

UserSchema.pre('save', async function save(next) {
  const user = this;
  user.password = await passwordEncrypt.encryptPassword(user.password);
  next();
});

UserSchema.pre('findOneAndUpdate', async function update(next) {
  const userUpdate = this._update;

  if (userUpdate.oldPassword) {
    userUpdate.password = await passwordEncrypt.encryptPassword(
      userUpdate.password
    );
  }

  next();
});

UserSchema.methods = {
  comparePassword(candidatePassword) {
    return passwordEncrypt.compare(candidatePassword, this.password);
  },
};

export default mongoose.model('User', UserSchema);
