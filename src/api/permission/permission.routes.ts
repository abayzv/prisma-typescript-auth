import express from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { isPermited, isAuthenticated, activityLogger } from "../../middlewares";
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
    isIn: {
      options: [["GET", "POST", "PUT", "DELETE"]],
      errorMessage: "Action must be GET, POST, PUT or DELETE",
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

const editRules = {
  name: {
    optional: true,
    isLength: {
      options: { min: 3 },
      errorMessage: "Name must be at least 3 characters long",
    },
  },
  action: {
    optional: true,
    isLength: {
      options: { min: 3 },
      errorMessage: "Name must be at least 3 characters long",
    },
    isIn: {
      options: [["GET", "POST", "PUT", "DELETE"]],
      errorMessage: "Action must be GET, POST, PUT or DELETE",
    },
  },
  menu: {
    optional: true,
    isLength: {
      options: { min: 3 },
      errorMessage: "Name must be at least 3 characters long",
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
      const query = {
        name: req.query.name,
        page: req.query.page,
        show: req.query.show,
      };

      const permissions = await viewAllPermissions(query);
      res.json(permissions);
    } catch (error) {
      next(error);
    }
  }
);

// Create Permission
router.post(
  "/",
  isAuthenticated,
  activityLogger("Create Permission", "Successfully create permission"),
  isPermited,
  checkSchema(rules),
  async (req: any, res: any, next: any) => {
    // init validation
    const errors = validationResult(req);

    // if not valid return error
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    // if valid get data
    const { name, action, menu } = matchedData(req);
    const permissionData = { name, action, menu };

    //   check if role already exist
    const isExist = await findPermissionByName(name);
    if (isExist)
      return res.status(400).json({ message: "Permission already exist" });

    //  create role
    try {
      const permission = await createPermission(permissionData);
      res.json({ message: "Permission created", data: permission });
    } catch (error) {
      next(error);
    }
  }
);

// Update Permission
router.put(
  "/:id",
  isAuthenticated,
  activityLogger("Update Permission", "Successfully update permission"),
  isPermited,
  checkSchema(editRules),
  async (req: any, res: any, next: any) => {
    const id = +req.params.id;

    // init validation
    const errors = validationResult(req);

    // if not valid return error
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    // if valid get data
    const { name, action, menu } = matchedData(req);
    const permissionData = { name, action, menu };

    // check if permission exist
    const permission = await findPermissionById(id);
    if (!permission)
      return res.status(400).json({ message: "Permission not found" });

    //   check if permission already exist
    const isExist = await findPermissionByName(name);
    if (isExist?.id !== id)
      return res.status(400).json({ message: "Permission already exist" });

    //  update permission
    try {
      const permission = await updatePermission({
        permissionId: id,
        permission: permissionData,
      });
      res.json({ message: "Permission updated", data: permission });
    } catch (error) {
      next(error);
    }
  }
);

// Delete Permission
router.delete(
  "/:id",
  isAuthenticated,
  activityLogger("Delete Permission", "Successfully delete permission"),
  isPermited,
  async (req: any, res: any, next: any) => {
    const id = +req.params.id;

    // check if permission exist
    const permission = await findPermissionById(id);
    if (!permission)
      return res.status(400).json({ message: "Permission not found" });

    //  delete permission
    try {
      await deletePermission(id);
      res.json({ message: "Permission deleted" });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
