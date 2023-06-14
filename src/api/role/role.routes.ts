import express from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { isPermited, isAuthenticated, activityLogger } from "../../middlewares";
import {
  viewAllRoles,
  createRole,
  updateRole,
  deleteRole,
  findRoleByName,
  findRoleById,
  assignRolePermission,
  deleteRolePermission,
} from "./role.services";

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
};

// Assign Role Permission Rules
const rolePermissionRules = {
  permissions: {
    isArray: {
      errorMessage: "Permission must be an array",
    },
    notEmpty: {
      errorMessage: "Permission is required",
    },
  },
};

// Vie All Roles
router.get(
  "/",
  isAuthenticated,
  isPermited,
  async (req: any, res: any, next: any) => {
    try {
      const roles = await viewAllRoles(req.query);
      res.json({ data: roles });
    } catch (error) {
      next(error);
    }
  }
);

// View Role Detail
router.get(
  "/:id",
  isAuthenticated,
  isPermited,
  async (req: any, res: any, next: any) => {
    const id = +req.params.id;

    // check if role exist
    const role = await findRoleById(id);
    if (!role) return res.status(400).json({ message: "Role not found" });

    try {
      const roles = await findRoleById(id);
      res.json({ data: roles });
    } catch (error) {
      next(error);
    }
  }
);

// Create Role
router.post(
  "/",
  isAuthenticated,
  activityLogger("Create Role", "Successfully create role"),
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

    //  create role
    try {
      const roles = await createRole(roleData);
      res.json({ message: "Role successfully created", data: roles });
    } catch (error) {
      next(error);
    }
  }
);

// Update Role
router.put(
  "/:id",
  isAuthenticated,
  activityLogger("Update Role", "Successfully update role"),
  isPermited,
  checkSchema(rules),
  async (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    const id = +req.params.id;

    // if not valid return error
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    // if valid get data
    const { name } = matchedData(req);
    const roleData: Role = {
      id,
      name,
    };

    //   check if role already exist
    const isExist = await findRoleByName(name);
    if (isExist) return res.status(400).json({ message: "Role already exist" });

    // update role
    try {
      const roles = await updateRole(roleData);
      res.json({ message: "Role successfully updated", data: roles });
    } catch (error) {
      next(error);
    }
  }
);

// Delete Role
router.delete(
  "/:id",
  isAuthenticated,
  activityLogger("Delete Role", "Successfully delete role"),
  isPermited,
  async (req: any, res: any, next: any) => {
    const id = +req.params.id;

    // check if role exist
    const role = await findRoleById(id);

    if (!role) return res.status(400).json({ message: "Role not found" });

    try {
      const roles = await deleteRole(id);
      res.json({ message: "Role successfully deleted" });
    } catch (error) {
      next(error);
    }
  }
);

// Assign Role Permission
router.post(
  "/assign/:id",
  isAuthenticated,
  activityLogger("Assign Role Permission", "Successfully assign permission"),
  isPermited,
  checkSchema(rolePermissionRules),
  async (req: any, res: any, next: any) => {
    const id = +req.params.id;

    // init validation
    const errors = validationResult(req);

    // if not valid return error
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    // check if role exist
    const role = await findRoleById(id);
    if (!role) return res.status(400).json({ message: "Role not found" });

    // get permission
    const permissions: Array<number> = matchedData(req).permissions;

    // map role id to permission
    const mappedPermission: RolePermission[] = permissions.map((permission) => {
      return {
        roleId: id,
        permissionId: permission,
      };
    });

    // assign permission
    try {
      await assignRolePermission(mappedPermission);
      res.json({ message: "Permission successfully assigned" });
    } catch (error) {
      next(error);
    }
  }
);

// Unassign Role Permission
router.delete(
  "/unassign/:id",
  isAuthenticated,
  activityLogger(
    "Unassign Role Permission",
    "Successfully unassign permission"
  ),
  isPermited,
  checkSchema(rolePermissionRules),
  async (req: any, res: any, next: any) => {
    const id = +req.params.id;

    // init validation
    const errors = validationResult(req);

    // if not valid return error
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    // get data
    const permissions: Array<number> = matchedData(req).permissions;

    // map role id to permission
    const rolePermission: RolePermission[] = permissions.map((permission) => {
      return {
        roleId: id,
        permissionId: permission,
      };
    });

    const role = await findRoleById(id);
    if (!role) return res.status(400).json({ message: "Role not found" });

    // unassign permission
    try {
      const roles = await deleteRolePermission(rolePermission);
      res.json({ message: "Permission successfully unassigned" });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
