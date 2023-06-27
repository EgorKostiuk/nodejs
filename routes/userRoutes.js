import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// TODO: Implement route controllers for user

router.get("/", (req, res) => {
  // Отримати всіх користувачів
  const users = userService.getAllUsers();
  res.data = users;
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  // Отримати користувача за id
  const user = userService.getUserById(id);

  if (user) {
    res.data = user;
  } else {
    res.err = { error: true, message: "User not found" };
  }
});

router.post("/", createUserValid, (req, res) => {
  const userData = req.body;
  // Створити нового користувача
  const createdUser = userService.createUser(userData);
  res.data = createdUser;
});

router.put("/:id", updateUserValid, (req, res) => {
  const { id } = req.params;
  const updatedUserData = req.body;
  // Оновити користувача за id
  const updatedUser = userService.updateUser(id, updatedUserData);

  if (updatedUser) {
    res.data = updatedUser;
  } else {
    res.err = { error: true, message: "User not found" };
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  // Видалити користувача за id
  const deletedUser = userService.deleteUser(id);

  if (deletedUser) {
    res.data = deletedUser;
  } else {
    res.err = { error: true, message: "User not found" };
  }
});

router.use(responseMiddleware);

export { router };
