import express from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { isAuthenticated, isPermited } from "../../middlewares";
import {
  findUserById,
  viewAllUsers,
  viewUserDetails,
  changeUserRole,
} from "./users.services";

const router = express.Router();

const changeUserRoleRules = {
  roleID: {
    notEmpty: {
      errorMessage: "Role is required",
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

export default router;
