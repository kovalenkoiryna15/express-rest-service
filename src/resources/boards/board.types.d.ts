import { ITask } from '../tasks/task.types';

export type BoardID = string;

/**
 * @global
 * @typedef {Object} Column
 * @property {string} title - Indicates a column title.
 * @property {number} order - Indicates a column order.
 */
export interface IColumn {
  title: string;
  order: number;
}

/**
 * @global
 * @typedef {Object} Board
 * @property {string} id - Indicates a board id.
 * @property {string} title - Indicates a board title.
 * @property {Column[]} columns - Indicates a list of columns.
 * @property {Map<string, Task>} tasks - Indicates a hash table of task with key as Task ID.
 */
export interface IBoard {
  id: BoardID;
  title: string;
  columns: IColumn[];
  tasks: Map;
}
