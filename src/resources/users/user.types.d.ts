export type UserID = string | null;

/**
 * @typedef {Object} User
 * @property {string} name - Indicates a User name.
 * @property {string} login - Indicates a User login.
 * @property {string} password - Indicates a User password.
 * @property {string} id - Indicates a User id.
 */
export interface IUser {
  id: UserID;
  name: string;
  login: string;
  password: string;
}
