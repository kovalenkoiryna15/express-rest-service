const { NOT_FOUND, BAD_REQUEST } = require('http-status-codes');
const db = require('../../db/db');
const Task = require('./task.model');
require('./task.types');

/**
 * Gets all tasks by the Board ID.
 * @alias getAllTasks
 * @async
 * @function getAll
 * @argument {string} boardId - The id of the Board.
 * @returns {Task[]} a list of tasks.
 * @throws Will throw an error if Board not found.
 */
const getAll = async (boardId) => {
  if (!db.store.boards[boardId]) {
    const error = new Error(`Couldn't find a board with id ${boardId}`);
    error.status = NOT_FOUND; // 404
    throw error;
  }

  if (!db.store.boards[boardId].tasks) {
    db.store.boards[boardId].tasks = {};
  }

  return Object.values(db.store.boards[boardId].tasks);
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
const getTaskById = async (boardId, taskId) => {
  if (!db.store.boards[boardId]) {
    const error = new Error(`Couldn't find a board with id ${boardId}`);
    error.status = NOT_FOUND; // 404
    throw error;
  }

  if (!db.store.boards[boardId].tasks) {
    db.store.boards[boardId].tasks = {};
  }

  if (!db.store.boards[boardId].tasks[taskId]) {
    const error = new Error(`Couldn't find a task with id ${taskId}`);
    error.status = NOT_FOUND; // 404
    throw error;
  }

  return db.store.boards[boardId].tasks[taskId];
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
}) => {
  if (!db.store.boards[boardId]) {
    const error = new Error(`Couldn't find a board with id ${boardId}`);
    error.status = NOT_FOUND; // 404
    throw error;
  }

  if (!db.store.boards[boardId].tasks) {
    db.store.boards[boardId].tasks = {};
  }

  if (!title || !boardId) {
    const error = new Error(`Title, board id and column id are required.`);
    error.status = BAD_REQUEST; // 400
    throw error;
  }

  const task = new Task({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  });

  db.store.boards[boardId].tasks[task.id] = task;

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
  taskId,
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
}) => {
  if (!db.store.boards[boardId]) {
    const error = new Error(`Couldn't find a board with id ${boardId}`);
    error.status = NOT_FOUND; // 404
    throw error;
  }

  if (!db.store.boards[boardId].tasks) {
    db.store.boards[boardId].tasks = {};
  }

  if (!db.store.boards[boardId].tasks[taskId]) {
    const error = new Error(`Couldn't find a task with id ${taskId}`);
    error.status = NOT_FOUND; // 404
    throw error;
  }

  if (!title || !boardId) {
    const error = new Error(`Title, board id and column id are required.`);
    error.status = BAD_REQUEST; // 400
    throw error;
  }

  const task = db.store.boards[boardId].tasks[taskId];

  const updatedTask = {
    ...task,
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  };

  db.store.boards[boardId].tasks[taskId] = updatedTask;

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
const removeTask = async (boardId, taskId) => {
  if (!db.store.boards[boardId]) {
    const error = new Error(`Couldn't find a board with id ${boardId}`);
    error.status = NOT_FOUND; // 404
    throw error;
  }

  if (!db.store.boards[boardId].tasks) {
    db.store.boards[boardId].tasks = {};
  }

  if (!db.store.boards[boardId].tasks[taskId]) {
    const error = new Error(`Couldn't find a task with id ${taskId}`);
    error.status = NOT_FOUND; // 404
    throw error;
  }

  delete db.store.boards[boardId].tasks[taskId];
};

module.exports = {
  getAll,
  getTaskById,
  createTask,
  updateTask,
  removeTask,
};
