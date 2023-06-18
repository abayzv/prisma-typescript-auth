import express from "express";
import { isAuthenticated, isPermited, activityLogger } from "../../middlewares";
import { checkSchema, validationResult, matchedData } from "express-validator";
import {
  getScoreCategoryList,
  createScoreCategory,
  findScoreCategoryByName,
  findScoreCategoryById,
  updateCategory,
  deleteScoreCategory,
} from "./scoreCategory.services";

const router = express.Router();

const rules = {
  name: {
    notEmpty: {
      errorMessage: "Name is required",
    },
  },
};

// Get all score category
router.get(
  "/",
  isAuthenticated,
  isPermited,
  async (req: any, res: any, next: any) => {
    const query = {
      page: req.query.page,
      show: req.query.show,
      name: req.query.name,
    };

    try {
      const scoreCategories = await getScoreCategoryList(query);
      res.json(scoreCategories);
    } catch (error) {
      next(error);
    }
  }
);

// create score category
router.post(
  "/",
  isAuthenticated,
  activityLogger("Create score category", "Success create score category"),
  isPermited,
  checkSchema(rules),
  async (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(errors.array());

    const { name } = matchedData(req, {
      locations: ["body"],
    });

    const scoreCategory = await findScoreCategoryByName(name);
    if (scoreCategory)
      return res.status(409).json({ message: "Score category already exists" });

    try {
      const scoreCategory = await createScoreCategory(name);
      res.json({
        message: "Score category created successfully",
        data: scoreCategory,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Update score category
router.put(
  "/:id",
  isAuthenticated,
  activityLogger("Update score category", "Success update score category"),
  isPermited,
  checkSchema(rules),
  async (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(errors.array());

    const { name } = matchedData(req, {
      locations: ["body"],
    });

    const scoreCategory = await findScoreCategoryById(req.params.id);
    if (!scoreCategory)
      return res.status(404).json({ message: "Score Category not found" });

    const scoreCategoryByName = await findScoreCategoryByName(name);
    if (scoreCategoryByName)
      return res.status(409).json({ message: "Score category already exists" });

    try {
      const scoreCategory = await updateCategory(req.params.id, name);
      res.json({
        message: "Score category updated successfully",
        data: scoreCategory,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Delete score category
router.delete(
  "/:id",
  isAuthenticated,
  activityLogger("Delete score category", "Success delete score category"),
  isPermited,
  async (req: any, res: any, next: any) => {
    const scoreCategory = await findScoreCategoryById(req.params.id);
    if (!scoreCategory)
      return res.status(404).json({ message: "Score category not found" });

    try {
      await deleteScoreCategory(req.params.id);
      res.json({
        message: "Score category deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
