export type TaskID = string;

/**
 * @global
 * @typedef {Object} Task
 * @property {string} id - Indicates a task id.
 * @property {string} title - Indicates a task title.
 * @property {string} order - Indicates a task order.
 * @property {string} description - Indicates a task description.
 * @property {string} userId - Indicates a User id of a task.
 * @property {string} boardId - Indicates a Board id of a task.
 * @property {string} columnId - Indicates a Column id of a task.
 */
export interface ITask {
  id: TaskID;
  title: string;
  order?: string;
  description?: string;
  userId?: string;
  boardId: string;
  columnId?: string;
}
