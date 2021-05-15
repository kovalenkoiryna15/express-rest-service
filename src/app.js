const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:id/tasks', taskRouter);

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send(err.message);
  } else {
    res
      .status(INTERNAL_SERVER_ERROR) // 500
      .send(getStatusText(INTERNAL_SERVER_ERROR)); // Server Error
  }
  next();
});

module.exports = app;
