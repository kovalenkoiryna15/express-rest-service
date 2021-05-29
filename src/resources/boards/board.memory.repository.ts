import { StatusCodes } from 'http-status-codes';
import db from '../../db/db';
import Board from './board.model';
import { BoardID, IColumn, IBoard } from './board.types';
import { ErrorWithStatus } from '../../types';

/**
 * Gets all boards.
 * @alias getAllBoards
 * @async
 * @function getAll
 * @returns {Board[]} a list of boards.
 */
const getAll = async () => {
  if (!db.store.boards) {
    db.store.boards = new Map();
  }

  return [...db.store.boards.values()];
};

/**
 * Gets Board by ID.
 * @async
 * @function getBoardById
 * @argument {string} id - The id of the Board.
 * @returns {Board} the Board object.
 * @throws Will throw an error if Board not found.
 */
const getBoardById = async (id: BoardID) => {
  if (!db.store.boards) {
    db.store.boards = new Map();
  }

  if (!db.store.boards.has(id)) {
    const error = new ErrorWithStatus(`Couldn't find a board with id ${id}`);
    error.status = StatusCodes.NOT_FOUND; // 404
    throw error;
  }

  return db.store.boards.get(id);
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
const createBoard = async (title: string, columns: IColumn[]) => {
  if (!db.store.boards) {
    db.store.boards = new Map();
  }

  if (!title) {
    const error = new ErrorWithStatus('Title is required.');
    error.status = StatusCodes.BAD_REQUEST; // 400
    throw error;
  }

  const board = new Board(
    title,
    columns,
  );

  db.store.boards.set(board.id, board);

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
const updateBoard = async (id: BoardID, title: string, columns: IColumn[]) => {
  if (!db.store.boards) {
    db.store.boards = new Map();
  }

  if (!db.store.boards.has(id)) {
    const error = new ErrorWithStatus(`Couldn't find a board with id ${id}`);
    error.status = StatusCodes.NOT_FOUND; // 404
    throw error;
  }

  if (!title) {
    const error = new ErrorWithStatus('Title is required.');
    error.status = StatusCodes.BAD_REQUEST; // 400
    throw error;
  }

  const board = db.store.boards.get(id) as IBoard;

  const updatedBoard = {
    ...board,
    title,
    columns,
  };

  db.store.boards.set(id, updatedBoard);

  return updatedBoard;
};

/**
 * Deletes Board by ID.
 * @async
 * @function removeBoard
 * @argument {string} id - The id of the Board.
 * @throws Will throw an error if Board not found.
 */
const removeBoard = async (id: BoardID) => {
  if (!db.store.boards) {
    db.store.boards = new Map();
  }

  if (!db.store.boards.has(id)) {
    const error = new ErrorWithStatus(`Couldn't find a board with id ${id}`);
    error.status = StatusCodes.NOT_FOUND; // 404
    throw error;
  }

  db.store.boards.delete(id);
};

export default {
  getAll,
  getBoardById,
  createBoard,
  updateBoard,
  removeBoard,
};
