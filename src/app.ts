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

app.use(logger());

app.use('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter, taskRouter);

app.use((
  err: ErrorWithStatus,
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (err.status) {
    res.status(err.status).send(err.message);
  } else {
    res
      .status(INTERNAL_SERVER_ERROR) // 500
      .send(getStatusText(INTERNAL_SERVER_ERROR)); // Server Error
  }
  next();
});

export default app;
