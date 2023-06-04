import { db } from "../../utils/db";
import { Prisma } from "@prisma/client";

const viewAllRoles = () => {
  return db.role.findMany({
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

const findRoleByName = (name: string) => {
  return db.role.findFirst({
    where: {
      name,
    },
  });
};

const findRoleById = (id: number) => {
  return db.role.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
      permissions: {
        select: {
          permission: {
            select: {
              name: true,
              action: true,
              menu: true,
            },
          },
        },
      },
    },
  });
};

const showRole = (id: number) => {
  return db.role.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

const createRole = (role: Role) => {
  return db.role.create({
    data: {
      name: role.name,
    },
  });
};

const updateRole = (role: Role) => {
  return db.role.update({
    where: {
      id: role.id,
    },
    data: {
      name: role.name,
    },
  });
};

const deleteRole = (id: number) => {
  return db.role.delete({
    where: {
      id,
    },
  });
};

const assignRolePermission = (
  rolePermission: Prisma.RolePermissionCreateManyInput[]
) => {
  return db.rolePermission.createMany({
    data: rolePermission,
  });
};

const deleteRolePermission = (
  rolePermission: Prisma.RolePermissionCreateManyInput[]
) => {
  return db.rolePermission.deleteMany({
    where: {
      OR: rolePermission,
    },
  });
};

export {
  viewAllRoles,
  showRole,
  createRole,
  updateRole,
  deleteRole,
  findRoleByName,
  findRoleById,
  assignRolePermission,
  deleteRolePermission,
};
