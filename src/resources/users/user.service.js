const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const get = (id) => usersRepo.getUserById(id);

const create = (name, login, password) =>
  usersRepo.createUser(name, login, password);

const update = (id, name, login, password) =>
  usersRepo.updateUser(id, name, login, password);

const remove = (id) => usersRepo.removeUser(id);

module.exports = { getAll, get, create, update, remove };
