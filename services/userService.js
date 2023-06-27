import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user
  getAllUsers() {
    return userRepository.getAll();
  }

  getUserById(id) {
    return userRepository.getById(id);
  }

  createUser(userData) {
    return userRepository.create(userData);
  }

  updateUser(id, updatedUserData) {
    return userRepository.update(id, updatedUserData);
  }

  deleteUser(id) {
    return userRepository.delete(id);
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const userService = new UserService();

export { userService };
