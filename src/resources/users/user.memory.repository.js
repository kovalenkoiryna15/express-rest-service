const { NOT_FOUND, BAD_REQUEST } = require('http-status-codes');
const db = require('../../db/db');
const User = require('./user.model');
require('./user.types');

/**
 * Gets all users.
 * @alias getAllUsers
 * @async
 * @function getAll
 * @returns {User[]} a list of users.
 */
const getAll = async () => {
  if (!db.store.users) {
    db.store.users = {};
  }

  return Object.values(db.store.users);
};

/**
 * Gets a User by ID.
 * @async
 * @function getUserById
 * @argument {string} id - The id of the User.
 * @returns {User} the User object.
 * @throws Will throw an error if User not found.
 */
const getUserById = async (id) => {
  if (!db.store.users) {
    db.store.users = {};
  }

  if (!db.store.users[id]) {
    const error = new Error(`Couldn't find a user with id ${id}`);
    error.status = NOT_FOUND; // 404
    throw error;
  }

  return db.store.users[id];
};

/**
 * Creates a new User.
 * @async
 * @function createUser
 * @argument {string} name - The name of the User.
 * @argument {string} login - The login of the User.
 * @argument {string} password - The password of the User.
 * @returns {User} the User object.
 * @throws Will throw an error if name, login or password are not specified.
 */
const createUser = async (name, login, password) => {
  if (!db.store.users) {
    db.store.users = {};
  }

  if (!name || !login || !password) {
    const error = new Error(`Name, login and password are required.`);
    error.status = BAD_REQUEST; // 400
    throw error;
  }

  const user = new User({
    name,
    login,
    password,
  });

  db.store.users[user.id] = user;

  return user;
};

/**
 * Updates a User by ID.
 * @async
 * @function updateUser
 * @argument {string} id - The id of the User.
 * @argument {string} name - The name of the User.
 * @argument {string} login - The login of the User.
 * @argument {string} password - The password of the User.
 * @returns {User} the updated User object.
 * @throws Will throw an error if User not found.
 * @throws Will throw an error if name, login or password are not specified.
 */
const updateUser = async (id, name, login, password) => {
  if (!db.store.users) {
    db.store.users = {};
  }

  if (!db.store.users[id]) {
    const error = new Error(`Couldn't find a user with id ${id}`);
    error.status = NOT_FOUND; // 404
    throw error;
  }

  if (!name || !login || !password) {
    const error = new Error(`Name, login and password are required.`);
    error.status = BAD_REQUEST; // 400
    throw error;
  }

  const user = db.store.users[id];

  const updatedUser = {
    ...user,
    name,
    login,
    password,
  };

  db.store.users[id] = updatedUser;

  return updatedUser;
};

/**
 * Deletes User by ID. All Tasks where User is assignee will be updated to put userId=null.
 * @async
 * @function removeUser
 * @argument {string} id - The id of the User.
 * @throws Will throw an error if User not found.
 */
const removeUser = async (id) => {
  if (!db.store.users) {
    db.store.users = {};
  }

  if (!db.store.users[id]) {
    const error = new Error(`Couldn't find a user with id ${id}`);
    error.status = NOT_FOUND; // 404
    throw error;
  }

  if (!db.store.boards) {
    db.store.boards = {};
  }

  const boards = Object.values(db.store.boards);

  if (boards.length > 0) {
    boards.forEach((board) => {
      if (!db.store.boards[board.id].tasks) {
        db.store.boards[board.id].tasks = {};
      }
      const tasks = Object.values(db.store.boards[board.id].tasks);
      if (tasks.length > 0) {
        tasks.forEach((task) => {
          if (task.userId && task.userId === id) {
            db.store.boards[board.id].tasks[task.id].userId = null;
          }
        });
      }
    });
  }

  delete db.store.users[id];
};

module.exports = { getAll, getUserById, createUser, updateUser, removeUser };
