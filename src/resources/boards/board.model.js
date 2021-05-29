const { v4: uuidv4 } = require('uuid');
require('./board.types');

/** Class representing a Board. */
class Board {
  /**
   * Creates a Board.
   * @constructor
   * @param {string} id - The Board ID.
   * @param {string} title - The Board title.
   * @param {Column[]} columns - The Board column list.
   */
  constructor({ id = uuidv4(), title = 'TITLE', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
