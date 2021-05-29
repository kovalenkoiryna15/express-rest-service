import { v4 } from 'uuid';
import { ITask, TaskID } from './task.types';
import { BoardID } from '../boards/board.types';

/** Class representing a Task. */
class Task {
  public id: TaskID;

  public title: string;

  public order?: string | undefined;

  public description?: string | undefined;

  public userId?: string | undefined;

  public boardId: BoardID;

  public columnId?: string | undefined;

  /**
   * Creates a Board.
   * @constructor
   * @param {string} id - The Task ID.
   * @param {string} title - The Task title.
   * @param {string} order - The Task order.
   * @param {string} description - The Task description.
   * @param {string} userId - The User ID.
   * @param {string} boardId - The Board ID.
   * @param {string} columnId - The Column ID.
   */
  constructor({
    id = v4(),
    title = 'TITLE',
    order,
    description = 'New awesome task.',
    userId,
    boardId,
    columnId,
  }: ITask) {
    this.id = id || v4();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

export default Task;
