import { db } from "../../utils/db";
import { Prisma } from "@prisma/client";

const viewAllRoles = async (query: {
  name?: string;
  page: number;
  show: number;
}) => {
  const paginate = +query.show || 10;
  const skipData = (+query.page - 1) * paginate || 0;

  const role = await db.role.findMany({
    take: paginate,
    skip: skipData,
    where: {
      name: {
        contains: query.name || "",
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const count = await db.role.count({
    where: {
      name: {
        contains: query.name || "",
        mode: "insensitive",
      },
    },
  });

  return {
    data: role,
    totalPage: Math.ceil(count / paginate).toString(),
    page: query.page || "1",
  };
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

const isRolePermissionExist = (rolePermission: RolePermission[]) => {
  return db.rolePermission.findMany({
    where: {
      OR: rolePermission,
    },
    select: {
      permission: {
        select: {
          name: true,
        },
      },
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
  isRolePermissionExist,
};
