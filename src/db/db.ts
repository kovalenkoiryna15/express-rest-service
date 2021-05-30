import { Store } from './db.types';

/**
 * Represents a database.
 * @constructor
 */
class DB {
  public store: Store;

  constructor() {
    const users = new Map();
    const boards = new Map();
    this.store = {
      users,
      boards,
    };
  }
}

const db = new DB();

export default db;
