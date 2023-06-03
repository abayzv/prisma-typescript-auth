import bcrypt from "bcrypt";
import { db } from "../../utils/db";

enum UserRoles {
  admin = 1,
  teacher = 2,
  student = 3,
  parent = 4,
}

function findUserByEmail(email: string) {
  return db.user.findUnique({
    where: {
      email,
    },
  });
}

function createUserByEmailAndPassword(user: {
  email: string;
  password: string;
  roleID: UserRoles;
}) {
  user.password = bcrypt.hashSync(user.password, 12);

  return db.user.create({
    data: user,
  });
}

function findUserById(id: string) {
  return db.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      createdAt: true,
      roleID: true,
      Student: {
        select: {
          id: true,
          name: true,
          address: true,
          birthDate: true,
          religion: true,
          gender: true,
          photo: true,
          bill: {
            select: {
              payment: {
                select: {
                  Payment: true,
                },
              },
              paymentMethod: true,
              createdAt: true,
            },
          },
          createdAt: true,
        },
      },
    },
  });
}

export { findUserByEmail, findUserById, createUserByEmailAndPassword };
