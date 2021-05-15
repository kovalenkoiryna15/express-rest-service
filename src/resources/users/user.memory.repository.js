const { NOT_FOUND, BAD_REQUEST } = require('http-status-codes');
const DB = require('../../db/db');
const User = require('./user.model');

const db = new DB();

const getAll = async () => {
  if (!db.store.users) {
    db.store.users = {};
  }

  return Object.values(db.store.users);
};

const getUserById = async (id) => {
  if (!db.store.users) {
    db.store.users = {};
  }

  if (!db.store.users.id) {
    const error = new Error(`Couldn't find a user with id ${id}`);
    error.status = NOT_FOUND; // 404
    throw error;
  }

  return db.store.users.id;
};

const createUser = async (name, login, password) => {
  if (!db.store.users) {
    db.store.users = {};
  }

  if (!name || !login || !password) {
    const error = new Error(`Name, login and password are required.`);
    error.status = BAD_REQUEST; // 401
    throw error;
  }

  const user = new User({
    name,
    login,
    password,
  });

  db.store.users.id = user;

  return user;
};

const updateUser = async (id, name, login, password) => {
  if (!db.store.users) {
    db.store.users = {};
  }

  if (!db.store.users.id) {
    const error = new Error(`Couldn't find a user with id ${id}`);
    error.status = NOT_FOUND; // 404
    throw error;
  }

  if (!name || !login || !password) {
    const error = new Error(`Name, login and password are required.`);
    error.status = BAD_REQUEST; // 401
    throw error;
  }

  const user = db.store.users.id;

  const updatedUser = {
    ...user,
    name,
    login,
    password,
  };

  db.store.users.id = updatedUser;

  return updatedUser;
};

const removeUser = async (id) => {
  if (!db.store.users) {
    db.store.users = {};
  }

  if (!db.store.users.id) {
    const error = new Error(`Couldn't find a user with id ${id}`);
    error.status = NOT_FOUND; // 404
    throw error;
  }

  delete db.store.users.id;
};

module.exports = { getAll, getUserById, createUser, updateUser, removeUser };
