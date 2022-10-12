import express from 'express';
import stoppable from 'stoppable';
import cors from 'cors';
import http from 'http';
import routes from './routes/index';
import config from './config';
import helmet from 'helmet';
import errorHandler from './lib/errors/errorHandler';
import morgan from 'morgan';
import {migrate} from './database/connection';
import generalLogger from './lib/logger';

const app = express();

app.set('trust proxy', true);
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(morgan('dev'));
app.use(routes);
app.use(errorHandler);

const startServer = async () => {
  (global as any).isStartingUp = true;

  const server = stoppable(http.createServer(app));

  server.listen(config.app.port, () => {
    generalLogger.info(
      `! Server Started and Listening on Port: ${config.app.port} with PID: ${process.pid}`
    );
    (global as any).isStartingUp = false;
  });
};

const start = async () => {
  try {
    await migrate();
    await startServer();
  } catch (e) {
    generalLogger.error(e);
  }
};

start();

export default app;
