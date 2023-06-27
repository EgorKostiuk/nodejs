import { Router } from "express";
import { fightersService } from "../services/fightService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// OPTIONAL TODO: Implement route controller for fights

// Отримання всіх боїв
router.get("/", (req, res, next) => {
  try {
    const fights = fightService.getAllFights();
    res.sendResponse({ fights });
  } catch (error) {
    res.sendError(error);
  }
}, responseMiddleware);

// Отримання бою за ідентифікатором
router.get("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const fight = fightService.getFightById(id);
    if (!fight) {
      res.sendNotFound();
      return;
    }
    res.sendResponse({ fight });
  } catch (error) {
    res.sendError(error);
  }
}, responseMiddleware);

// Створення нового бою
router.post("/", createFightValid, (req, res, next) => {
  try {
    const { fighter1, fighter2 } = req.body;
    const fight = fightService.createFight(fighter1, fighter2);
    res.sendResponse({ fight });
  } catch (error) {
    res.sendError(error);
  }
}, responseMiddleware);

// Оновлення бою за ідентифікатором
router.put("/:id", updateFightValid, (req, res, next) => {
  try {
    const { id } = req.params;
    const { fighter1Shot, fighter2Shot } = req.body;
    const fight = fightService.updateFight(id, fighter1Shot, fighter2Shot);
    if (!fight) {
      res.sendNotFound();
      return;
    }
    res.sendResponse({ fight });
  } catch (error) {
    res.sendError(error);
  }
}, responseMiddleware);

// Видалення бою за ідентифікатором
router.delete("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const success = fightService.deleteFight(id);
    if (!success) {
      res.sendNotFound();
      return;
    }
    res.sendResponse({ message: "Fight deleted" });
  } catch (error) {
    res.sendError(error);
  }
}, responseMiddleware);

export { router };
