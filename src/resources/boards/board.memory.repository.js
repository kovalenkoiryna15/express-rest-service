const { NOT_FOUND, BAD_REQUEST } = require('http-status-codes');
const db = require('../../db/db');
const Board = require('./board.model');
require('./board.types');

/**
 * Gets all boards.
 * @alias getAllBoards
 * @async
 * @function getAll
 * @returns {Board[]} a list of boards.
 */
const getAll = async () => {
  if (!db.store.boards) {
    db.store.boards = {};
  }

  return Object.values(db.store.boards);
};

/**
 * Gets Board by ID.
 * @async
 * @function getBoardById
 * @argument {string} id - The id of the Board.
 * @returns {Board} the Board object.
 * @throws Will throw an error if Board not found.
 */
const getBoardById = async (id) => {
  if (!db.store.boards) {
    db.store.boards = {};
  }

  if (!db.store.boards[id]) {
    const error = new Error(`Couldn't find a board with id ${id}`);
    error.status = NOT_FOUND; // 404
    throw error;
  }

  return db.store.boards[id];
};

/**
 * Creates a new Board.
 * @async
 * @function createBoard
 * @argument {string} title - The name of the Board.
 * @argument {string} columns - The login of the Board.
 * @returns {Board} created Board object.
 * @throws Will throw an error if at least title is not specified.
 */
const createBoard = async (title, columns) => {
  if (!db.store.boards) {
    db.store.boards = {};
  }

  if (!title) {
    const error = new Error(`Title is required.`);
    error.status = BAD_REQUEST; // 400
    throw error;
  }

  const board = new Board({
    title,
    columns,
  });

  db.store.boards[board.id] = board;

  return board;
};

/**
 * Updates a Board by ID.
 * @async
 * @function updateBoard
 * @argument {string} id - The id of the Board.
 * @argument {string} title - The title of the Board.
 * @argument {string} columns - The columns of the Board.
 * @returns {Board} the updated Board object.
 * @throws Will throw an error if Board not found.
 * @throws Will throw an error if at least title is not specified.
 */
const updateBoard = async (id, title, columns) => {
  if (!db.store.boards) {
    db.store.boards = {};
  }

  if (!db.store.boards[id]) {
    const error = new Error(`Couldn't find a board with id ${id}`);
    error.status = NOT_FOUND; // 404
    throw error;
  }

  if (!title) {
    const error = new Error(`Title is required.`);
    error.status = BAD_REQUEST; // 400
    throw error;
  }

  const board = db.store.boards[id];

  const updatedBoard = {
    ...board,
    title,
    columns,
  };

  db.store.boards[id] = updatedBoard;

  return updatedBoard;
};

/**
 * Deletes Board by ID.
 * @async
 * @function removeBoard
 * @argument {string} id - The id of the Board.
 * @throws Will throw an error if Board not found.
 */
const removeBoard = async (id) => {
  if (!db.store.boards) {
    db.store.boards = {};
  }

  if (!db.store.boards[id]) {
    const error = new Error(`Couldn't find a board with id ${id}`);
    error.status = NOT_FOUND; // 404
    throw error;
  }

  delete db.store.boards[id];
};

module.exports = {
  getAll,
  getBoardById,
  createBoard,
  updateBoard,
  removeBoard,
};
