const { v4: uuidv4 } = require('uuid');

class Board {
  constructor({ id = uuidv4(), title = 'TITLE', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
