import mongoose from 'mongoose';
import mongoConfig from '../config/userMongodb';

let urlConection;
if (process.env.NODE_ENV === 'test') {
  urlConection = 'mongodb://localhost:27017/animerex-test';
} else if (process.env.DATABASE === 'cloud') {
  const { user, password } = mongoConfig.mongo;
  urlConection = `mongodb+srv://${user}:${password}@universityproject.wqlng.mongodb.net/animerex?retryWrites=true&w=majority`;
} else {
  urlConection = 'mongodb://mongo:27017/animerex';
}

mongoose
  .connect(urlConection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.log(error);
  });
