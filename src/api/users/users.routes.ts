import express from "express";
import { isAuthenticated, permited } from "../../middlewares";
import { findUserById } from "./users.services";

const router = express.Router();

router.get(
  "/profile",
  isAuthenticated,
  permited("ADMIN", "STUDENT"),
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
