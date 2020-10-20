import express from 'express';
import cors from 'cors';
import routes from './routes';

// Conection database
import './database';

const app = express();

app.use(cors()); // Acesso a aplicação do backend
app.use(express.json());
app.use(routes);

export default app;
