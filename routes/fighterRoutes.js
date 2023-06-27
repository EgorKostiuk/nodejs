import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

// TODO: Implement route controllers for fighter

router.get("/", (req, res) => {
  // Отримати всіх бійців
  const fighters = fighterService.getAllFighters();
  res.data = fighters;
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  // Отримати бійця за id
  const fighter = fighterService.getFighterById(id);

  if (fighter) {
    res.data = fighter;
  } else {
    res.err = { error: true, message: "Fighter not found" };
  }
});

router.post("/", createFighterValid, (req, res) => {
  const fighterData = req.body;
  // Створити нового бійця
  const createdFighter = fighterService.createFighter(fighterData);
  res.data = createdFighter;
});

router.put("/:id", updateFighterValid, (req, res) => {
  const { id } = req.params;
  const updatedFighterData = req.body;
  // Оновити бійця за id
  const updatedFighter = fighterService.updateFighter(id, updatedFighterData);

  if (updatedFighter) {
    res.data = updatedFighter;
  } else {
    res.err = { error: true, message: "Fighter not found" };
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  // Видалити бійця за id
  const deletedFighter = fighterService.deleteFighter(id);

  if (deletedFighter) {
    res.data = deletedFighter;
  } else {
    res.err = { error: true, message: "Fighter not found" };
  }
});

router.use(responseMiddleware);

export { router };
