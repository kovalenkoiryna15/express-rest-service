import usersRepo from './user.memory.repository';
import { IUser, UserID } from './user.types';

/**
 * Gets all users from database.
 * @alias userServiceGetAll
 * @returns {User[]} a list of users.
 */
const getAll = () => usersRepo.getAll();

/**
 * Gets a User by ID.
 * @alias userServiceGet
 * @argument {string} id - The id of the User.
 * @returns {User} the User object.
 */
const get = (id: UserID) => usersRepo.getUserById(id);

/**
 * Creates a new User.
 * @alias userServiceCreate
 * @argument {string} name - The name of the User.
 * @argument {string} login - The login of the User.
 * @argument {string} password - The password of the User.
 * @returns {User} the User object.
 */
const create = (name: string, login: string, password: string) => {
  const user = usersRepo.createUser(name, login, password);
  return user;
};

/**
 * Updates a User by ID.
 * @alias userServiceUpdate
 * @argument {string} id - The id of the User.
 * @argument {string} name - The name of the User.
 * @argument {string} login - The login of the User.
 * @argument {string} password - The password of the User.
 * @returns {User} the updated User object.
 */
const update = ({
  id, name, login, password,
}: IUser) => usersRepo.updateUser({
  id, name, login, password,
});

/**
 * Deletes User by ID.
 * @alias userServiceRemove
 * @function removeUser
 * @argument {string} id - The id of the User.
 */
const remove = (id: UserID) => usersRepo.removeUser(id);

export default {
  getAll, get, create, update, remove,
};
