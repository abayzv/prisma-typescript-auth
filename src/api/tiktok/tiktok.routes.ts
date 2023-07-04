import express, { query } from "express";
import { isPermited, isAuthenticated } from "../../middlewares";
import { checkSchema, validationResult, matchedData } from "express-validator";

const router = express.Router();

// Validation Rules
const rules = {
  name: {
    optional: true,
  },
  action: {
    optional: true,
  },
  startDate: {
    optional: true,
    isDate: {
      errorMessage: "Start Date must be a valid date",
    },
  },
  endDate: {
    optional: true,
    isDate: {
      errorMessage: "End Date must be a valid date",
    },
  },
};

// Get all logs
router.get(
  "/",
  //   isAuthenticated,
  //   isPermited,
  //   checkSchema(rules),
  async (req: any, res: any, next: any) => {
    res.json({ message: "Tiktok" });
  }
);

export default router;
