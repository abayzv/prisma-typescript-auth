import express from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { isPermited, isAuthenticated } from "../../middlewares";
import {
  viewAllPermissions,
  createPermission,
  updatePermission,
  findPermissionByName,
  findPermissionById,
  deletePermission,
} from "./permission.services";

const router = express.Router();

// Validation Rules
const rules = {
  name: {
    notEmpty: {
      errorMessage: "Name is required",
    },
    isLength: {
      options: { min: 3 },
      errorMessage: "Name must be at least 3 characters long",
    },
  },
  action: {
    notEmpty: {
      errorMessage: "Action is required",
    },
  },
  menu: {
    notEmpty: {
      errorMessage: "Menu is required",
    },
    isLength: {
      options: { min: 3 },
      errorMessage: "Menu must be at least 3 characters long",
    },
  },
};

// Vie All Permissions
router.get(
  "/",
  isAuthenticated,
  isPermited,
  async (req: any, res: any, next: any) => {
    try {
      const permissions = await viewAllPermissions();
      res.json(permissions);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
