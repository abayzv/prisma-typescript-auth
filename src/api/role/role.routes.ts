import express from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { isPermited, isAuthenticated } from "../../middlewares";
import {
  viewAllRoles,
  createRole,
  updateRole,
  deleteRole,
  findRoleByName,
} from "./role.services";

const router = express.Router();

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
};

router.get(
  "/",
  isAuthenticated,
  isPermited,
  async (req: any, res: any, next: any) => {
    try {
      const roles = await viewAllRoles();
      res.json(roles);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  isAuthenticated,
  isPermited,
  checkSchema(rules),
  async (req: any, res: any, next: any) => {
    // init validation
    const errors = validationResult(req);

    // if not valid return error
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    // if valid get data
    const { name } = matchedData(req);
    const roleData: Role = {
      name,
    };

    //   check if role already exist
    const isExist = await findRoleByName(name);
    if (isExist) return res.status(400).json({ message: "Role already exist" });

    //  create role if not exist
    try {
      const roles = await createRole(roleData);
      res.json(roles);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  isAuthenticated,
  isPermited,
  checkSchema(rules),
  async (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    const id = +req.params.id;

    if (errors.isEmpty()) {
      const { name } = matchedData(req);
      const roleData: Role = {
        id,
        name,
      };

      try {
        const roles = await updateRole(roleData);
        res.json(roles);
      } catch (error) {
        next(error);
      }
    } else {
      res.status(400).json({ errors: errors.array() });
    }
  }
);

export default router;
