import express from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { isPermited, isAuthenticated, activityLogger } from "../../middlewares";
import { createScoreList } from "./score.services";

const router = express.Router();

// create score list
router.post(
  "/generate",
  isAuthenticated,
  isPermited,
  async (req: any, res: any, next: any) => {
    try {
      const scoreList = await createScoreList(req.body);
      res.json({ message: "Score list created" });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
