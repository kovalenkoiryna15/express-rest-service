import { StatusCodes } from 'http-status-codes';
import db from '../../db/db';
import User from './user.model';
import { IUser, UserID } from './user.types';
import { IBoard } from '../boards/board.types';
import { ITask } from '../tasks/task.types';
import ErrorWithStatus from '../../types';

/**
 * Gets all users.
 * @alias getAllUsers
 * @async
 * @function getAll
 * @returns {User[]} a list of users.
 */
const getAll = async () => {
  if (!db.store.users) {
    db.store.users = new Map();
  }

  return [...db.store.users.values()];
};

/**
 * Gets a User by ID.
 * @async
 * @function getUserById
 * @argument {string} id - The id of the User.
 * @returns {User} the User object.
 * @throws Will throw an error if User not found.
 */
const getUserById = async (id: UserID) => {
  if (!db.store.users) {
    db.store.users = new Map();
  }

  if (!db.store.users.has(id)) {
    const error = new ErrorWithStatus(`Couldn't find a user with id ${id}`);
    error.status = StatusCodes.NOT_FOUND; // 404
    throw error;
  }

  return db.store.users.get(id);
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
const createUser = async (name: string, login: string, password: string) => {
  if (!db.store.users) {
    db.store.users = new Map();
  }

  if (!name || !login || !password) {
    const error = new ErrorWithStatus('Name, login and password are required.');
    error.status = StatusCodes.BAD_REQUEST; // 400
    throw error;
  }

  const user = new User({
    name,
    login,
    password,
  });

  db.store.users.set(user.id, user);

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
const updateUser = async ({
  id, name, login, password,
}: IUser) => {
  if (!db.store.users) {
    db.store.users = new Map();
  }

  if (!db.store.users.has(id)) {
    const error = new ErrorWithStatus(`Couldn't find a user with id ${id}`);
    error.status = StatusCodes.NOT_FOUND; // 404
    throw error;
  }

  if (!name || !login || !password) {
    const error = new ErrorWithStatus('Name, login and password are required.');
    error.status = StatusCodes.BAD_REQUEST; // 400
    throw error;
  }

  const user = db.store.users.get(id) as IUser;

  const updatedUser = {
    ...user,
    name,
    login,
    password,
  };

  db.store.users.set(id, updatedUser);

  return updatedUser;
};

/**
 * Deletes User by ID. All Tasks where User is assignee will be updated to put userId=null.
 * @async
 * @function removeUser
 * @argument {string} id - The id of the User.
 * @throws Will throw an error if User not found.
 */
const removeUser = async (id: UserID) => {
  if (!db.store.users) {
    db.store.users = new Map();
  }

  if (!db.store.users.has(id)) {
    const error = new ErrorWithStatus(`Couldn't find a user with id ${id}`);
    error.status = StatusCodes.NOT_FOUND; // 404
    throw error;
  }

  if (!db.store.boards.size) {
    db.store.boards = new Map();
  }

  const boards = [...db.store.boards.values()] as IBoard[];

  if (boards.length > 0) {
    boards.forEach((board) => {
      const currentBoard = db.store.boards.get(board.id) as IBoard;

      if (!currentBoard.tasks.size) {
        currentBoard.tasks = new Map();
      }
      const tasks = [...currentBoard.tasks.values()] as ITask[];
      if (tasks.length > 0) {
        tasks.forEach((task) => {
          if (task.userId && task.userId === id) {
            const updatedTask = {
              ...task,
              userId: null,
            };
            currentBoard.tasks.set(task.id, updatedTask);
          }
        });
      }
    });
  }

  db.store.users.delete(id);
};

export default {
  getAll, getUserById, createUser, updateUser, removeUser,
};
