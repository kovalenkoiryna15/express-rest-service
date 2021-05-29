import { v4 } from 'uuid';
import { UserID, IUser } from './user.types';

/** Class representing a User. */
class User {
  public id: UserID;

  public name: string;

  public login: string;

  public password: string;

  /**
   * Creates a User.
   * @constructor
   * @param {string} id - The User ID.
   * @param {string} name - The User name.
   * @param {string} login - The User login.
   * @param {string} password - The User password.
   */
  constructor({
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
    id = v4(),
  }) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Gets the User object to response.
   * @method
   * @static
   * @param {User} user - the User object
   * @return {UserToResponse} The User object without ID field.
   */
  static toResponse(user: IUser) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
