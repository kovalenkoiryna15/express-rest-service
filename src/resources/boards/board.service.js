const boardRepo = require('./board.memory.repository');
require('./board.types');

/**
 * Gets all boards.
 * @alias boardServiceGetAll
 * @returns {Board[]} a list of boards.
 */
const getAll = () => boardRepo.getAll();

/**
 * Gets Board by ID.
 * @alias boardServiceGet
 * @argument {string} id - The id of the Board.
 * @returns {Board} the Board object.
 */
const get = (id) => boardRepo.getBoardById(id);

/**
 * Creates a new Board.
 * @alias boardServiceCreate
 * @argument {string} title - The name of the Board.
 * @argument {string} columns - The login of the Board.
 * @returns {Board} created Board object.
 */
const create = (title, columns) => boardRepo.createBoard(title, columns);

/**
 * Updates a Board by ID.
 * @alias boardServiceUpdate
 * @argument {string} id - The id of the Board.
 * @argument {string} title - The title of the Board.
 * @argument {string} columns - The columns of the Board.
 * @returns {Board} the updated Board object.
 */
const update = (id, title, columns) =>
  boardRepo.updateBoard(id, title, columns);

/**
 * Deletes Board by ID.
 * @alias boardServiceRemove
 * @argument {string} id - The id of the Board.
 */
const remove = (id) => boardRepo.removeBoard(id);

module.exports = { getAll, get, create, update, remove };
