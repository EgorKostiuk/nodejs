import { Router } from "express";
import { authService } from "../services/authService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.post(
  "/login",
  (req, res, next) => {
    try {
      // TODO: Implement login action (get the user if it exist with entered credentials)

      const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: true, message: "Email and password are required" });
      return;
    }

    const user = authService.login(email, password);

    if (!user) {
      res.status(400).json({ error: true, message: "Invalid email or password" });
      return;
    }

    res.json({ user });
      res.data = data;
    } catch (err) {
      res.err = err;
      res.status(500).json({ error: true, message: "Internal server error" });
    } finally {
      next();
    }
  },
  router.use(responseMiddleware)
);

export { router };
