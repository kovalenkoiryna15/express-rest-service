import taskRepo from './task.memory.repository';
import { ITask, TaskID } from './task.types';
import { BoardID } from '../boards/board.types';

/**
 * Gets all tasks by the Board ID.
 * @alias taskServiceGetAll
 * @argument {string} boardId - The id of the Board.
 * @returns {Task[]} a list of tasks.
 */
const getAll = (boardId: BoardID) => taskRepo.getAll(boardId);

/**
 * Gets the Task by the Board and Task IDs
 * @alias taskServiceGet
 * @argument {string} boardId - The id of the Board.
 * @argument {string} taskId - The id of the Task.
 * @returns {Task} the Task object.
 */
const get = (boardId: BoardID, id: TaskID) => taskRepo.getTaskById(boardId, id);

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
const create = (
  boardId: string,
  title: string,
  order?: string,
  description?: string,
  userId?: string,
  columnId?: string,
) => taskRepo.createTask({
  boardId, title, order, description, userId, columnId, id: '',
});

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
const update = (task: ITask) => taskRepo.updateTask(task);

/**
 * Removes Task by the Board and Task IDs.
 * @alias taskServiceRemove
 * @argument {string} taskId - The Task id.
 * @argument {string} boardId - The Board id.
 */
const remove = (boardId: BoardID, id: TaskID) => taskRepo.removeTask(boardId, id);

export default {
  getAll, get, create, update, remove,
};
