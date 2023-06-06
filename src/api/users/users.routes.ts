import express from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { isAuthenticated, isPermited } from "../../middlewares";
import bcrypt from "bcrypt";
import {
  findUserById,
  findUserByEmail,
  viewAllUsers,
  viewUserDetails,
  changeUserRole,
  updateUser,
  deleteUser,
} from "./users.services";

const router = express.Router();

const changeUserRoleRules = {
  roleID: {
    notEmpty: {
      errorMessage: "Role is required",
    },
  },
};

const updateUserRules = {
  email: {
    optional: true,
    isEmail: {
      errorMessage: "Invalid email",
    },
  },
  password: {
    optional: true,
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must be at least 6 characters long",
    },
  },
  confirmPassword: {
    custom: {
      options: (value: any, { req }: any) => {
        if (req.body.password && !value) {
          throw new Error("Password confirmation is required");
        } else if (value !== req.body.password) {
          throw new Error("Password confirmation does not match password");
        }
        return true;
      },
    },
  },
  name: {
    optional: true,
    isLength: {
      options: { min: 3 },
      errorMessage: "Name must be at least 3 characters long",
    },
  },
  phone: {
    optional: true,
    isLength: {
      options: { min: 11 },
      errorMessage: "Phone must be at least 11 characters long",
    },
  },
  address: {
    optional: true,
    isLength: {
      options: { min: 3 },
      errorMessage: "Address must be at least 3 characters long",
    },
  },
  religion: {
    optional: true,
    isLength: {
      options: { min: 3 },
      errorMessage: "Religion must be at least 3 characters long",
    },
  },
  gender: {
    optional: true,
    isLength: {
      options: { min: 3 },
      errorMessage: "Gender must be at least 3 characters long",
    },
  },
  birthDate: {
    optional: true,
    isLength: {
      options: { min: 3 },
      errorMessage: "Birth Date must be at least 3 characters long",
    },
  },
  photo: {
    optional: true,
    isLength: {
      options: { min: 3 },
      errorMessage: "Photo must be at least 3 characters long",
    },
  },
};

enum UserRoles {
  superadmin = 1,
  admin = 2,
  teacher = 3,
  student = 4,
  parent = 5,
}

router.get(
  "/",
  isAuthenticated,
  isPermited,
  async (req: any, res: any, next: any) => {
    const query = req.query;

    try {
      const users = await viewAllUsers(query);
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/me", isAuthenticated, async (req: any, res: any, next: any) => {
  try {
    const { userId } = req.payload;
    const user = await findUserById(userId);

    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.get(
  "/:id",
  isAuthenticated,
  isPermited,
  async (req: any, res: any, next: any) => {
    try {
      const id = req.params.id;
      const user = await viewUserDetails(id);
      if (!user) return res.status(400).json({ message: "User not found" });

      const userResponse: any = {};
      const userBill: any = [];

      // get user bill
      user.bill.forEach((bill: any) => {
        let amount = 0;
        bill.payment.forEach((payment: any) => {
          amount += payment.payment.amount;
        });

        userBill.push({
          id: bill.id,
          ammount: amount,
          payment: bill.payment,
          createdAt: bill.createdAt,
          updatedAt: bill.updatedAt,
        });
      });

      switch (user.roleID) {
        case 1:
          userResponse["email"] = user.email;
          userResponse["role"] = UserRoles[user.roleID];
          userResponse["profile"] = {
            name: user.profile?.name,
          };
          userResponse["createdAt"] = user.createdAt;
          userResponse["updatedAt"] = user.updatedAt;
          break;
        case 2:
          userResponse["email"] = user.email;
          userResponse["role"] = UserRoles[user.roleID];
          userResponse["profile"] = user.profile;
          userResponse["createdAt"] = user.createdAt;
          userResponse["updatedAt"] = user.updatedAt;
          break;
        case 3:
          userResponse["email"] = user.email;
          userResponse["role"] = UserRoles[user.roleID];
          userResponse["profile"] = user.profile;
          userResponse["class"] = user.teacherClass;
          userResponse["subject"] = user.subject;
          userResponse["createdAt"] = user.createdAt;
          userResponse["updatedAt"] = user.updatedAt;
          break;
        case 4:
          userResponse["email"] = user.email;
          userResponse["role"] = UserRoles[user.roleID];
          userResponse["profile"] = user.profile;
          userResponse["parent"] = user.parent;
          userResponse["class"] = user.class;
          userResponse["score"] = user.score;
          userResponse["bill"] = userBill;
          userResponse["createdAt"] = user.createdAt;
          userResponse["updatedAt"] = user.updatedAt;
      }

      res.json({ data: userResponse });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/role/:id",
  isAuthenticated,
  isPermited,
  checkSchema(changeUserRoleRules),
  async (req: any, res: any, next: any) => {
    try {
      const id = req.params.id;
      const { roleID } = matchedData(req);

      const errors = validationResult(req);

      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      const user = await findUserById(id);
      if (!user) return res.status(400).json({ message: "User not found" });

      // change user role
      const role = await changeUserRole(id, roleID);
      res.json({ message: "Role Changed Succesfully" });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  isAuthenticated,
  isPermited,
  checkSchema(updateUserRules),
  async (req: any, res: any, next: any) => {
    const id = req.params.id;
    const errors = validationResult(req);

    if (Object.keys(req.body).length === 0)
      return res.status(411).json({ message: "No data to update" });

    const user = await findUserById(id);
    if (!user) return res.status(400).json({ message: "User not found" });

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const data = matchedData(req);

    if (data.email) {
      const emailExist = await findUserByEmail(data.email);
      if (emailExist && emailExist.id !== id)
        return res.status(400).json({ message: "Email already exist" });
    }

    if (data.birthDate) {
      const birthDate = new Date(data.birthDate);
      if (birthDate.toString() === "Invalid Date")
        return res.status(400).json({ message: "Invalid Date" });

      data.birthDate = birthDate;
    }

    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);
      data.password = hashedPassword;
    }

    try {
      const user = await updateUser(id, data);
      res.json({ message: "User Updated Succesfully", data: user });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  isAuthenticated,
  isPermited,
  async (req: any, res: any, next: any) => {
    try {
      const id = req.params.id;
      const user = await findUserById(id);
      if (!user) return res.status(400).json({ message: "User not found" });

      const userDeleted = await deleteUser(id);
      res.json({ message: "User Deleted Succesfully" });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
