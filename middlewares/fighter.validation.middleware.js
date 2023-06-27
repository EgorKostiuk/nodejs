import { FIGHTER } from "../models/fighter.js";

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during creation

  const { name, power, defense } = req.body;

  // Перевірка наявності обов'язкових полів
  if (!name || !power || !defense) {
    return res.status(400).json({ error: true, message: "Missing required fields" });
  }

  // Перевірка числових значень power та defense
  if (isNaN(power) || isNaN(defense)) {
    return res.status(400).json({ error: true, message: "Power and defense should be numbers" });
  }

  // Перевірка діапазону power (1 ≤ power ≤ 100)
  if (power < 1 || power > 100) {
    return res.status(400).json({ error: true, message: "Power should be between 1 and 100" });
  }

  // Перевірка діапазону defense (1 ≤ defense ≤ 10)
  if (defense < 1 || defense > 10) {
    return res.status(400).json({ error: true, message: "Defense should be between 1 and 10" });
  }

  // Перевірка наявності зайвих властивостей
  const extraProps = Object.keys(req.body).filter(prop => !Object.hasOwnProperty.call(FIGHTER, prop));
  if (extraProps.length > 0) {
    return res.status(400).json({ error: true, message: "Extra properties are not allowed" });
  }

  // Продовжуємо виконання наступного middleware
  next();
};

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during update

  const { id, name, power, defense } = req.body;

  // Перевірка наявності обов'язкових полів
  if (!id || (!name && !power && !defense)) {
    return res.status(400).json({ error: true, message: "Missing required fields" });
  }

  // Перевірка числових значень power та defense
  if (power && isNaN(power) || defense && isNaN(defense)) {
    return res.status(400).json({ error: true, message: "Power and defense should be numbers" });
  }

  // Перевірка діапазону power (1 ≤ power ≤ 100)
  if (power && (power < 1 || power > 100)) {
    return res.status(400).json({ error: true, message: "Power should be between 1 and 100" });
  }

  // Перевірка діапазону defense (1 ≤ defense ≤ 10)
  if (defense && (defense < 1 || defense > 10)) {
    return res.status(400).json({ error: true, message: "Defense should be between 1 and 10" });
  }

  // Перевірка наявності зайвих властивостей
  const extraProps = Object.keys(req.body).filter(prop => prop !== "id" && !Object.hasOwnProperty.call(FIGHTER, prop));
  if (extraProps.length > 0) {
    return res.status(400).json({ error: true, message: "Extra properties are not allowed" });
  }

  // Продовжуємо виконання наступного middleware
  next();
};

export { createFighterValid, updateFighterValid };
