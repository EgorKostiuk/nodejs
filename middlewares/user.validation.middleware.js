import { USER } from "../models/user.js";

const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for USER entity during creation

  const { firstName, lastName, email, phoneNumber, password } = req.body;

  // Перевірка наявності обов'язкових полів
  if (!firstName || !lastName || !email || !phoneNumber || !password) {
    return res.status(400).json({ error: true, message: "Missing required fields" });
  }

  // Перевірка формату email (тільки gmail)
  const emailRegex = /^[a-zA-Z0-9]+@(gmail\.com)$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: true, message: "Invalid email format" });
  }

  // Перевірка формату phoneNumber (+380xxxxxxxxx)
  const phoneRegex = /^\+380\d{9}$/;
  if (!phoneRegex.test(phoneNumber)) {
    return res.status(400).json({ error: true, message: "Invalid phone number format" });
  }

  // Перевірка мінімальної довжини пароля (мінімум 3 символи)
  if (password.length < 3) {
    return res.status(400).json({ error: true, message: "Password should be at least 3 characters long" });
  }

  // Перевірка наявності зайвих властивостей
  const extraProps = Object.keys(req.body).filter(prop => !Object.hasOwnProperty.call(USER, prop));
  if (extraProps.length > 0) {
    return res.status(400).json({ error: true, message: "Extra properties are not allowed" });
  }

  // Продовжуємо виконання наступного middleware
  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update

  const { id, firstName, lastName, email, phoneNumber, password } = req.body;

  // Перевірка наявності обов'язкових полів
  if (!id || (!firstName && !lastName && !email && !phoneNumber && !password)) {
    return res.status(400).json({ error: true, message: "Missing required fields" });
  }

  // Перевірка формату email (тільки gmail)
  if (email) {
    const emailRegex = /^[a-zA-Z0-9]+@(gmail\.com)$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: true, message: "Invalid email format" });
    }
  }

  // Перевірка формату phoneNumber (+380xxxxxxxxx)
  if (phoneNumber) {
    const phoneRegex = /^\+380\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({ error: true, message: "Invalid phone number format" });
    }
  }

  // Перевірка мінімальної довжини пароля (мінімум 3 символи)
  if (password && password.length < 3) {
    return res.status(400).json({ error: true, message: "Password should be at least 3 characters long" });
  }

  // Перевірка наявності зайвих властивостей
  const extraProps = Object.keys(req.body).filter(prop => prop !== "id" && !Object.hasOwnProperty.call(USER, prop));
  if (extraProps.length > 0) {
    return res.status(400).json({ error: true, message: "Extra properties are not allowed" });
  }

  // Продовжуємо виконання наступного middleware
  next();
};

export { createUserValid, updateUserValid };
