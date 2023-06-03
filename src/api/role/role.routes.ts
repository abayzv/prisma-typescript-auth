import express from "express";
import { isPermited, isAuthenticated } from "../../middlewares";
import { viewAllRoles, createRole } from "./role.services";

const router = express.Router();

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
  async (req: any, res: any, next: any) => {
    try {
      const roles = await createRole(req.body);
      res.json(roles);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
