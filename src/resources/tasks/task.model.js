const { v4: uuidv4 } = require('uuid');

/** Class representing a Task. */
class Task {
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
    id = uuidv4(),
    title = 'TITLE',
    order,
    description = 'New awesome task.',
    userId,
    boardId,
    columnId,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

module.exports = Task;
