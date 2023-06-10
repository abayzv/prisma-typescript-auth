import express from "express";
// @ts-ignore
import swaggerUi from "swagger-ui-express";
// @ts-ignore
import swaggerJsdoc from "swagger-jsdoc";

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

// swagger
// router.use(
//   "/api-docs",
//   swaggerUi.serve,
//   swaggerUi.setup(
//     swaggerJsdoc({
//       swaggerDefinition: {
//         openapi: "3.0.0",
//         info: {
//           title: "API",
//           version: "1.0.0",
//           description: "API",
//         },
//         servers: [
//           {
//             url: "http://localhost:5000/api/v1",
//             description: "Development server",
//           },
//         ],
//       },
//       apis: ["./src/api/**/*.ts"],
//     })
//   )
// );

export default router;
