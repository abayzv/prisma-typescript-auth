import express, { query } from "express";
import { getAllLog } from "./log.services";
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
  checkSchema(rules),
  async (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(errors.array());

    const { name, action, startDate, endDate } = matchedData(req, {
      locations: ["query"],
    });
    const query = {
      name,
      action,
      startDate,
      endDate,
      page: req.query.page,
      show: req.query.show,
    };

    try {
      const logs = await getAllLog(query);
      res.json(logs);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
