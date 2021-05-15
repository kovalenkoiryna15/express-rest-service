const taskRepo = require('./task.memory.repository');

const getAll = (boardId) => taskRepo.getAll(boardId);

const get = (boardId, taskId) => taskRepo.getTaskById(boardId, taskId);

const create = (title, columns) => taskRepo.createTask(title, columns);

const update = (boardId, taskId, title, columns) =>
  taskRepo.updateTask(boardId, taskId, title, columns);

const remove = (boardId, taskId) => taskRepo.removeTask(boardId, taskId);

module.exports = { getAll, get, create, update, remove };
