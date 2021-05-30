import { v4 } from 'uuid';
import { BoardID, IColumn } from './board.types';
import { ITask } from '../tasks/task.types';

/** Class representing a Board. */
class Board {
  public id: BoardID;

  public title: string;

  public columns: IColumn[];

  public tasks: Map<string | null, ITask>;

  /**
   * Creates a Board.
   * @constructor
   * @param {string} id - The Board ID.
   * @param {string} title - The Board title.
   * @param {Column[]} columns - The Board column list.
   */
  constructor(title = 'TITLE', columns: IColumn[] = [], id: string = v4(), tasks: Map<string, ITask> = new Map()) {
    this.id = id;
    this.title = title;
    this.columns = columns;
    this.tasks = tasks;
  }
}

export default Board;
