const taskRepo = require('./task.memory.repository');

const getAll = () => taskRepo.getAll();

const get = (id) => taskRepo.getTaskById(id);

const create = (title, columns) => taskRepo.createTask(title, columns);

const update = (id, title, columns) => taskRepo.updateTask(id, title, columns);

const remove = (id) => taskRepo.removeTask(id);

module.exports = { getAll, get, create, update, remove };
