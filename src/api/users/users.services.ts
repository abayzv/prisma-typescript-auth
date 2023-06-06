import bcrypt from "bcrypt";
import { db } from "../../utils/db";

// View all users
async function viewAllUsers(query: {
  name?: string;
  role?: string;
  gender?: string;
  religion?: string;
  page: number;
  show: number;
}) {
  const paginate = +query.show || 10;
  const data = await db.user.findMany({
    take: paginate,
    where: {
      role: {
        name: {
          contains: query.role || "",
          mode: "insensitive",
        },
      },
      profile: {
        name: {
          contains: query.name || "",
          mode: "insensitive",
        },
        // religion: null || query.religion,
        // gender: null || query.gender,
      },
    },
    select: {
      id: true,
      role: {
        select: {
          name: true,
        },
      },
      email: true,
      profile: {
        select: {
          name: true,
          photo: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });

  const count = await db.user.count({
    where: {
      role: {
        name: {
          contains: query.role || "",
          mode: "insensitive",
        },
      },
      profile: {
        name: {
          contains: query.name || "",
          mode: "insensitive",
        },
        // religion: null || query.religion,
        // gender: null || query.gender,
      },
    },
  });

  return {
    data,
    totalPage: Math.ceil(count / paginate).toString(),
    page: query.page || "1",
  };
}

// View Users Details
function viewUserDetails(id: string) {
  return db.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      roleID: true,
      email: true,
      profile: {
        select: {
          name: true,
          birthDate: true,
          address: true,
          gender: true,
          religion: true,
          photo: true,
        },
      },
      class: {
        select: {
          id: true,
          name: true,
        },
      },
      score: {
        select: {
          score: true,
          subject: {
            select: {
              name: true,
            },
          },
        },
      },
      teacherClass: {
        select: {
          id: true,
          name: true,
        },
      },
      bill: {
        select: {
          id: true,
          payment: {
            select: {
              payment: {
                select: {
                  name: true,
                  type: true,
                  amount: true,
                },
              },
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      },
      parent: {
        select: {
          name: true,
          phone: true,
          address: true,
        },
      },
      subject: {
        select: {
          name: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });
}

function createUserByEmailAndPassword(user: {
  email: string;
  password: string;
  name: string;
  roleID: UserRoles;
}) {
  user.password = bcrypt.hashSync(user.password, 12);

  return db.user.create({
    data: {
      email: user.email,
      password: user.password,
      roleID: user.roleID,
      profile: {
        create: {
          name: user.name,
        },
      },
    },
  });
}

function findUserByEmail(email: string) {
  return db.user.findUnique({
    where: {
      email,
    },
  });
}

function findUserById(id: string): Promise<User | null> {
  return db.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      roleID: true,
      createdAt: true,
    },
  });
}

function changeUserRole(id: string, roleID: UserRoles) {
  return db.user.update({
    where: {
      id,
    },
    data: {
      roleID,
    },
  });
}

function updateUser(
  id: string,
  data: {
    email?: string;
    password?: string;
    name?: string;
    birthDate?: Date;
    address?: string;
    gender?: string;
    religion?: string;
    photo?: string;
  }
) {
  return db.user.update({
    where: {
      id,
    },
    data: {
      email: data.email,
      password: data.password,
      profile: {
        update: {
          name: data.name,
          birthDate: data.birthDate,
          address: data.address,
          gender: data.gender,
          religion: data.religion,
          photo: data.photo,
        },
      },
    },
    select: {
      id: true,
      email: true,
      profile: {
        select: {
          name: true,
          birthDate: true,
          address: true,
          gender: true,
          religion: true,
          photo: true,
        },
      },
    },
  });
}

function deleteUser(id: string) {
  return db.user.delete({
    where: {
      id,
    },
  });
}

export {
  findUserByEmail,
  findUserById,
  createUserByEmailAndPassword,
  viewAllUsers,
  viewUserDetails,
  changeUserRole,
  updateUser,
  deleteUser,
};
