import { IUser } from '../resources/users/user.types';
import { IBoard } from '../resources/boards/board.types';

export interface Store {
  users: Map<string | null, IUser>;
  boards: Map<string | null, IBoard>;
}
