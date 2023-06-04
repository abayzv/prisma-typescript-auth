import { db } from "../../utils/db";
import { Prisma } from "@prisma/client";

const viewAllPermissions = () => {
  return db.permission.findMany({
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

const findPermissionByName = (name: string) => {
  return db.permission.findFirst({
    where: {
      name,
    },
  });
};

const findPermissionById = (id: number) => {
  return db.permission.findUnique({
    where: {
      id,
    },
  });
};

const showPermission = (id: number) => {
  return db.permission.findUnique({
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

const createPermission = (permission: Prisma.PermissionCreateInput) => {
  return db.permission.create({
    data: {
      name: permission.name,
      action: permission.action,
      menu: permission.menu,
    },
  });
};

const updatePermission = ({
  permissionId,
  permission,
}: {
  permissionId: number;
  permission: Prisma.PermissionUpdateInput;
}) => {
  return db.permission.update({
    where: {
      id: permissionId,
    },
    data: {
      name: permission.name,
      action: permission.action,
      menu: permission.menu,
    },
  });
};

const deletePermission = (id: number) => {
  return db.permission.delete({
    where: {
      id,
    },
  });
};

export {
  viewAllPermissions,
  findPermissionByName,
  findPermissionById,
  showPermission,
  createPermission,
  updatePermission,
  deletePermission,
};
