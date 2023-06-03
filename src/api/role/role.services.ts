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

const createRole = (name: string) => {
  return db.role.create({
    data: {
      name,
    },
  });
};

const updateRole = (id: number, name: string) => {
  return db.role.update({
    where: {
      id,
    },
    data: {
      name,
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

export { viewAllRoles, showRole, createRole, updateRole, deleteRole };
