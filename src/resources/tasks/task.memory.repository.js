const { NOT_FOUND, BAD_REQUEST } = require('http-status-codes');
const db = require('../../db/db');
const Task = require('./task.model');

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
