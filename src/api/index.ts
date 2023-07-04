import express from "express";
import { activityLogger } from "../middlewares";
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
import payment from "./payment/payment.routes";
import log from "./log/log.routes";
import classroom from "./classroom/classroom.routes";
import list from "./list/list.routes";
import subject from "./subject/subject.routes";
import score from "./score/score.routes";
import scoreCategory from "./scoreCategory/scoreCategory.routes";
import tiktok from "./tiktok/tiktok.routes";

const router = express.Router();

router.use("/auth", auth);
router.use("/users", users);
router.use("/roles", role);
router.use("/permissions", permission);
router.use("/transactions", transaction);
router.use("/payments", payment);
router.use("/logs", log);
router.use("/classrooms", classroom);
router.use("/list", list);
router.use("/subjects", subject);
router.use("/scores", score);
router.use("/score-categories", scoreCategory);
router.use("/tiktok", tiktok);

// Swagger setup

// swagger
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));

export default router;
