import express from "express";
import { isAuthenticated } from "../../middlewares";
import { findUserById } from "./users.services";

const router = express.Router();

// set permited routes

router.get(
  "/profile",
  isAuthenticated,
  async (req: any, res: any, next: any) => {
    try {
      const { userId } = req.payload;
      const user = await findUserById(userId);

      res.json(user);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
