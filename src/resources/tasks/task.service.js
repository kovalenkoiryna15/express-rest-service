const taskRepo = require('./task.memory.repository');

const getAll = (boardId) => taskRepo.getAll(boardId);

const get = (boardId, taskId) => taskRepo.getTaskById(boardId, taskId);

const create = (task) => taskRepo.createTask(task);

const update = (task) => taskRepo.updateTask(task);

const remove = (boardId, taskId) => taskRepo.removeTask(boardId, taskId);

module.exports = { getAll, get, create, update, remove };
