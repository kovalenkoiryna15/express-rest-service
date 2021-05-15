const { NOT_FOUND, BAD_REQUEST } = require('http-status-codes');
const db = require('../../db/db');
const Task = require('./task.model');

const getAll = async () => {
  if (!db.store.tasks) {
    db.store.tasks = {};
  }

  return Object.values(db.store.tasks);
};

const getTaskById = async (id) => {
  if (!db.store.tasks) {
    db.store.tasks = {};
  }

  if (!db.store.boards.id) {
    const error = new Error(`Couldn't find a task with id ${id}`);
    error.status = NOT_FOUND; // 404
    throw error;
  }

  return db.store.tasks.id;
};

const createTask = async (
  title,
  order,
  description,
  userId,
  boardId,
  columnId
) => {
  if (!db.store.tasks) {
    db.store.tasks = {};
  }

  if (!title || !boardId || !columnId) {
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

  db.store.tasks.id = task;

  return task;
};

const updateTask = async (
  id,
  title,
  order,
  description,
  userId,
  boardId,
  columnId
) => {
  if (!db.store.tasks) {
    db.store.tasks = {};
  }

  if (!db.store.tasks.id) {
    const error = new Error(`Couldn't find a task with id ${id}`);
    error.status = NOT_FOUND; // 404
    throw error;
  }

  if (!title || !boardId || !columnId) {
    const error = new Error(`Title, board id and column id are required.`);
    error.status = BAD_REQUEST; // 400
    throw error;
  }

  const task = db.store.tasks.id;

  const updatedTask = {
    ...task,
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  };

  db.store.tasks.id = updatedTask;

  return updatedTask;
};

const removeTask = async (id) => {
  if (!db.store.tasks) {
    db.store.tasks = {};
  }

  if (!db.store.tasks.id) {
    const error = new Error(`Couldn't find a task with id ${id}`);
    error.status = NOT_FOUND; // 404
    throw error;
  }

  delete db.store.tasks.id;
};

module.exports = {
  getAll,
  getTaskById,
  createTask,
  updateTask,
  removeTask,
};
