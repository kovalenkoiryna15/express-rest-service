const { NOT_FOUND, BAD_REQUEST } = require('http-status-codes');
const db = require('../../db/db');
const Board = require('./board.model');

const getAll = async () => {
  if (!db.store.boards) {
    db.store.boards = {};
  }

  return Object.values(db.store.boards);
};

const getBoardById = async (id) => {
  if (!db.store.boards) {
    db.store.boards = {};
  }

  if (!db.store.boards.id) {
    const error = new Error(`Couldn't find a board with id ${id}`);
    error.status = NOT_FOUND; // 404
    throw error;
  }

  return db.store.boards.id;
};

const createBoard = async (title, columns = []) => {
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

  db.store.boards.id = board;

  return board;
};

const updateBoard = async (id, title, columns) => {
  if (!db.store.boards) {
    db.store.boards = {};
  }

  if (!db.store.boards.id) {
    const error = new Error(`Couldn't find a board with id ${id}`);
    error.status = NOT_FOUND; // 404
    throw error;
  }

  if (!title) {
    const error = new Error(`Title is required.`);
    error.status = BAD_REQUEST; // 400
    throw error;
  }

  const board = db.store.boards.id;

  const updatedBoard = {
    ...board,
    title,
    columns,
  };

  db.store.boards.id = updatedBoard;

  return updatedBoard;
};

const removeBoard = async (id) => {
  if (!db.store.boards) {
    db.store.boards = {};
  }

  if (!db.store.boards.id) {
    const error = new Error(`Couldn't find a board with id ${id}`);
    error.status = NOT_FOUND; // 404
    throw error;
  }

  delete db.store.boards.id;
};

module.exports = {
  getAll,
  getBoardById,
  createBoard,
  updateBoard,
  removeBoard,
};
