import express from "express";

import auth from "./auth/auth.routes";
import users from "./users/users.routes";
import role from "./role/role.routes";
import permission from "./permission/permission.routes";

const router = express.Router();

router.get("/", (req: any, res: any) => {
  res.json({
    message: "API - hi",
  });
});

router.use("/auth", auth);
router.use("/users", users);
router.use("/roles", role);
router.use("/permissions", permission);

export default router;
