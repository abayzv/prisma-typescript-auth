import express from "express";
// @ts-ignore
import swaggerUi from "swagger-ui-express";
// @ts-ignore
import swaggerJsdoc from "swagger-jsdoc";
import { swaggerConfig } from "../config/swagger";

import auth from "./auth/auth.routes";
import users from "./users/users.routes";
import role from "./role/role.routes";
import permission from "./permission/permission.routes";
import transaction from "./transaction/transaction.routes";

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
router.use("/transactions", transaction);

// Swagger setup

// swagger
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));

export default router;
