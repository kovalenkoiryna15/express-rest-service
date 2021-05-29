import { StatusCodes } from 'http-status-codes';
import db from '../../db/db';
import Task from './task.model';
import { ITask, TaskID } from './task.types';
import { BoardID, IBoard } from '../boards/board.types';
import { ErrorWithStatus } from '../../types';

/**
 * Gets all tasks by the Board ID.
 * @alias getAllTasks
 * @async
 * @function getAll
 * @argument {string} boardId - The id of the Board.
 * @returns {Task[]} a list of tasks.
 * @throws Will throw an error if Board not found.
 */
const getAll = async (boardId: BoardID) => {
  if (!db.store.boards.has(boardId)) {
    const error = new ErrorWithStatus(`Couldn't find a board with id ${boardId}`);
    error.status = StatusCodes.NOT_FOUND; // 404
    throw error;
  }

  const board = db.store.boards.get(boardId) as IBoard;

  if (!board.tasks.size) {
    board.tasks = new Map();
  }

  return [...board.tasks.values()];
};

/**
 * Gets the Task by the Board and Task IDs
 * @async
 * @function getTaskById
 * @argument {string} boardId - The id of the Board.
 * @argument {string} taskId - The id of the Task.
 * @returns {Task} the Task object.
 * @throws Will throw an error if Board not found.
 * @throws Will throw an error if Task not found.
 */
const getTaskById = async (boardId: BoardID, taskId: TaskID) => {
  if (!db.store.boards.has(boardId)) {
    const error = new ErrorWithStatus(`Couldn't find a board with id ${boardId}`);
    error.status = StatusCodes.NOT_FOUND; // 404
    throw error;
  }

  const board = db.store.boards.get(boardId) as IBoard;

  if (!board.tasks.size) {
    board.tasks = new Map();
  }

  if (!board.tasks.has(taskId)) {
    const error = new ErrorWithStatus(`Couldn't find a task with id ${taskId}`);
    error.status = StatusCodes.NOT_FOUND; // 404
    throw error;
  }

  return board.tasks.get(taskId);
};

/**
 * Creates a new Task.
 * @async
 * @function createTask
 * @argument {string} title - The title of new Task.
 * @argument {string} order - The order of new Task.
 * @argument {string} description - The description of new Task.
 * @argument {string} userId - The User id of new Task.
 * @argument {string} boardId - The Board id of new Task.
 * @argument {string} columnId - The Column id of new Task.
 * @returns {Task} the new Task object.
 * @throws Will throw an error if Board not found.
 * @throws Will throw an error if at least title, Board id and Column id are not specified.
 */
const createTask = async ({
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
  id = '',
}: ITask) => {
  if (!db.store.boards.has(boardId)) {
    const error = new ErrorWithStatus(`Couldn't find a board with id ${boardId}`);
    error.status = StatusCodes.NOT_FOUND; // 404
    throw error;
  }

  const board = db.store.boards.get(boardId) as IBoard;

  if (!board.tasks.size) {
    board.tasks = new Map();
  }

  if (!title || !boardId) {
    const error = new ErrorWithStatus('Title, board id and column id are required.');
    error.status = StatusCodes.BAD_REQUEST; // 400
    throw error;
  }

  const task = new Task({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
    id,
  });

  board.tasks.set(task.id, task);

  return task;
};

/**
 * Updates the Task by ID.
 * @async
 * @function updateTask
 * @argument {string} taskId - The Task id.
 * @argument {string} title - The title of the Task.
 * @argument {string} order - The order of the Task.
 * @argument {string} description - The description of the Task.
 * @argument {string} userId - The User id of the Task.
 * @argument {string} boardId - The Board id of the Task.
 * @argument {string} columnId - The Column id of the Task.
 * @returns {Task} the updated Task object.
 * @throws Will throw an error if Board not found.
 * @throws Will throw an error if Task not found.
 * @throws Will throw an error if at least title, Board id and Column id are not specified.
 */
const updateTask = async ({
  id,
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
}: ITask) => {
  if (!db.store.boards.has(boardId)) {
    const error = new ErrorWithStatus(`Couldn't find a board with id ${boardId}`);
    error.status = StatusCodes.NOT_FOUND; // 404
    throw error;
  }

  const board = db.store.boards.get(boardId) as IBoard;

  if (!board.tasks.size) {
    board.tasks = new Map();
  }

  if (!board.tasks.has(id)) {
    const error = new ErrorWithStatus(`Couldn't find a task with id ${id}`);
    error.status = StatusCodes.NOT_FOUND; // 404
    throw error;
  }

  if (!title || !boardId) {
    const error = new ErrorWithStatus('Title, board id and column id are required.');
    error.status = StatusCodes.BAD_REQUEST; // 400
    throw error;
  }

  const task = board.tasks.get(id) as ITask;

  const updatedTask = {
    ...task,
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  };

  board.tasks.set(id, updatedTask);

  return updatedTask;
};

/**
 * Removes Task by the Board and Task IDs.
 * @async
 * @function removeTask
 * @argument {string} taskId - The Task id.
 * @argument {string} boardId - The Board id.
 * @throws Will throw an error if Board not found.
 * @throws Will throw an error if Task not found.
 */
const removeTask = async (boardId: BoardID, id: TaskID) => {
  if (!db.store.boards.has(boardId)) {
    const error = new ErrorWithStatus(`Couldn't find a board with id ${boardId}`);
    error.status = StatusCodes.NOT_FOUND; // 404
    throw error;
  }

  const board = db.store.boards.get(boardId) as IBoard;

  if (!board.tasks.size) {
    board.tasks = new Map();
  }

  if (!board.tasks.has(id)) {
    const error = new ErrorWithStatus(`Couldn't find a task with id ${id}`);
    error.status = StatusCodes.NOT_FOUND; // 404
    throw error;
  }

  board.tasks.delete(id);
};

export default {
  getAll,
  getTaskById,
  createTask,
  updateTask,
  removeTask,
};
