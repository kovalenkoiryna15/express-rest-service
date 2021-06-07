import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import { INTERNAL_SERVER_ERROR, getStatusText } from 'http-status-codes';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import ErrorWithStatus from './types/index';
import logger from './logger/logger';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(logger('incoming request error'));

app.use('/users', userRouter);
app.use('/boards', boardRouter, taskRouter);

app.use('/', (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next(err);
});

app.use((err: ErrorWithStatus, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err.status) {
    logger('unhandled error', `Caught error: ${err.message}`, `${err.status}`)();
    res.status(err.status).send(err.message);
  } else {
    logger('unhandled error', `Caught error: ${getStatusText(INTERNAL_SERVER_ERROR)}`, `${INTERNAL_SERVER_ERROR}`)();
    res
      .status(INTERNAL_SERVER_ERROR)
      .send(getStatusText(INTERNAL_SERVER_ERROR));
  }
  next();
});

process.on('unhandledRejection', (reason: Error, promise) => {
  logger('unhandledRejection', `Unhandled Rejection at: ${promise}, reason: ${reason}`)();
  process.exit(1);
});

process.on('uncaughtException', async (error: Error, origin: string) => {
  logger('uncaughtException', `Caught exception: ${error.message}; Exception origin: ${origin}`)();
  process.exit(1);
});

export default app;
