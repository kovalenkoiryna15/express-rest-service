const { v4: uuidv4 } = require('uuid');

/** Class representing a User. */
class User {
  /**
   * Creates a User.
   * @constructor
   * @param {string} id - The User ID.
   * @param {string} name - The User name.
   * @param {string} login - The User login.
   * @param {string} password - The User password.
   */
  constructor({
    id = uuidv4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
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
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
