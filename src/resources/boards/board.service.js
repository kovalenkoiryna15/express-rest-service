const boardRepo = require('./board.memory.repository');

const getAll = () => boardRepo.getAll();

const get = (id) => boardRepo.getBoardById(id);

const create = (title, columns) => boardRepo.createBoard(title, columns);

const update = (id, title, columns) =>
  boardRepo.updateBoard(id, title, columns);

const remove = (id) => boardRepo.removeBoard(id);

module.exports = { getAll, get, create, update, remove };
