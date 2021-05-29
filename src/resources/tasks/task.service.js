const taskRepo = require('./task.memory.repository');
require('./task.types');

/**
 * Gets all tasks by the Board ID.
 * @alias taskServiceGetAll
 * @argument {string} boardId - The id of the Board.
 * @returns {Task[]} a list of tasks.
 */
const getAll = (boardId) => taskRepo.getAll(boardId);

/**
 * Gets the Task by the Board and Task IDs
 * @alias taskServiceGet
 * @argument {string} boardId - The id of the Board.
 * @argument {string} taskId - The id of the Task.
 * @returns {Task} the Task object.
 */
const get = (boardId, taskId) => taskRepo.getTaskById(boardId, taskId);

/**
 * Creates a new Task.
 * @alias taskServiceCreate
 * @argument {string} title - The title of new Task.
 * @argument {string} order - The order of new Task.
 * @argument {string} description - The description of new Task.
 * @argument {string} userId - The User id of new Task.
 * @argument {string} boardId - The Board id of new Task.
 * @argument {string} columnId - The Column id of new Task.
 * @returns {Task} the new Task object.
 */
const create = (task) => taskRepo.createTask(task);

/**
 * Updates the Task by ID.
 * @alias taskServiceUpdate
 * @argument {string} taskId - The Task id.
 * @argument {string} title - The title of the Task.
 * @argument {string} order - The order of the Task.
 * @argument {string} description - The description of the Task.
 * @argument {string} userId - The User id of the Task.
 * @argument {string} boardId - The Board id of the Task.
 * @argument {string} columnId - The Column id of the Task.
 * @returns {Task} the updated Task object.
 */
const update = (task) => taskRepo.updateTask(task);

/**
 * Removes Task by the Board and Task IDs.
 * @alias taskServiceRemove
 * @argument {string} taskId - The Task id.
 * @argument {string} boardId - The Board id.
 */
const remove = (boardId, taskId) => taskRepo.removeTask(boardId, taskId);

module.exports = { getAll, get, create, update, remove };
